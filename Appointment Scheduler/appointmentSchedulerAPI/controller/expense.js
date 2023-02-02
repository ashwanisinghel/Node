const Expense= require('../model/expenseModel.js');

exports.postExpense=async(req,res,next)=>{
    const data= req.body;
    console.log(data);
    const amount= data.amount;
    const type= data.type;
    const detail= data.detail;
    try{
        const data=await Expense.create({
            amount:amount,
            type:type,
            detail:detail
        });
        res.send(data);
    }catch(err){
        console.log(err);
    }
};

exports.getExpenses=async(req,res,next)=>{
    try{
        const data= await Expense.findAll();
        res.send(data);
    }catch(err){
        console.log(err);
    }
};

exports.getExpense= async(req,res,next)=>{
    const pk= req.params.pk;
    try {
        const data =await Expense.findByPk(pk);
        res.send(data);
    } catch (error) {
        console.log(err);
    }
};

exports.deleteExpanse= async(req,res,next)=>{
    const pk= req.params.pk;
    try {
        const data =await Expense.findByPk(pk);
        data.destroy();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
};