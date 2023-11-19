const amqp = require("amqplib");
const amqpServer =
  "amqps://rvcbutui:ZqrsdgLkFcmDrU8Qhg93RQMCEnUB3l9k@hilarious-orange-badger.rmq3.cloudamqp.com/rvcbutui";

const getQueuePrefix = require("./queuePrefix");

let qPrefix = getQueuePrefix();

async function establishQueue(channelName, service) {
  const connection = await amqp.connect(amqpServer);
  const channel = await connection.createChannel();
  await channel.prefetch(1);
  await channel.assertExchange(channelName, "fanout");
  const queueName = qPrefix + service + "-" + channelName;
  const queue = await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queue.queue, channelName, "");
  return { channel: channel, queue: queue.queue };
}

module.exports = establishQueue;
