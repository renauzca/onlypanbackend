const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("productCart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.INTEGER,       
    },
  });
};
