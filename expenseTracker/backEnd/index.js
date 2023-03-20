const express= require('express');
const Seqelize= require('sequelize');
const sequelize= require('./util/database');
const User= require('./models/users');
const Expense= require('./models/expense');
const Order= require('./models/order')
const cors= require('cors');
const userRoutes= require('./routes/users');
const expenseRoutes=require('./routes/expense');
const purcahseRoutes= require('./routes/order')

const app= express()
app.use(cors());
app.use(express.json())

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purcahseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User,{onDelete:'cascade'});

User.hasMany(Order);
Order.belongsTo(User);

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
