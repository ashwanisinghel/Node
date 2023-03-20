const express= require('express');
const purcahseController= require('../controllers/order')

const router = express.Router()

router.get('/premium',purcahseController.getPurcahsePremium);

router.post('/premium',purcahseController.postPurchasePrimium)

module.exports=router;