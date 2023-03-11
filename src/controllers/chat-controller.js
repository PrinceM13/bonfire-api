const { ChatGroup } = require("../models");

exports.getAllChatByEventId = async (req, res, next) => {
  try {
    const chats = await ChatGroup.findAll({ where: { eventId: +req.params.eventId } });
    res.status(200).json({ chats });
  } catch (err) {
    next(err);
  }
};
