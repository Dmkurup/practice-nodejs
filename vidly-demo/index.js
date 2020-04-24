const express= require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('Connected to mongo db'))
    .catch(err =>console.error('Could not connect to db....'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);





app.get('/',(req,res)=>{
    res.send("Welcome to Vidly!!")
});


app.listen(3000);