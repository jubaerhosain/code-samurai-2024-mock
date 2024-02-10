import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT,
    mysql: {
        dialect: "mysql",
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    jwt: {
        expiry: process.env.JWT_EXPIRY,
        secret: process.env.JWT_SECRET,
    },
    cookie: {
        secret: process.env.COOKIE_SECRET,
        authCookieName: process.env.AUTH_COOKIE_NAME,
    },
    redis: {
        host: process.env.REDIS_HOST,
    }
};
