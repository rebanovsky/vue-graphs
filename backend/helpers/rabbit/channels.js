const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

let channel = null;
let connection = null;

// Function to start the connection and create a channel
async function start() {
  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  return channel;
}

// Function to assert the queue and start consuming messages
async function consumeEarnings(queueName, onMessage) {
  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, (message) => {
    if (message !== null) {
      console.log(`[Consumer] Received message from ${queueName}`);
      try {
        const content = JSON.parse(message.content.toString());
        onMessage(content);
        channel.ack(message);
      } catch (err) {
        console.error("[Consumer] Error handling message:", err);
        // Decide whether to reject or requeue the message
        channel.nack(message, false, !err.fatal);
      }
    }
  });
}

// Ensures that the connection and channel are closed when the process is terminated
async function close() {
  if (channel) await channel.close();
  if (connection) await connection.close();
}

// Clean up on process termination
process.on("exit", close);
process.on("SIGINT", close);
process.on("uncaughtException", close);

module.exports = { start, consumeEarnings, close };
