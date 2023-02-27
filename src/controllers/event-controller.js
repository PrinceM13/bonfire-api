const { Event, eventDetail, User } = require("../models");

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      userId: req.user.id,
      include: { model: eventDetail }
    });
    res.status(200).json({ event });
  } catch (err) {
    next(err);
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: {
        model: eventDetail
      }
    });
    res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
};

exports.getEventsById = async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.eventId },
      include: [
        {
          model: eventDetail
        },
        {
          model: User
        }
      ]
    });
    res.status(200).json({ event });
  } catch (err) {
    next(err);
  }
};

exports.updateEvents = async (req, res, next) => {
  try {
    const eventUpdate = await Event.update(req.body, {
      where: { id: req.params.eventId, userId: req.user.id },
      include: { model: eventDetail }
    });
    res.status(200).json({ message: `event was successfully updated` });
  } catch (err) {
    next(err);
  }
};

exports.deleteEvents = async (req, res, next) => {
  try {
    const eventDelete = await Event.destroy({
      where: { userId: req.user.id, eventId: req.params.eventId }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
