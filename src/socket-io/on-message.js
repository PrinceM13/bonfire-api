const { ChatGroup } = require("../models");
const { TYPE_MESSAGE } = require("../config/constants");
const checkExist = require("./check-exist");
const emitNotification = require("./emit-notification");

module.exports = (io, socket) => async (data) => {
  const isExist = await checkExist(socket);
  console.log(`Received message: ${data.message}`);
  console.log("data -------> ", data);
  if (isExist) {
    const createdMessage = await ChatGroup.create({
      message: data.message,
      userId: data.userId,
      eventId: data.eventId
    });
    io.to(data.eventId).emit("message", createdMessage);
    emitNotification(socket, TYPE_MESSAGE, createdMessage);
  } else {
    socket.emit("message", { ...data, message: "-- refresh to reconnect --" });
  }
};
