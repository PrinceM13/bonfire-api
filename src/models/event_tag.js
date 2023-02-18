// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const eventTag = sequelize.define("eventTag", {}, { underscored: true });

  eventTag.associate = (db) => {
    eventTag.belongsTo(db.eventDetail, {
      foreignKey: {
        name: "eventDetailId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    eventTag.belongsTo(db.Tag, {
      foreignKey: {
        name: "tagId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return eventTag;
};
