const express=require('express');

const app=express();

app.use((req,res,next)=>{
    console.log('express chal rha hai bhai');
    res.send('<h1>Jai ho BABA ki<h1>');
    next();
})
app.use((req,res,next)=>{
    console.log('2nd middleware be like swagat nahi karoge hamara');
})

app.listen(4000);