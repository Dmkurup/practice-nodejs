const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
 .then(()=>console.log('Connected to db'))
 .catch(err => console.error(err.message));

 const courseSchema = new mongoose.Schema({
     name:String,
     author:String,
     isPublished:Boolean,
     price:Number,
     date:{type:Date, default: Date.now},
     tags:[String]
 });

 const Course = mongoose.model('Course',courseSchema);

 async function getCourses(){
     const courses = await Course
     .find({isPublished:true})
     .sort({price:-1})
     .select({name:1,author:1});
     console.log(courses);
 }

 getCourses();


//  async function updateCourse(id){
//      const course =await Course.find({_id:id});
//      console.log("Course here",course);
//      if(!course)    return;
//      course.author ='New Author';
//      const result = await course.save();
//      console.log(result);
//  }

 //updateCourse('5a68fde3f09ad7646ddec17e');

 async function updateCourse(id){
     const result = await Course.update({_id:id},{
         $set:{
             author:"Joey"
         }
     });
     console.log(result);
 }
 //updateCourse('5a68fde3f09ad7646ddec17e');