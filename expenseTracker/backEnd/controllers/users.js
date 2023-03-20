const User= require('../models/users')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')

const webtoken= (id,name)=>{
    return jwt.sign({userId:id,name:name},'1551abxa2344')
}

exports.postUser=async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    try {
        const salt= await bcrypt.genSalt(10);
        const hasedPass= await bcrypt.hash(password,salt);
        const data=await User.create({name:name,password:hasedPass,email:email})
        res.status(200).json({"status":"User created","email":data.email})
    } catch (error) {

        if(error.errors[0].message=='email must be unique'){
            res.send("Existing User try Sign In")
        }
        else{
            res.send(error)
        }
        
    }
}

exports.signInPostUser= async(req,res,next)=>{
    try {
        const pk= req.body.email
        const password=req.body.password
        const data= await User.findAll({where:{email:pk}})
        if(data[0]!=undefined){
            const matchFlag= await bcrypt.compare(password,data[0].password)
            if (matchFlag){
                const token=webtoken(data[0].id,data[0].name,data[0])
                res.status(200).json({'flag':matchFlag,'token':token})
            }else{
                res.status(200).json(matchFlag)
            }
        }else{
            res.send("user does'nt exist")
        }
                
    } catch (error) {
        console.log(error)
    }
}