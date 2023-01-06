const express=require('express');

const router=express.Router();

router.get('/product',(req,res,next)=>{
    res.send("<form action='/admin/product' method='post'><input type='text', name='product'><input type='text' name='size'><button type='submit'>Add product</button></form>")
})
router.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/admin/product');
})


module.exports=router;