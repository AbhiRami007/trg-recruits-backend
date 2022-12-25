const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });
// console.log(process.env);
module.exports = {
    development: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
            },
        },
        pool: {
            max: 10,
            min: 5,
            acquire: 30000,
            idle: 100000,
        },
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    },
    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
            },
        },
        pool: {
            max: 10,
            min: 5,
            acquire: 30000,
            idle: 100000,
        },
        logging: false,
    },
};