const express= require('express');
const cors= require('cors')
const sequelize= require('./util/database.js')

const appointmentRoutes= require('./routes/appointment.js')
const expenseRoutes= require('./routes/expense.js');

const app= express();
app.use(cors())
app.use(express.json())

app.use('/api',appointmentRoutes);
app.use('/expense-api',expenseRoutes);

sequelize.sync().then((res)=>{
    console.log(res);
    port=8080
    app.listen(port, console.log(`Server running on LocalHost ${port}`))
}).catch(err=> console.log(err))

