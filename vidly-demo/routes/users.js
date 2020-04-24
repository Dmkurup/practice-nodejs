const { User , validate} = require('../models/user');
const auth = require('../middleware/auth');
const express= require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ =require('lodash');
const router = express.Router();

//current user
router.get('/me',auth,async(req,res)=>{
    const user=await User.findById(req.user._id).select('-password');
    res.send(user);
})


//find all
router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(404).send(error);

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already registered');

    user= new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password =await  bcrypt.hash(user.password,salt)
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
})

module.exports= router;

