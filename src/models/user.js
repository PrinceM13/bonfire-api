// const { LEVEL_BRONZE, LEVEL_SILVER, LEVEL_GOLD, LEVEL_PLATINUM } = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { is: /^[0-9]{10}$/ }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      lineId: {
        // optional
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: true }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isDate: true }
      },
      point: {
        // add by system
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      totalSpend: {
        // add by system
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
      }
      //   level: {
      //     // add by system
      //     type: DataTypes.ENUM(LEVEL_BRONZE, LEVEL_SILVER, LEVEL_GOLD, LEVEL_PLATINUM),
      //     defaultValue: "LEVEL_BRONZE"
      //   }
    },
    {
      underscored: true
    }
  );
  return User;
};
