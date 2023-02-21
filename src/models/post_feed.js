// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const postFeed = sequelize.define(
    "postFeed",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { underscored: true }
  );

  postFeed.associate = (db) => {
    postFeed.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return postFeed;
};
