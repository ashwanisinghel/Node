const path = require('path');
const sequelize=require('./util/database');
const Sequelize=require('sequelize');

const express = require('express');
const bodyParser = require('body-parser');

const User= require('./models/user');
const Product= require('./models/product');
const Cart= require('./models/cart');
const CartItem= require('./models/cart-item')

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err)
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})

sequelize.sync({force:true}).then((res)=>{

    return User.findByPk(1)
    // console.log(res);
    // app.listen(3000);
})
.then((user)=>{
    if(!user){
        return User.create({name:'test',email:'test@test.com'})
    }
    return user
}).then((user)=>{
   return user.createCart()
    // console.log(user);
    // app.listen(3000);
}).then((cart)=>{
    console.log(cart);
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})


