const express= require('express');
const router = express.Router();

const genres =[
    {id:1, genre:"Action"},
    {id:2, genre:"Drama"},
    {id:3, genre:"RoMcOM"},
    {id:4, genre:"Spiritual"}
    
]

router.get('/api/genres',(req,res)=>{
    res.send(genres);
})

router.get('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre with the specified id not found");

    res.send(genre);
})

router.put('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre with the specified id not found");

    const {error}=validateData(req.body);
    if(error) return res.status(404).send(error);

    genre.name = req.body.genre;
    res.send(genre);
})

router.post('/api/genres',(req,res)=>{
const {error}=validateData(req.body);
if(error) return res.status(404).send(error);

 const genre={   
    id: genres.length+1,
    genre: req.body.genre
 }
 genres.push(genre);
 res.send(genre);
})

router.delete('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre with the specified id not found");

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    genre.name = req.body.genre;
    res.send(genre);
})

function validateData(genreName){
    const schema ={
        genre:Joi.string().required()
    }
    return Joi.validate(genreName,schema);

}

module.exports = router;