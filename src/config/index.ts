import 'dotenv/config';


export const config = {
    APP_KEY: process.env.APP_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT
};
