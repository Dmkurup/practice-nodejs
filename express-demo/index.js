const Joi = require('joi');
const express = require('express');
const app =express();

app.use(express.json());

const courses =[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]

app.get('/',(req,res)=>{
    res.send("Hello World!!!!");
})

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
})

app.get('/api/courses/:id',(req,res)=>{
   // res.send(req.params.id);
   // res.send(req.params); 
   //res.send(req.query);

   const course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course)  return res.status(404).send("Course with given id not found!");
   res.send(course);
   
})


app.post('/api/courses',(req,res)=>{

   const {error}=validateData(req.body);
   if(error) return  res.status(400).send(error.details[0].message);
    const course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(courses);
})

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send("Course with given id not found!");

    const { error }=validateData(req.body);
    if(error) return  res.status(400).send(error.details[0].message);

  course.name =req.body.name;
  res.send(course);

})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>  c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Couse with the given id is not found");

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
})

function validateData(course){
    const schema ={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema); 
}

const port = process.env.PORT || 3000;
// TO SET ENV VARIABLE SAY  'set PORT=5000'

app.listen(port,()=>{
    console.log(`Listening on port ${port} .....`);
})