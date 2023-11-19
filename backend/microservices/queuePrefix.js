require("dotenv").config();
const queueIdentifier = process.env.QUEUE_IDENTIFIER;

function getQueuePrefix() {
  const environment = process.env.NODE_ENV;
  let qPrefix = "app-";
  switch (environment) {
    case "production":
      qPrefix = "app-";
      break;
    case "css":
      qPrefix = "stage-";
      break;
    case "demo":
      qPrefix = "demo-";
      break;
    case "development":
      qPrefix = "dev-";
      break;
    case "gym1":
      qPrefix = "gym1-";
      break;
    case "gym2":
      qPrefix = "gym2-";
      break;
    case "gym3":
      qPrefix = "gym3-";
      break;
  }

  if (queueIdentifier) {
    const identifier = queueIdentifier + "-";
    qPrefix = qPrefix + identifier;
  }

  return qPrefix;
}

module.exports = getQueuePrefix;
