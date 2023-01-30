const { STRING } = require("sequelize");
const Sequelize = require("sequelize")

const sequelize= require('../util/database');

const Product= sequelize.define('products',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  imageUrl: Sequelize.STRING,
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  }
})

module.exports=Product;