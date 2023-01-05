const express=require('express');
const bodyParser=require('body-parser')

const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use('/',(req,res,next)=>{
    console.log('this will always come')
    next();
})

app.use('/product',(req,res,next)=>{
    res.send("<form action='add-product' method='post'><input type='text', name='product'><input type='text' name='size'><button type='submit'>Add product</button></form>")
})
app.use('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/product')
})

app.listen(4000);