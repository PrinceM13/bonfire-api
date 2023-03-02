const { Event, EventDetail, User, EventUser, Rule, Tag, EventTag } = require("../models");
const createError = require("../utils/create-error");

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      userId: req.user.id,
      title: req.body.title
    });

    const eventDetail = await EventDetail.create({
      eventId: event.id,
      category: req.body.category,
      detail: req.body.detail,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });

    await Rule.create({
      EventDetailId: eventDetail.id,
      age: req.body.age,
      paticipant: req.body.paticipant
    });

    await EventUser.create({
      userId: req.user.id,
      eventId: event.id,
      status: req.body.status
    });

    const tags = req.body.titleTag || [];

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const createdTag = await Tag.create({
        titleTag: tag
      });

      await EventTag.create({
        EventDetailId: eventDetail.id,
        tagId: createdTag.id
      });
    }

    const createdEvent = await Event.findOne({
      where: { id: event.id },
      include: [
        {
          model: EventDetail,
          include: [{ model: Rule }, { model: EventTag, include: { model: Tag } }]
        }
      ]
    });

    res.status(200).json({ createdEvent });
  } catch (err) {
    next(err);
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: {
        model: EventDetail
      }
    });
    res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
};

// exports.getEventsById = async (req, res, next) => {
//   try {
//     const event = await Event.findOne({
//       where: { id: req.params.eventId },
//       include: [
//         {
//           model: EventDetail
//         },
//         {
//           model: User
//         }
//       ]
//     });
//     res.status(200).json({ event });
//   } catch (err) {
//     next(err);
//   }
// };

exports.updateEvents = async (req, res, next) => {
  try {
    const [eventUpdate] = await Event.update(
      { title: req.body.title },
      { where: { id: +req.params.eventId } }
    );
    const [eventDetailUpdate] = await EventDetail.update(req.body, {
      where: { eventId: +req.params.eventId }
    });

    res.status(200).json({ message: `event was successfully updated` });
  } catch (err) {
    next(err);
  }
};

exports.deleteEvents = async (req, res, next) => {
  try {
    const eventDelete = await Event.findOne({
      where: { id: +req.params.eventId, userId: req.user.id }
    });

    if (!eventDelete) {
      createError("invalid event", 400);
    }

    const eventDetailDelete = await EventDetail.findOne({
      where: { eventId: +req.params.eventId }
    });

    const eventUserDelete = await EventUser.findOne({
      where: { eventId: +req.params.eventId }
    });

    await eventDetailDelete.destroy();
    await eventUserDelete.destroy();
    await eventDelete.destroy();

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
