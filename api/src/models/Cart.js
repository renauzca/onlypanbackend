const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'cart',
        {
            id_cart:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, 
            }
        }
    )
}