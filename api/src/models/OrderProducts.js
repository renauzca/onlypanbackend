const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderProducts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
};
