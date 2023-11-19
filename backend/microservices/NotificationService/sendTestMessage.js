// sendTestMessage.js
const publishToQueue = require('../../helpers/rabbit/publisher');

const queueName = 'earningsQueue';
const testMessage = {
  userId: '123', // Replace with a valid user ID
  tickerSymbol: 'AAPL',
  eps: '1.40',
  // other necessary earnings information
};

publishToQueue(queueName, testMessage)
  .then(() => console.log('Test message sent'))
  .catch(console.error);
