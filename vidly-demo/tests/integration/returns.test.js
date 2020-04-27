const {Rental} =require('../../models/rental');
const {User} =require('../../models/user');
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
let token;

const exec = ()=>{
    return request(server)
    .post('/api/returns')
    .set('x-auth-token',token)
    .send({customerId,movieId})
};
describe('/api/returns',()=>{

    beforeEach(async()=>{
        server=require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();  
        token= new User().generateAuthToken();    
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
        await server.close();
        await Rental.remove({});
    })

    it('should work ',async()=>{
       const res =await Rental.findById(rental._id);
       expect(res).not.toBeNull();
    })

    it('should return 401 if client is not logged in ',async()=>{
         token =""
        const res =await exec();
        expect(res.status).toBe(401);
     })

     
    it('should return 400 if customerId is not valid ',async()=>{
        customerId="";
        const res =await exec();
        expect(res.status).toBe(400);
     })

     it('should return 400 if movieId is not valid ',async()=>{
        movieId="";
        const res =await exec();
        expect(res.status).toBe(400);
     })

     it('should return 404 if movie/custId rental obj does not exist',async()=>{
        await Rental.remove({});
        const res =await exec();
        expect(res.status).toBe(404);
     })

     it('should return 400 if rental return is  already processed',async()=>{
        rental.dateReturned = new Date();
        await rental.save();
        const res =await exec();
        expect(res.status).toBe(400);
     })

     it('should return 200 if request is valid',async()=>{
 
        const res =await exec();
        expect(res.status).toBe(200);
     })

})