const Appointments=require('../model/appointmentModel')

exports.postAppointment = async(req,res,next)=>{
    const data= req.body;
    const name= data.name;
    const email= data.email;
    const phone=data.phone;
    try{
        const data=await Appointments.create({
            name:name,
            email:email,
            phone:phone
        });
        res.send(data)
    }
    catch(err){
        console.log(err);
        res.send(err.errors[0].message)
    }
};

exports.getAppointements = async(req,res,next)=>{
    try{
       const data= await Appointments.findAll();
       res.send(data);
    }catch(err){
        console.log(err);
    }
}

exports.getAppointement= async(req,res,next)=>{
    const pk=req.params.pk;
    try{
        const data= await Appointments.findByPk(pk);
        res.send(data);
    }catch(err){
        console.log(err);
    }
    
}

exports.deleteAppoitment= async(req,res,next)=>{
    const pk=req.params.pk;
    try{
        const data= await Appointments.findByPk(pk);
        const destroyData= await data.destroy()
        res.send(destroyData)
    }catch(err){
        console.log(err);
    } 
}
