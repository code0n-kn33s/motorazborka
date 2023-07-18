const { Sequelize } =  require('sequelize');
// const mysql2 = require('mysql2');

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        // dialect: "mysql",
        // dialectModule: mysql2,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)