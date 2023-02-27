// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const ChatGroup = sequelize.define(
    "ChatGroup",
    {
      message: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { underscored: true }
  );

  ChatGroup.associate = (db) => {
    ChatGroup.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    ChatGroup.belongsTo(db.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return ChatGroup;
};
