const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize();

// module.exports = (sequelize, DataTypes) => {
module.exports = () => {
    const Temp = sequelize.define('Temp', {}, { underscored: true });
    return Temp;
}