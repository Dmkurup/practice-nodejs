const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
describe('absolute',()=>{
    it('should return a positive number if input is positive',()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    }
    )
})

describe('greeting',()=>{
it('should return a greeting',()=>{
    const result = lib.greet("joey");
    expect(result).toMatch(/joey/);
})
})


describe('currencies',()=>{
it('should return supported currencies',()=>{
    const result = lib.getCurrencies();
    expect(result).toContain('AUD');
    expect(result).toEqual(expect.arrayContaining(['EUR','AUD','USD']));

})
})
describe('getProduct',()=>{
it('should return an object',()=>{
    const result = lib.getProduct(1);
    expect(result).toMatchObject({id:1,price:10});
    expect(result).toHaveProperty('id',1);
})
})

describe('getProduct',()=>{
    it('should throw if username is falsy',()=>{
      const args=[null,undefined,NaN,'',0,false];
      args.forEach(arg=>{
        expect(()=>{lib.registerUser(arg)}).toThrow();
      })
     })
    })

describe('applyDiscount',()=>{
    it('apply discount',()=>{
        db.getCustomerSync=function(customerId){
            return { id: customerId, points: 11 };
        }
        
        const order = {customerId:1,totalPrice:10}
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })

})

describe('notifyCustomer',()=>{
    it('notify Customer',()=>{
        db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});

        // db.getCustomerSync=function(customerId){
        //     return { email:'a' };
        // }

        // let mailSent = false;
        // mail.send = function(email,msg){
        //     mailSent=true;
        // }

        mail.send=jest.fn();
        
 
        lib.notifyCustomer({customerId:1});
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
    })

})