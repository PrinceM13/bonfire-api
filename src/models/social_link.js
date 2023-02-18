// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const socialLink = sequelize.define(
    "socialLink",
    {
      linkUrl: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { underscored: true }
  );

  socialLink.associate = (db) => {
    socialLink.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return socialLink;
};
