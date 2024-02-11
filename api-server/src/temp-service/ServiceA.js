const express = require('express');
const amqp = require('amqplib');

const app = express();
const queueName = 'my-computation-queue'; // Replace with your queue name

app.post('/trigger-computation', async (req, res) => {
  const taskData = req.body; // Extract task data from request

  try {
    const connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ connection string
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true }); // Durable queue persists restarts

    const message = JSON.stringify(taskData); // Convert data to JSON

    await channel.sendToQueue(queueName, Buffer.from(message)); // Publish message

    res.json({ message: 'Computation triggered successfully!' });

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: 'Failed to trigger computation' });
  }
});

app.listen(3000, () => {
  console.log('Service A listening on port 3000');
});
