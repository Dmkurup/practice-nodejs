const express= require('express');
    const { Rental} = require('../models/rental');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/',auth,async(req,res)=>{

    if(!req.body.customerId) return res.status(400).send('Invalid customerId');
    if(!req.body.movieId) return res.status(400).send('Invalid movieId');

    const rental = await Rental.findOne({"customer._id":req.body.customerId,"movie._id":req.body.movieId,});
    if(!rental) return res.status(404).send('Rental does not exist');

    if(rental.dateReturned) return res.status(400).send('Return already processed');

    res.status(200).send();

})

module.exports=router;