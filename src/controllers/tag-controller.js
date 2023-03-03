const { Tag } = require("../models");
const { Op } = require("sequelize");

exports.getAllTags = async (req, res, next) => {
  try {
    const { tagName = "" } = req.query;
    const tags = await Tag.findAll({
      where: {
        titleTag: {
          [Op.like]: `%${tagName}%`
        }
      }
    });
    res.status(200).json({ tags });
  } catch (err) {
    next(err);
  }
};
