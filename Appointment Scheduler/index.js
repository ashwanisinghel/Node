const express= require('express');
const sequelize= require('./util/database.js')

const appointmentRoutes= require('./routes/appointment.js')

const app= express();
app.use(express.json())

app.use('/',appointmentRoutes)

sequelize.sync().then((res)=>{
    console.log(res);
    port=3000
    app.listen(port, console.log(`Server running on LocalHost ${port}`))
}).catch(err=> console.log(err))

