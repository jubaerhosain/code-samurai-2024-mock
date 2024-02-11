import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.API_SERVER_PORT,
    rabbitmq: {
        host: process.env.RABBITMQ_HOST,
    },
};
