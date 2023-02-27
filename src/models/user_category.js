const {
  TYPE_CAFE,
  TYPE_FOOD,
  TYPE_GAME,
  TYPE_PARTY,
  TYPE_SPORT,
  TYPE_TRAVEL
} = require("../config/constants");

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const UserCategory = sequelize.define(
    "UserCategory",
    {
      category: {
        type: DataTypes.ENUM(TYPE_CAFE, TYPE_FOOD, TYPE_GAME, TYPE_PARTY, TYPE_SPORT, TYPE_TRAVEL)
      }
    },
    { underscored: true }
  );

  UserCategory.associate = (db) => {
    UserCategory.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return UserCategory;
};
