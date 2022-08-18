const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        origin:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue: 0,
        },
    },
    {
        timestamps:false
    })
}