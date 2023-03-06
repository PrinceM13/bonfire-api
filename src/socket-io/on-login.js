const { UserSocket } = require("../models");

module.exports = (socket) => async (data) => {
  console.log(`userId: ${data.userId} logged in (clientId: ${socket.id})`);
  await UserSocket.create({
    userId: data.userId,
    socketId: socket.id
  });
};
