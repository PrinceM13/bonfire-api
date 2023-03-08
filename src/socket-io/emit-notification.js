module.exports = (socket, type, data) => {
  socket.to(data.eventId).emit("notification", { type, data });
};
