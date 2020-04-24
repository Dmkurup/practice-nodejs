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
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
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

//updateAuthor('5e9fab2a48185b07106d0996');
async function addAuthor(courseId,author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

//addAuthor('5e9fb4a2a1416a4528c2f15c',new Author({name:'Deepthi'}));

async function removeAuthor(courseId,authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('5e9fb4a2a1416a4528c2f15c','5e9fb5a2e8bde6315c8ba2ca');

// createCourse('Node Course', [
// new Author({ name: 'Mosh' }),
// new Author({name: 'Joey'})
// ]);
