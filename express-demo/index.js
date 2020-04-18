const Joi = require('joi');
const config = require('config');
const logger =require('./logger');
const coursesRoute = require('./courses');
const home = require('./home');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app =express();

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/',home);
app.use('/api/courses',coursesRoute);

console.log(`App name ${config.get('name')}`);
console.log(`Mail host name ${config.get('mail.host')}`);

console.log(`NODE_ENV IS ${process.env.NODE_ENV}`);
console.log(`APP ENV IS ${app.get('env')}`);


const port = process.env.PORT || 3000;
// TO SET ENV VARIABLE SAY  'set PORT=5000'

app.listen(port,()=>{
    console.log(`Listening on port ${port} .....`);
})