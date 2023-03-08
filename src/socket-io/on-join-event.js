const { TYPE_JOIN_ROOM } = require("../config/constants");

module.exports = (socket) => (data) => {
  emitNotification(socket, TYPE_JOIN_ROOM, data);
};
