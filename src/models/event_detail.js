const {
  TYPE_CAFE,
  TYPE_FOOD,
  TYPE_GAME,
  TYPE_PARTY,
  TYPE_SPORT,
  TYPE_TRAVEL,
  STATUS_UPCOMING,
  STATUS_ONGOING,
  STATUS_PAST
} = require("../config/constants");

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const eventDetail = sequelize.define(
    "eventDetail",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category: {
        type: DataTypes.ENUM(TYPE_CAFE, TYPE_FOOD, TYPE_GAME, TYPE_PARTY, TYPE_SPORT, TYPE_TRAVEL)
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(STATUS_ONGOING, STATUS_UPCOMING, STATUS_PAST),
        defaultValue: STATUS_UPCOMING
      }
    },
    { underscored: true }
  );

  eventDetail.associate = (db) => {
    eventDetail.belongsTo(db.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    eventDetail.hasMany(db.eventTag, {
      foreignKey: {
        name: "eventDetailId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    eventDetail.hasOne(db.Rule, {
      foreignKey: {
        name: "eventDetailId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return eventDetail;
};
