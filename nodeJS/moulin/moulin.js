module.exports = class Moulin {

    constructor() {
      this.Partie = require("./PartieMoulin.js")
      this.id
      this.parties = {}
      this.duree
      this.couleur
      this.messageDivise
    }
  
    connect(socket){
        
      socket.on("setup", (message) => {
        this.messageDivise = message.split(":")
        if (this.messageDivise[0] == "creationId") {
          console.log("création ID")
          this.id=Math.floor((Math.random()) * 1000000)
          while (this.id in this.parties) {
            this.id=Math.floor((Math.random()) * 1000000)
          }
          socket.emit("info", "id:"+this.id)

        }

        if (this.messageDivise[0] == "duree") {
          this.duree = this.messageDivise[1]
          socket.emit("test", this.duree)
        }

        if (this.messageDivise[0] == "couleur") {
          this.couleur = this.messageDivise[1]
        }

        this.parties += new this.PartieMoulin(this.id, socket.id, this.duree, this.couleur)
      })

}
}
