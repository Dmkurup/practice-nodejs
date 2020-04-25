const { Genre , validate} = require('../models/genre');
const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

//find all
router.get('/',asyncMiddleware(async(req,res,next)=>{
        const genres = await Genre.find().sort('name');
        res.send(genres);
}));

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

router.post('/',auth,async(req,res)=>{
     const {error}=validate(req.body);
     if(error) return res.status(404).send(error);

     let genre= new Genre ({ name: req.body.name});
     genre=await genre.save();

     res.send(genre);
})

router.delete('/:id',[auth,admin],async(req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send("Genre with the specified id not found");

    res.send(genre);
})


module.exports = router;