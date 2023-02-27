// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const Rule = sequelize.define(
    "Rule",
    {
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      paticipant: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { underscored: true }
  );

  Rule.associate = (db) => {
    Rule.belongsTo(db.EventDetail, {
      foreignKey: {
        name: "EventDetailId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Rule;
};
