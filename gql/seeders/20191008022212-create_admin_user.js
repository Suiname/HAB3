'use strict';
require('dotenv').config();
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const {
  ADMIN_USERNAME: username,
  ADMIN_PASSWORD: password,
  ADMIN_EMAIL: email,
  SALT_ROUNDS: saltRounds,
} = process.env;

const id = uuid();
const salt = bcrypt.genSaltSync(parseInt(saltRounds));
const hash = bcrypt.hashSync(password, salt);

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(`
    INSERT INTO users (id, username, password, email, type)
    VALUES ('${id}', '${username}', '${hash}', '${email}', 'admin');
  `),
  down: (queryInterface) => queryInterface.sequelize.query(`
    DELETE from users where username = '${username}' and email = '${email}';
  `),
};