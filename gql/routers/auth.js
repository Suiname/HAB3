var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const uuid = require('uuid/v4');

const { JWT_SECRET, SALT_ROUNDS: saltRounds } = process.env;
const { users } = require('../models');

const checkCredentials = async (username, password) => {
	const result = await users.findOne({ where: {username} });
	if (result) {
		const match = await bcrypt.compare(password, result.password);
		if (match) {
			return result;
		}
	}
	return null;
}

const userExists = async (username) => {
	const result = await users.findOne({ where: {username}, raw: true });
	return !!result;
};

router.post('/login', async (req, res, _next) => {
	try {
		const { username, password } = req.body;
		const match = await checkCredentials(username, password);
		if (match) {
			const { id, email, type } = match;
			const payload = { id, username, email, type }
			const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
			return res.send({token});
		} else {
			return res.status(403).send('Incorrect username / password');
		}
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

router.post('/register', async (req, res, _next) => {
	try {
		const {username, email, password} = req.body;
		const id = uuid();
		const hash = await bcrypt.hash(password, parseInt(saltRounds));
		await users.create({ id, username, password: hash, email });
		const user = await users.findOne({ where: { id }, raw: true });
		delete user.password;
		const token = jwt.sign(user, JWT_SECRET, {expiresIn: "24h"});
		return res.send({token});
	} catch (error) {
		return res.status(500).send('Error Inserting User');
	}
});

router.post('/verify', async (req, res, _next) => {
	try {
		const { token } = req.body;
		const verified = jwt.verify(token, JWT_SECRET);
		if (!verified) {
			return res.status(400).send('Malformed or expired token');
		}
		const { username } = jwt.decode(token);
		const existingUser = await userExists(username);
		if (existingUser) {
			return res.status(200).send({username, message: 'Token verified'});
		} else {
			return res.status(403).send('Token for invalid user');
		}
	} catch (error) {
		return res.status(500).send('Internal server error');
	}
});

module.exports = router;