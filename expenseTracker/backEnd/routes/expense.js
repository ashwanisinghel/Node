const express= require('express');
const expenseController=require('../controllers/expense')
const router= express.Router();

router.post('/add',expenseController.addExpense);
router.delete('/remove/:pk',expenseController.removeExpense);
router.get('/',expenseController.getExpenses);
router.get('/:pk',expenseController.getExpense);

module.exports=router