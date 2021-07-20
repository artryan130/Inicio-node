const sequelize = require('../../database/index');
const {DataType, DataTypes, STRING} = require('sequelize');

const Product = sequelize.define('Products',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    condition:{
        type: DataTypes.ENUM,
        values: ['new', 'used'],
        allowNull: false,
    }
});

module.exports = Product;