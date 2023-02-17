// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const Event = sequelize.define(
    "Event",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Event.associate = (db) => {
    Event.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Event.hasMany(db.eventUser, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Event.hasMany(db.chatGroup, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Event.hasOne(db.eventDetail, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Event;
};
