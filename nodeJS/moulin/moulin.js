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
        let duree = Number(messageDivise[1])
        let couleur = messageDivise[2]
        this.parties[id] = new this.PartieMoulin(id, socket.id, duree, couleur)
        socket.emit("info", "id:"+ id)
        
      } else if (messageDivise[0] == "idConnexion") {
        if (messageDivise[1] in this.parties && this.parties[messageDivise[1]].joueur2 == null) {
          this.parties[messageDivise[1]].joueur2 = socket.id
          this.commencerPartie(messageDivise[1])   
        } else {
          socket.emit("info", "fausseId")
        } 
      } else if (messageDivise[0] == "case") {
        this.parties[messageDivise[2]].joue(messageDivise[1], socket.id)
      } else if (messageDivise[0] == "pion") {
        this.parties[messageDivise[2]].selectionne(messageDivise[1], socket.id)
      }
    })

    socket.on("disconnect", (reason) => {
      
    });

  }

  commencerPartie(partieId) {
    envoiMoulin(this.parties[partieId].joueur1, "info", "commencer1")
    envoiMoulin(this.parties[partieId].joueur2, "info", "commencer2")
    if (this.parties[partieId].tempsb == 0) {
      envoiMoulin(this.parties[partieId].joueur1, "info", "temps:pasTimer")
      envoiMoulin(this.parties[partieId].joueur2, "info", "temps:pasTimer")
    } else {
      envoiMoulin(this.parties[partieId].joueur1, "info", `temps:0${this.parties[partieId].duree}`)
      envoiMoulin(this.parties[partieId].joueur2, "info", `temps:0${this.parties[partieId].duree}`)
    }

    if (this.parties[partieId].couleur1 == "b") {
      envoiMoulin(this.parties[partieId].joueur1, "info", "couleur:b")
      envoiMoulin(this.parties[partieId].joueur2, "info", "couleur:n")
    } else {
      envoiMoulin(this.parties[partieId].joueur1, "info", "couleur:n")
      envoiMoulin(this.parties[partieId].joueur2, "info", "couleur:b")
    }
  }

}


