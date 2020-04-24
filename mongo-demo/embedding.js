const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//find and update in memory and save approach
async function updateAuthor(courseId){
  const course=await Course.findById(courseId);
  course.author.name='Deepthi';
  course.save();
}

//direct db update
async function updateAuthor(courseId){
  const course = await Course.update({_id:courseId},{
    $set:{
      'author.name':'Joey Kurup'
    }
  });
}

//to remove author sub document use unset operator
async function updateAuthor(courseId){
  const course = await Course.update({_id:courseId},{
    $unset:{
      'author.name':''
    }
  });
}

updateAuthor('5e9fab2a48185b07106d0996');

//createCourse('Node Course', new Author({ name: 'Mosh' }));
