const path=require('path');
const rootDir=require('../util/path')

const contactUs=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact.html'));
}

module.exports={
    contactUs:contactUs
}