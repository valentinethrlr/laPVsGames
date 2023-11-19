module.exports = class Moulin {

    constructor() {
  
      //déclaration des variables
      
    }
  
    connect(socket){
        
            socket.on('connected', () => {
                socket.emit("message", "connect")
            })
    }
}





