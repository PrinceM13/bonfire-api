const fs = require("fs");

const { User, EventUser, SocialLink, Event, EventDetail, UserCategory } = require("../models");
const { TYPE_FACEBOOK, TYPE_IG, TYPE_LINE } = require("../config/constants");
const cloudinary = require("../utils/cloudinary");

exports.getMyProfile = async (req, res, next) => {
  try {
    const myProfile = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
      include: [
        { model: EventUser },
        { model: SocialLink },
        { model: Event, include: { model: EventDetail } },
        { model: UserCategory }
      ]
    });
    res.status(200).json({ myProfile });
  } catch (err) {
    next(err);
  }
};

exports.editMyProfile = async (req, res, next) => {
  console.log("I TOOONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN", req.body);
  try {
    let profileUrl;

    if (req.file) {
      profileUrl = await cloudinary.upload(req.file?.path, null, "User");
    }

    const { profileImage, username, bio, education, company } = req.body;
    const value = { profileImage: profileUrl, username, bio, education, company };

    const updateUser = await User.update(value, { where: { id: req.user.id } });

    res.status(200).json({ value });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.editMyLink = async (req, res, next) => {
  try {
    const { linkUrl, type } = req.body;

    if (![TYPE_FACEBOOK, TYPE_IG, TYPE_LINE].includes(type)) {
      throw new Error(`Invalid link type: ${type}`);
    }

    const value = { type, userId: req.user.id };

    const linkUser = await SocialLink.findOne({ where: value });

    if (Boolean(linkUser)) {
      await SocialLink.update({ linkUrl }, { where: value });
    } else {
      await SocialLink.create({
        ...req.body,
        userId: req.user.id
      });
    }

    res.status(200).json({ value });
  } catch (err) {
    next(err);
  }
};

exports.getMyEvent = async (req, res, next) => {
  try {
    const myEvent = await EventUser.findAll({
      where: { userId: req.user.id },
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Event, include: { model: EventDetail } }
      ]
    });
    res.status(200).json({ myEvent });
  } catch (err) {
    next(err);
  }
};
