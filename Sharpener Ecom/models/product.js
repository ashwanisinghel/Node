const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        // console.log(this.id)
        const existingProductIndex= products.findIndex(prod=>prod.id===this.id)
        console.log(existingProductIndex)
        const updatedProduct=[...products]
        updatedProduct[existingProductIndex]=this
        products.push(this);
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        })
      }else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }  
    });
  }

  static deleteProd(prodId){
    getProductsFromFile(products=>{
      console.log(prodId)
      const existingProductIndex=products.findIndex(prod=>prod.id===prodId);
      const updatedProduct=[...products]
      updatedProduct.splice(existingProductIndex,1)
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        console.log(err);
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
    getProductsFromFile((products)=>{
      const product= products.find(p=>p.id==id);
      cb(product);
    })
  }
};