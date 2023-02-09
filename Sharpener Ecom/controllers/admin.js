const { response } = require('express');
const { where } = require('sequelize');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log(req.user.id,'this user is from heaven')
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  }).then((result)=>{
    res.redirect('/');
    console.log(result)
  }).catch((err)=>{
    console.log(err)
  })
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    res.redirect('/')
  }
  const prodId=req.params.productID;
  req.user.getProducts({where:{id:prodId}}).then((product)=>{
    if(!product){
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
      // formsCSS: true,
      // productCSS: true,
      // activeAddProduct: true
    });
  }).catch(err=>{
    console.log(err);
  })
};

exports.postEditProduct= (req,res,next)=>{
  // console.log('Ye body hai', req.body)
  const id= req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(id).then(prod=>{
    prod.title=title;
    prod.imageUrl=imageUrl;
    prod.price=price;
    prod.description=description;
    return prod.save()
  }).then((response)=>{
    console.log(response);
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
}

exports.postDeleteProduct = (req,res,next)=>{
  prodId=req.body.productId;
  Product.findByPk(prodId).then((prod)=>{
    return prod.destroy()
  }).then((response)=>{
    res.redirect('/admin/products');
  }).catch((err)=>{
    console.log(err);
  })
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((err)=>{
    console.log(err);
  });
};
