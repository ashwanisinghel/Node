const Sequelize= require('sequelize');

const sequelize=require('../util/database.js');

const Appointments= sequelize.define('appointments',{
    id:{
        type:Sequelize.DOUBLE,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type:Sequelize.DOUBLE,
        allowNull:false,
        unique:true
    }
})

module.exports=Appointments