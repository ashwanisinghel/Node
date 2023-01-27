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
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  });
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    res.redirect('/')
  }
  const prodId=req.params.productID;
  Product.findById(prodId, product=>{
    if(!product){
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
      // formsCSS: true,
      // productCSS: true,
      // activeAddProduct: true
    });
  })
};

exports.postEditProduct= (req,res,next)=>{
  // console.log('Ye body hai', req.body)
  const id= req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(id,title, imageUrl, description, price)
  product.save()
  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req,res,next)=>{
  Product.deleteProd(req.body.productId);
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
