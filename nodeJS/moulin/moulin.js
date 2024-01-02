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
        if (messageDivise[0] == "creationId") {
          this.id=Math.floor((Math.random()) * 1000000)
          while (this.id in this.parties) {
            this.id=Math.floor((Math.random()) * 1000000)
          }
        }

        if (messageDivise[0] == "duree") {
          this.duree = messageDivise[1]
          socket.emit("test", this.duree)
        }

        if (messageDivise[0] == "couleur") {
          this.couleur = messageDivise[1]
        }

        this.parties += new this.PartieMoulin(this.id, socket.id, this.duree, this.couleur)
        socket.emit("info", "id:"+this.id)
      })

}
}
