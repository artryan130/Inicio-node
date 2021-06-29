const sequelize = require('../../database/');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER, //autoincrementado
        primaryKey: true,       //chave primária    
        autoIncrement: true,    //auto incrementado
        allowNull: false,       //todos os users devem ter um id
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,       //usuarios diferentes tenham emails diferentes
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{              //papeis(usuarios, admins...)
        type: DataTypes.ENUM,
        values: ['admin','user'],
        allowNull: false,
    },
});

User.sync({alter: false, force: false})  //alter: caso ja tenha uma tabela apenas alterar e force: se nao tiver ele cria uma nova tabela
    .then(() => console.log('A tabela de usuarios foi (re)criado'))
    .catch((error) => console.log(error));

module.exports = User;