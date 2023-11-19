const amqp = require('amqplib');
const { start } = require('./helpers/channels');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

const publishToQueue = async (queueName, data) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true
    });
    
    console.log(`[Publisher] Sent data to ${queueName}`);
    
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('[Publisher] Error:', error);
  }
};

module.exports = publishToQueue;
