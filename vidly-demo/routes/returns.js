const express= require('express');
const { Rental} = require('../models/rental');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/',async(req,res)=>{
    res.status(401).send('Unauthorized');
})

module.exports=router;