// worker.js
const { consumeEarnings } = require("../../../helpers/rabbit/channels");
const Notification = require("../models/Notification");

const queueName = "earningsQueue";

async function onEarningsMessage(data) {
  // Here, data would be the object that was sent to the queue
  try {
    const notification = new Notification({
      userId: data.userId,
      title: "New Earnings Report",
      message: `New earnings report for ${data.tickerSymbol}: EPS ${data.eps}`,
      tickerSymbol: data.tickerSymbol,
      type: "EARNINGS",
      // other fields as necessary
    });

    await notification.save();
    console.log("Notification saved:", notification);
  } catch (error) {
    console.error("Failed to process earnings message:", error);
  }
}

async function startWorker() {
    await require("../../../helpers/rabbit/channels").start();
    await consumeEarnings(queueName, onEarningsMessage);
  }
  

startWorker().catch(console.error);
