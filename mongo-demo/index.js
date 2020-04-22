const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
 .then(()=>console.log('Connected to MongoDB'))
 .catch(err =>console.error('Could not connect to mongo db' ,err));

//schema
 const courseSchema = new mongoose.Schema({
     name:String,
     author:String,
     tags:[String],
     date:{type:Date,default:Date.now},
     isPublished:Boolean

 });

 //compile schema into a model and create an instance of that model

 const Course = mongoose.model('Course',courseSchema);
 async function createCourse(){
    const course = new Course({
        name:'React js course',
        author:'Deepthi',
        tags:['react','front end'],
        isPublished:true
    })
   
    const result=await course.save();
    console.log('Result',result);
 }
// createCourse();


 async function getCourses(){
     const courses =await Course.find()
     console.log('Get Courses',courses);

 }
 getCourses();