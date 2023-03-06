module.exports = (socket) => (room) => {
  socket.join(room);
  console.log(`clientId: ${socket.id} is joining room [${room}]...`);
};
