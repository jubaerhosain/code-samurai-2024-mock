import amqp from "amqplib";
import config from "./config.js";

export async function getAmqpConnectionAndChannel() {
    const connection = await amqp.connect(`amqp://${config.rabbitmq.host}`);
    const channel = await connection.createChannel();
    return { connection, channel };
}
