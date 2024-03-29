module.exports = class Moulin {

  constructor() {
    this.PartieMoulin = require("./PartieMoulin.js")
    this.parties = {}
    this.joueurs = {}
  }

  connect(socket){

    socket.on("setup", (message) => {
      if (message["but"] == "creationId") {
        let id=Math.floor((Math.random()) * 1000000)
        while (id in this.parties) {
          id=Math.floor((Math.random()) * 1000000)
        }
        const duree = Number(message["duree"])
        const couleur = message["couleur"]
        this.joueurs[socket.id] = id
        this.parties[id] = new this.PartieMoulin(id, socket.id, duree, couleur)
        socket.emit("info", {"but": "id", "id": id})
        
      } else if (message["but"] == "idConnexion") {
        if (message["id"] in this.parties && this.parties[message["id"]].joueur2 == null) {
          this.joueurs[socket.id] = message["id"]
          this.parties[message["id"]].joueur2 = socket.id
          this.commencerPartie(message["id"])   
        } else {
          socket.emit("info", {"but" : "fausseId"})
        } 
      } else if (message["but"] == "case") {
        this.parties[message["id"]].joue(message["case"], socket.id)
      } else if (message["but"] == "pion") {
        this.parties[message["id"]].selectionne(message["pion"], socket.id)
      }
    })

    socket.on("disconnect", (raison) => {
      const currentPartie = this.parties[this.joueurs[socket.id]]
      if(!currentPartie){
        return
      }
      if (socket.id == currentPartie.joueur1) {
        envoiMoulin(currentPartie.joueur2, "info", {"but" : "deconnecte"})
        currentPartie.joueur2.disconnect()
      } else {
        envoiMoulin(currentPartie.joueur1, "info", {"but" : "deconnecte"})
        currentPartie.joueur1.disconnect()
      }
      delete this.joueurs[currentPartie.joueur1]
      delete this.joueurs[currentPartie.joueur2]
      delete this.parties[currentPartie.id]
    })

  }

  commencerPartie(partieId) {
    envoiMoulin(this.parties[partieId].joueur1, "info", {"but" : "commencer1"})
    envoiMoulin(this.parties[partieId].joueur2, "info", {"but" : "commencer2"})
    if (this.parties[partieId].tempsb == 0) {
      envoiMoulin(this.parties[partieId].joueur1, "info", {"but" : "temps", "temps" : "pasTimer"})
      envoiMoulin(this.parties[partieId].joueur2, "info", {"but" : "temps", "temps" : "pasTimer"})
    } else {
      envoiMoulin(this.parties[partieId].joueur1, "info", {"but" : "temps", "temps" : this.parties[partieId].duree})
      envoiMoulin(this.parties[partieId].joueur2, "info", {"but" : "temps", "temps" : this.parties[partieId].duree})
    }

    if (this.parties[partieId].couleur1 == "b") {
      envoiMoulin(this.parties[partieId].joueur1, "info", {"but" : "couleur", "couleur" : "b"})
      envoiMoulin(this.parties[partieId].joueur2, "info", {"but" : "couleur", "couleur" : "n"})
    } else {
      envoiMoulin(this.parties[partieId].joueur1, "info", {"but" : "couleur", "couleur" : "n"})
      envoiMoulin(this.parties[partieId].joueur2, "info", {"but" : "couleur", "couleur" : "b"})
    }
  }

}


