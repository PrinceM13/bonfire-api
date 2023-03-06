const { UserSocket } = require("../models");

module.exports = (socket) => async () => {
  await UserSocket.destroy({ where: { socketId: socket.id } });
  console.log(`a user disconnected [${socket.id}]`);
};
