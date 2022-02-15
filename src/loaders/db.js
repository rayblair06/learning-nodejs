const { Sequelize } = require('sequelize');


const db = new Sequelize(
    process.env.DB_DATABASE ?? 'nodejs',
    process.env.DB_USERNAME ?? 'root',
    process.env.DB_PASSWORD ?? 'secret', {
        host: process.env.DB_HOST ?? '127.0.0.1',
        dialect: process.env.DB_DIALECT ?? 'postgres'
    });

export default db;
