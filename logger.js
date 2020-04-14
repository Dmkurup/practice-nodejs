const EventEmitter = require('events');


class Logger extends EventEmitter{
log(message){
    console.log(message);
    this.emit("messageLogged",{url:"google.com"});
  }
}


module.exports=Logger;
