const Expense= require('../models/expense');

exports.addExpense= async(req,res,next)=>{
    const formData= req.body
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
    console.log(req.headers)
}
exports.getExpenses=async(req,res,next)=>{
    try{
        const data= await Expense.findAll()
        res.send(data)
    }catch(err){
        console.log(err)
    }
}