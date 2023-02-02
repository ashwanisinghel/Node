const mysql= require('mysql2');
const {Sequelize}= require('sequelize');

const sequelize=new Sequelize('node_practice','root','153624',{dialect:'mysql',host:'localhost'});

module.exports=sequelize