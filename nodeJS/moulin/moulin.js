module.exports = class Moulin {

  constructor() {
    this.PartieMoulin = require("./PartieMoulin.js")
    this.parties = {}
    this.joueurs = {}
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
        this.joueurs[socket.id] = id
        this.parties[id] = new this.PartieMoulin(id, socket.id, duree, couleur)
        socket.emit("info", "id:"+ id)
        
      } else if (messageDivise[0] == "idConnexion") {
        if (messageDivise[1] in this.parties && this.parties[messageDivise[1]].joueur2 == null) {
          this.joueurs[socket.id] = messageDivise[1]
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

    socket.on("disconnect", (raison) => {
      const currentPartie = this.parties[this.joueurs[socket.id]]
      if (socket.id == currentPartie.joueur1) {
        envoiMoulin(currentPartie.joueur2, "info", "deconnecte")
      } else {
        envoiMoulin(currentPartie.joueur1, "info", "deconnecte")
      }
      delete this.joueurs[currentPartie.joueur1]
      delete this.joueurs[currentPartie.joueur2]
      delete this.parties[currentPartie.idPartie]
    })
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


