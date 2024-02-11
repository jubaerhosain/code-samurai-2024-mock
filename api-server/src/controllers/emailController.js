import { getAmqpConnectionAndChannel } from "../configs/amqp.js";

async function send(req, res) {
    try {
        const { connection, channel } = await getAmqpConnectionAndChannel();

        const queueName = "send-email";

        await channel.assertQueue(queueName, { durable: true });

        const message = JSON.stringify(req.body);

        channel.sendToQueue(queueName, Buffer.from(message));

        res.json({ message: "An email is sending. Wait a while." });

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Failed to trigger email" });
    }
}

export default { send };
