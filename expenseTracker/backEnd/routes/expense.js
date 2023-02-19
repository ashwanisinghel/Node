const express= require('express');
const expenseController=require('../controllers/expense')
const router= express.Router();

router.post('/add',expenseController.addExpense);
router.delete('/remove',expenseController.removeExpense);
router.get('/getall',expenseController.getExpenses);
router.get('/get',expenseController.getExpense);

module.exports=router