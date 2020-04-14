function sayHello(name){
    console.log("Hello "+name);
}

sayHello("Joey");




// //Module {
//     id: '.',
//     exports: {},
//     parent: null,
//     filename: 'C:\\Users\\Asus\\IdeaProjects\\practice-nodejs\\app.js',
//     loaded: false,
//     children: [],
//     paths:
//      [ 'C:\\Users\\Asus\\IdeaProjects\\practice-nodejs\\node_modules',
//        'C:\\Users\\Asus\\IdeaProjects\\node_modules',
//        'C:\\Users\\Asus\\node_modules',
//        'C:\\Users\\node_modules',
//        'C:\\node_modules' ] }

const logger = require('./logger');
console.log(module);
console.log(logger);
logger("Hello");


const path = require('path');
var pathObj =path.parse(__filename);
console.log(pathObj);

const os = require('os');
var totalMem = os.totalmem;
var freeMem = os.freemem;
console.log(`Total memory : ${totalMem}`);
console.log(`Free memory: ${freeMem}`);


const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);

const files = fs.readdir('./',(err,res)=>{
    if(err) console.log('Error  '+err);
    else console.log("Result  "+res);
})

//Events Module

const EventEmitter = require('events');
const emitter = new EventEmitter(); //cretaed an obj
//create a listener
emitter.on('message logged',e=>{
    console.log('listener called',e.url);
})

//raise an event
emitter.emit('message logged',{id:1 ,url:'google.com'});