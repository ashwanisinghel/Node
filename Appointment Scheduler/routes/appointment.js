const express= require('express');
const appointmentController=require('../controller/appointment')

const router= express.Router();

router.post('/',appointmentController.postAppointment);
router.get('/',appointmentController.getAppointements);
router.get('/:pk',appointmentController.getAppointement);
router.delete('/:pk',appointmentController.deleteAppoitment);

module.exports=router;
