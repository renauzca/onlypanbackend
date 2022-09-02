const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'entregado'),
      defaultValue: 'pendiente',
    },
    delivery: {
      type: DataTypes.ENUM('takeAway', 'delivery'),
    },
  });
};
