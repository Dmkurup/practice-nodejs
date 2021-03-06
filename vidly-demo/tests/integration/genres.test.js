let server;
const request = require('supertest');
const {Genre} =require('../../models/genre');
const {User} =require('../../models/user');

describe('/api/genres',()=>{
    beforeEach(()=>{server=require('../../index');})

    afterEach(async()=>{
         await Genre.remove({});
        await server.close();
       
    })

    describe('GET/',()=>{
        it('should return all genres',async()=>{
            await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'}
            ]);

          const res=await request(server).get('/api/genres');

          expect(res.status).toBe(200);
          expect(res.body.length).toBe(2);
          expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();
          expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();

    });

        it('should return genre with particular id',async()=>{
            const genre = new Genre({name:'genre1'});
            await genre.save();

            const res=await request(server).get('/api/genres/'+genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name);
        });
  
});

      describe('POST/',()=>{
        let token;
        let name;

        const exec =()=>{
            return  request(server)
            .post('/api/genres')
            .set('x-auth-token',token)
            .send({name:name});
           }
        beforeEach=()=>{
            token = new User().generateAuthToken();
            name="genre1";
        }

        it('should return 401 if not logged in',async()=>{
            token ="";
            const res =await exec();
            expect(res.status).toBe(401);
           });

        it('should return 400 if genre less than 5 chars',async()=>{
            name="1234";

            const res = await exec();

            expect(res.status).toBe(401);
    });

            it('should return 400 if genre more  than 50 chars',async()=>{
 
             name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(401);
            });

      it('should return genre if logged in',async()=>{
        await exec();
        const genre = await Genre.find({name:'genre1'});
        expect(genre).not.toBeNull();
        });
    });

});