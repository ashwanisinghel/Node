const fs = require('fs');
const db= require('../util/database')

const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    return db.execute('INSERT INTO products (title,imageUrl,description,price) VALUES (?,?,?,?)',[this.title,this.imageUrl,this.description,this.price]);

    // getProductsFromFile(products => {
    //   if(this.id){
    //     // console.log(this.id)
    //     const existingProductIndex= products.findIndex(prod=>prod.id===this.id)
    //     console.log(existingProductIndex)
    //     const updatedProduct=[...products]
    //     updatedProduct[existingProductIndex]=this
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(updatedProduct), err => {
    //       console.log(err);
    //     })
    //   }else{
    //     this.id=Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }  
    // });
  }

  static deleteProd(prodId){
    // getProductsFromFile(products=>{
    //   console.log(prodId)
    //   const existingProductIndex=products.findIndex(prod=>prod.id===prodId);
    //   const updatedProduct=[...products]
    //   updatedProduct.splice(existingProductIndex,1)
    //   fs.writeFile(p, JSON.stringify(updatedProduct), err => {
    //     console.log(err);
    //   })
    // })
  }

  static fetchAll() {
    return db.execute('SELECT * from products')
    // getProductsFromFile(cb);
  }

  static findById(id){
    return db.execute('SELECT * FROM products WHERE id=?',[id])
    // getProductsFromFile((products)=>{
    //   const product= products.find(p=>p.id==id);
    //   cb(product);
    // })
  }
};
