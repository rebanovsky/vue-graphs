const moment = require("moment");
const createMessage = require("../helpers/rabbit/publisher");

class ResponseHandler {
  constructor(serviceName) {
    this.serviceName = serviceName;
  }

  async processResponse(response, queueName, msg) {
    if (response === 1) {
      console.log(`** [${this.serviceName}] [${queueName}] DONE **`);
    } else {
      const errorMessage = {
        channel: queueName,
        date: moment().format(),
        message: msg,
        error: response?.toString(),
      };
      console.error(errorMessage);
      await createMessage("errored", errorMessage);
    }
  }
}

module.exports = ResponseHandler;
