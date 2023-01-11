const express=require('express');
const router=express.Router();

const contact=require('../controller/contact');

router.get('/',contact.contactUs);

module.exports=router;