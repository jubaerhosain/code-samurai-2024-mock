import express from "express";
import "express-async-errors"; // handles async errors

import { getAmqpConnectionAndChannel } from "./src/config/amqp.js";

const app = express();

app.listen(process.env.EMAIL_SERVER_PORT, async () => {
    console.log(`Email Server listening on port ${process.env.EMAIL_SERVER_PORT}...`);

    try {
        // try connecting until rabbitmq is available
        const { connection, channel } = await getAmqpConnectionAndChannel();
        console.log("Connected to rabbitmq server");

        const queueName = "send-email";

        await channel.assertQueue(queueName, { durable: true });

        channel.consume(queueName, async (message) => {
            const taskData = JSON.parse(message.content.toString()); // Parse JSON data

            console.log("Received from rabbitmq: ", taskData);

            channel.ack(message);
        });
    } catch (error) {
        console.log(error);
        console.log(`Couldn't connect to rabbitmq`);
    }
});
