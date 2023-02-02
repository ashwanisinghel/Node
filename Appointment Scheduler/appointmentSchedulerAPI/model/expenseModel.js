const Sequelize= require('sequelize')

const sequelize= require('../util/database.js');

const Expense= sequelize.define('expenses',{
    id:{
        type:Sequelize.DOUBLE,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    type:{
        type:Sequelize.STRING,
        allowNull:false
    },
    detail:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

module.exports=Expense;