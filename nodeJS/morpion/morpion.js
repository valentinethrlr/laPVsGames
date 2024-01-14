module.exports = class Morpion {

  constructor() {
    this.Partie = require("./Partie.js")

    //déclaration des variables
    this.parties = {}
    this.joueurs = {}
    this.id
  }

  connect(socket) {

    //quand quelqu'un se connecte ("connection") -> io = serveur en lui-même
    //quand quelqu'un se connecte, création d'une socket = poignée de main
    //chaque socket peut avoir des events de type ... (message, info,...)

    socket.on("conrequest", (message) => {

        if (message == "creer") {
        this.id=Math.floor((Math.random()) * 1000000)
          while (this.id in this.parties) {
            this.id=Math.floor((Math.random()) * 1000000)
            }

          this.parties[this.id] = new this.Partie(socket.id, this.id)
          socket.emit("info", "id:" + this.id)
          this.joueurs[socket.id] = this.id

        //vérifie que la partie existe et qu'il n'y a pas encore de joueur 2  
        } else if ((+message) in this.parties && this.parties[message].joueur2 == null) {
          //savoir qui est le joueur 2
          this.parties[message].joueur2 = socket.id
          this.joueurs[socket.id] = message
          this.parties[message].partieCommence()
        
        } else {
          socket.emit("info", "erreur:id inexistant")
        }

      })

    socket.on("partie", (message) => {
      let infoCase = message.split(":")
      if (infoCase[0] == "case") {
        this.parties[this.joueurs[socket.id]].coupJoue(infoCase[1], socket.id)
        
      } else if (infoCase[1] == "rejouer") {
        this.parties[this.joueurs[socket.id]].partieRecommence()
      }
    })

    socket.on("disconnect", (raison) => {
      const currentPartie = this.parties[this.joueurs[socket.id]]
      if (socket.id == currentPartie.joueur1) {
        envoiMorpion(currentPartie.joueur2, "info", "status:disconnect")
      } else {
        envoiMorpion(currentPartie.joueur1, "info", "status:disconnect")
      }
      delete this.joueurs[currentPartie.joueur1]
      delete this.joueurs[currentPartie.joueur2]
      delete this.parties[currentPartie.idPartie]
    })
  }
}



