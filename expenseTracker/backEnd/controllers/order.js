const Razorpay= require('razorpay');
const jwt=require('jsonwebtoken');
const Order= require('../models/order');
const Users= require('../models/users')
require('dotenv').config();



exports.getPurcahsePremium=async(req,res,next)=>{
    try {
        const userId=jwt.decode(req.headers.authorization).userId
        var rzp= new Razorpay({
            key_id:process.env.rzp_key_id,
            key_secret:process.env.rzp_key_secret
        })

        const amount=2500;

        const order= await rzp.orders.create({amount,currency:'INR'});
        const data= await Order.create({orderId:order.id,status:'pending',userId:userId});
        res.status(201).json({order,key_id:rzp.key_id})
        
    } catch (error) {
        console.log(error)
    }
}


exports.postPurchasePrimium= async(req,res,next)=>{
    try {
        const userId=jwt.decode(req.headers.authorization).userId;
        const orderId= req.body.order_id;
        const paymentId= req.body.payment_id
        const data= await Order.findOne({where:{userId:userId,orderId:orderId}})
        const userData= await Users.findByPk(userId) ;
        const updatedData=  data.update({paymentId:paymentId,status:'sucess'})

        const updatedUserData= userData.update({isPremium:true})

        const promiseUpdate=await Promise.all([updatedData,updatedUserData])
        
        res.status(200).json({data:{status:'You are primium now'}})
    } catch (error) {
        console.log(error)
    }
}