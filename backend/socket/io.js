let socketIo = require("socket.io");

let io;
module.exports = {
  init: function (server, options) {
    io = socketIo(server, options);
    return io;
  },
  getIO: function () {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  },
};
