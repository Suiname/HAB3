'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(`
    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR(32) NOT NULL,
      password VARCHAR(60) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `),
  down: (queryInterface) => queryInterface.sequelize.query(`
    DROP TABLE users;
  `),

};
