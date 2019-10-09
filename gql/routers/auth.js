var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const uuid = require('uuid/v4');

const db = require('../models');
const { sequelize } = db;
const { JWT_SECRET, SALT_ROUNDS: saltRounds } = process.env;

router.post('/login', async (req, res, _next) => {
	try {
		const {username, password} = req.body;
		const [result] = await sequelize.query(`SELECT * FROM users where username = :username`, { replacements: {username}, type: sequelize.QueryTypes.SELECT});
		const match = await bcrypt.compare(password, result.password);
		if (match) {
			const token = jwt.sign(result, JWT_SECRET);
			res.send({token});
		} else {
			res.status(403).send('Incorrect username / password');
		}
	} catch (error) {
		res.status(500).send('Internal Server Error	');
	}
});

router.post('/register', async (req, res, _next) => {
	try {
		const {username, email, password} = req.body;
		const id = uuid();
		const hash = await bcrypt.hash(password, parseInt(saltRounds));
		await sequelize.query(`INSERT INTO users (id, username, password, email) VALUES (:id, :username, :hash, :email)`, { replacements:  {id, username, hash, email}, type: sequelize.QueryTypes.SELECT});
		try {
			const [user] = await sequelize.query(`SELECT * from users where id = :id`, { replacements: {id}, type: sequelize.QueryTypes.SELECT});
			const token = jwt.sign(user, JWT_SECRET);
			return res.send({token});
		} catch (error) {
			return res.status(500).send('Error Retrieving New User');
		}
	} catch (error) {
		return res.status(500).send('Error Inserting User');
	}
});

module.exports = router;