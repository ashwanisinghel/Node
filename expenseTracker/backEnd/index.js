const express= require('express');
const Seqelize= require('sequelize');
const sequelize= require('./util/database');
const User= require('./models/users');
const Expense= require('./models/expense');
const cors= require('cors');
const userRoutes= require('./routes/users');
const expenseRoutes=require('./routes/expense')

const app= express()
app.use(cors());
app.use(express.json())

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes)

User.hasMany(Expense),
Expense.belongsTo(User,{onDelete:'cascade'})

const startApp=async()=>{
    try {
        const sync= await sequelize.sync()
        console.log(sync)
        const listen= app.listen(3000)
    } catch (error) {
        console.log(error)
    }

}

startApp()
