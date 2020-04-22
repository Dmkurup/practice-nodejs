const { Genre , validate} = require('../models/genre');
const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();


//find all
router.get('/',async(req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

//find by id
router.get('/:id',async(req,res)=>{
    const genre = await Genre.findById(req.params.id);
 //   const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre with the specified id not found");

    res.send(genre);
})

router.put('/:id',async(req,res)=>{

    const {error}=validate(req.body);
    if(error) return res.status(404).send(error);

    const genre =await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});

    if(!genre) return res.status(404).send("Genre with the specified id not found");

    res.send(genre);
})

router.post('/',async(req,res)=>{
     const {error}=validate(req.body);
     if(error) return res.status(404).send(error);

     let genre= new Genre ({ name: req.body.name});
     genre=await genre.save();

     res.send(genre);
})

router.delete('/:id',async(req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send("Genre with the specified id not found");

    res.send(genre);
})


module.exports = router;