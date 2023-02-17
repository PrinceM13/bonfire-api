// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const chatGroup = sequelize.define(
    "chatGroup",
    {
      message: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { underscored: true }
  );

  chatGroup.associate = (db) => {
    chatGroup.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    chatGroup.belongsTo(db.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return chatGroup;
};
