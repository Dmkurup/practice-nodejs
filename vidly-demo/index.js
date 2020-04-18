const express= require('express');
const app = express();
const Joi = require('joi');
const genresRoute = require('.routes/genres');
app.use(express.json());
app.use('/api/genres',genresRoute)



app.get('/',(req,res)=>{
    res.send("Welcome to Vidly!!")
});



app.listen(3000);