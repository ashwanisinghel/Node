const path=require('path');
const rootDir=require('../util/path')

const getAddProduct=(req,res,next)=>{
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

const postAddProduct=(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
}

module.exports={
    getAddProduct:getAddProduct,
    postAddProduct:postAddProduct
}