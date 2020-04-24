const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    }
});

const Genre = mongoose.model('Genre',genreSchema);



function validateGenre(genreName){
    const schema ={
        name:Joi.string().required()
    }
    return Joi.validate(genreName,schema);

}

module.exports.genreSchema= genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;