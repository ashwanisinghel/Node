const express= require('express');
const expenseController= require('../controller/expense.js');

const router = express.Router();

router.post('/',expenseController.postExpense);
router.get('/',expenseController.getExpenses);
router.get('/:pk',expenseController.getExpense);
router.delete('/:pk',expenseController.deleteExpanse);

module.exports= router;