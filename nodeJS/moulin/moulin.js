module.exports = class Moulin {

    constructor() {
      this.Partie = require("./PartieMoulin.js")
      this.id
      this.parties = {}
      this.duree
      this.couleur
    }
  
    connect(socket){
        
      socket.on("setup", (message) => {
        messageDivise = message.split(":")
        if (message[0] == "creationId") {
          this.id=Math.floor((Math.random()) * 1000000)
          while (this.id in this.parties) {
            this.id=Math.floor((Math.random()) * 1000000)
          }
        }

        if (message[0] == "duree") {
          this.duree = message[1]
          socket.emit("test", this.duree)
        }

        if (message[0] == "couleur") {
          this.couleur = message[1]
        }

        this.parties += new this.PartieMoulin(this.id, socket.id, this.duree, this.couleur)
        socket.emit("info", `commencer:${this.id}`)
      })


}
}
