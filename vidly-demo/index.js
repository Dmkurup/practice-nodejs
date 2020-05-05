require('express-async-errors'); // can use this in place of the async middleare we coded

const winston = require('winston');
const express= require('express');
const app = express();
const Joi = require('joi');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();





app.get('/',(req,res)=>{
    res.send("Welcome to Vidly!!")
});

const port =process.env.PORT||5000;
console.log(port);
const server=app.listen(port); //returns a server object

module.exports=server;