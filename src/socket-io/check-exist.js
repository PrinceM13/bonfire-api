const { UserSocket } = require("../models");

module.exports = async (socket) => {
  //   const isExist = await UserSocket.findAll();
  const isExist = await UserSocket.findOne({ where: { socketId: socket.id } });
  return isExist;
};
