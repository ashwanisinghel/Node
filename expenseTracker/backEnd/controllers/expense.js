const Expense= require('../models/expense');
const jwt= require('jsonwebtoken');
const { where } = require('sequelize');
const sequelize= require('../util/database');
const User = require('../models/users');

exports.addExpense= async(req,res,next)=>{
    const formData= req.body.data
    const token= jwt.decode(req.body.token)
    formData.userId=token.userId
    try{
        const data= await Expense.create(formData)
        res.send(data)
    }catch(err){
        console.log(err)
    }
}

exports.removeExpense=async(req,res,next)=>{
    
}

exports.getExpense=async(req,res,next)=>{
    try {
        const userId=jwt.decode(req.headers.authorization).userId;
        const pk= req.headers.pk
        const data= await Expense.findByPk(pk,{where:{userId:userId}})
        res.status(200).json({data:{id:data.id,amount:data.amount,type:data.type,detail:data.detail}})
    } catch (error){
        console.log(err)
    }
    
}
exports.getExpenses=async(req,res,next)=>{
    try{
        const userId=jwt.decode(req.headers.authorization).userId
        const data= await Expense.findAll({where:{userId:userId}})
        const isPremium= await User.findByPk(userId,{attributes:['isPremium']});
        res.status(200).json({resData:{data,isPremium}})
    }catch(err){
        console.log(err)
    }
}

exports.removeExpense=async(req,res,next)=>{
    try {
        const userId=jwt.decode(req.headers.authorization).userId;
        const pk= req.headers.pk
        const data= await Expense.findByPk(pk,{where:{userId:userId}})
        data.destroy()
        res.status(200).json({data:{id:data.id,amount:data.amount,type:data.type,detail:data.detail}})
    } catch (error){
        console.log(error)
        res.status(400).json({err:'expense does not exist'})
    }
}

exports.getExpensesGroupby=async(req,res,next)=>{
    const responseData= await sequelize.query("with cte as (SELECT sum(amount) amount_sum, userId FROM expense_tracker.expenses group by userId) select x.name, cte.amount_sum from cte left join expense_tracker.users x on cte.userId=x.id order by amount_sum desc")

    res.status(200).json({'data':responseData});
}

