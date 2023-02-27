// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

const { TYPE_FACEBOOK, TYPE_IG, TYPE_LINE } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const SocialLink = sequelize.define(
    "SocialLink",
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

  SocialLink.associate = (db) => {
    SocialLink.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return SocialLink;
};
