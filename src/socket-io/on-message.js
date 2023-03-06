const checkExist = require("./check-exist");

module.exports = (io, socket) => async (data) => {
  const isExist = await checkExist(socket);
  console.log(`Received message: ${data.message}`);
  if (isExist) {
    io.to(data.eventId).emit("message", data);
  } else {
    socket.emit("message", { ...data, message: "-- refresh to reconnect --" });
  }
};
