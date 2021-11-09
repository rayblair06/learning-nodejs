const { Sequelize } = require('sequelize');

const db = new Sequelize('nodejs', 'root', 'secret', {
    host: 'localhost',
    dialect: 'postgres'
});

export default db;
