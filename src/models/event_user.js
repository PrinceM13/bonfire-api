// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const eventUser = sequelize.define("eventUser", {}, { underscored: true });
  eventUser.associate = (db) => {
    eventUser.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    eventUser.belongsTo(db.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return eventUser;
};
