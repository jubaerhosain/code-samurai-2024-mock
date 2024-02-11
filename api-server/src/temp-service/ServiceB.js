const express = require("express");
const amqp = require("amqplib");

const app = express();
const queueName = "my-computation-queue"; // Replace with your queue name

app.listen(3001, async () => {
    console.log("Service B listening on port 3001");

    try {
        const connection = await amqp.connect("amqp://localhost"); // Replace with your RabbitMQ connection string
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName, { durable: true }); // Durable queue persists restarts

        channel.consume(queueName, async (message) => {
            const taskData = JSON.parse(message.content.toString()); // Parse JSON data

            try {
                const result = await processData(taskData); // Perform computation

                await storeResult(result); // Store result in database

                channel.ack(message); // Acknowledge message processing
            } catch (error) {
                console.error("Error processing message:", error);
                // Handle processing errors (e.g., retry or reject message)
            }
        });
    } catch (error) {
        console.error("Error: ", error);
    }
});

async function processData(data) {
    // Implement your computation logic here
    return result; // Replace with your actual result
}

async function storeResult(result) {
    // Connect and store result in database
}
