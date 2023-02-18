const express=require('express');
const { getExpenses } = require('../controllers/expense.js');
const userController= require('../controllers/users.js')

const router= express.Router();

router.post('/signup',userController.postUser)
router.post('/login',userController.signInPostUser)
module.exports= router