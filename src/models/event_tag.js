// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const EventTag = sequelize.define("EventTag", {}, { underscored: true });

  EventTag.associate = (db) => {
    EventTag.belongsTo(db.EventDetail, {
      foreignKey: {
        name: "EventDetailId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    EventTag.belongsTo(db.Tag, {
      foreignKey: {
        name: "tagId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return EventTag;
};
