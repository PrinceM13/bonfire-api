// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  // module.exports = () => {
  const Tag = sequelize.define(
    "Tag",
    {
      titleTag: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { underscored: true }
  );

  Tag.associate = (db) => {
    Tag.hasMany(db.EventTag, {
      foreignKey: {
        name: "tagId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Tag;
};
