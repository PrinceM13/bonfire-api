const { TYPE_MESSAGE } = require("../config/constants");
const checkExist = require("./check-exist");
const emitNotification = require("./emit-notification");

module.exports = (io, socket) => async (data) => {
  const isExist = await checkExist(socket);
  console.log(`Received message: ${data.message}`);
  if (isExist) {
    io.to(data.eventId).emit("message", data);
    emitNotification(socket, TYPE_MESSAGE, data);
  } else {
    socket.emit("message", { ...data, message: "-- refresh to reconnect --" });
  }
};
