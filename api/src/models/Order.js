const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      totalPrice: {
        type: DataTypes.INTEGER,
       
      },
    },
  );
};