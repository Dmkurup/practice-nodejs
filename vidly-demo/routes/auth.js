const { User } = require('../models/user');
const express= require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ =require('lodash');
const router = express.Router();
const Joi = require('joi');

router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(404).send(error);

// authenticating email
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid user name or password');


// authenticating password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid user name or password');

    const token = user.generateAuthToken();
    res.send(token);
})

 function validate(user){
    const schema={
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}

module.exports=router;

