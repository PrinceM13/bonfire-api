// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const EventUser = sequelize.define("EventUser", {}, { underscored: true });
  EventUser.associate = (db) => {
    EventUser.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    EventUser.belongsTo(db.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return EventUser;
};
