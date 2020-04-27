const {Rental} =require('../../models/rental');
const mongoose= require('mongoose');
const request = require('supertest');
//POST('/api/returns    {customerId,movieId})
//400 if client  not logged in
//401 if customerId invalid
//401 if movieId invalid
//404 if such a rental obj does not exist
//400 if rental already processed ie date oUt will have some value
//200 if valid request
//set return date
//renal fee calculate
//increase the movie stock
//rental summary 


let server;
let customerId;
let movieId;
let rental;
describe('/api/returns',()=>{

    beforeEach(async()=>{
        server=require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        
//create a DB entry
         rental = new Rental({
            customer:{
                _id:customerId,
                name:"12345",
                phone:"12345"
            },
            movie:{
                _id:movieId,
                title:"12345",
                dailyRentalRate:2
            }
        });

       await rental.save();
})

    afterEach(async()=>{
        server.close();
        await Rental.remove({});
    })

    it('should work ',async()=>{
       const res =await Rental.findById(rental._id);
       expect(res).not.toBeNull();
    })

    it('should return 401 if client is not logged in ',async()=>{
        const res =await request(server)
                        .post('/api/rentals')
                        .send({customerId :customerId,movieId:movieId})
        expect(res.status).toBe(401);
     })

})