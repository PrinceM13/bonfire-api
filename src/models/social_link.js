// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

const { TYPE_FACEBOOK, TYPE_IG, TYPE_LINE } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const socialLink = sequelize.define(
    "socialLink",
    {
      linkUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM(TYPE_FACEBOOK, TYPE_IG, TYPE_LINE),
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
