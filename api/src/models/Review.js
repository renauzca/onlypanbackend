const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      description:{
        type: DataTypes.STRING,
      },
      comment:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
  );
};