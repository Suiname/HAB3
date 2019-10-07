'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(`
    CREATE TABLE users (
      id UUID NOT NULL PRIMARY KEY,
      email VARCHAR(60) UNIQUE NOT NULL,
      username VARCHAR(32) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL,
      type VARCHAR(32) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `),
  down: (queryInterface) => queryInterface.sequelize.query(`
    DROP TABLE users;
  `),

};
