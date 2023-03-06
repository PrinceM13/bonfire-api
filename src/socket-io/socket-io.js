const onDisconnect = require("./on-disconnect");
const onJoinRoom = require("./on-join-room");
const onLeaveRoom = require("./on-leave-room");
const onLogin = require("./on-login");
const onMessage = require("./on-message");

const { UserSocket } = require("../models");

module.exports = (io) => {
  UserSocket.sync({ force: true }); // to reset userId-socketId map when server restart

  io.on("connection", (socket) => {
    console.log(`a user connected [${socket.id}]`);

    // login (map userId from fron-end with clientId)
    socket.on("login", onLogin(socket));

    // send incoming message to all clients in specific room
    socket.on("message", onMessage(io, socket));

    // client subscribe to specific room
    socket.on("joinRoom", onJoinRoom(socket));

    // client leave from specific room
    socket.on("leaveRoom", onLeaveRoom(socket));

    // client disconnect from server
    socket.on("disconnect", onDisconnect(socket));
  });
};
