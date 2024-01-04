module.exports = class Moulin {

  constructor() {
    this.PartieMoulin = require("./PartieMoulin.js")
    this.parties = {}
  }

  connect(socket){

    socket.on("setup", (message) => {
      let messageDivise = message.split(":")
      if (messageDivise[0] == "creationId") {
        let id=Math.floor((Math.random()) * 1000000)
        while (id in this.parties) {
          id=Math.floor((Math.random()) * 1000000)
        }
        let duree = messageDivise[1]
        let couleur = messageDivise[2]
        this.parties[id] = new this.PartieMoulin(id, socket.id, duree, couleur)
        socket.emit("info", "id:"+ id)
        
      } else if (messageDivise[0] == "idConnexion") {
        if (messageDivise[1] in this.parties && this.parties[messageDivise[1]].joueur2 == null) {
          this.parties[messageDivise[1]].joueur2 = socket.id
          socket.emit("info", "bonneId")
          envoiMoulin(socket.id, "info", "commencer2")
          envoiMoulin(this.parties[messageDivise[1]].joueur1, "info", "commencer1")
        } else {
          socket.emit("info", "fausseId")
        }
        
      }
    })
  }
}


