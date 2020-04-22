const express= require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('Connected to mongo db'))
    .catch(err =>console.error('Could not connect to db....'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);




app.get('/',(req,res)=>{
    res.send("Welcome to Vidly!!")
});



app.listen(3000);