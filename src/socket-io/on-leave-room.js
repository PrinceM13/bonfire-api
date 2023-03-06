module.exports = (socket) => (room) => {
  console.log(`clientId: ${socket.id} is leaving room [${room}]...`);
  socket.leave(room);
};
