//inclusion des librairies
var Partie = require("./Partie.js")
const httpServer = require("http").createServer();

//déclaration des variables
let parties = {}
let joueurs = {}
let id

//initialiser le serveur
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://valentine.totifle.ch",
    methods: ["GET", "POST"]
  }
});

//quand quelqu'un se connecte ("connection") -> io = serveur en lui-même
//quand quelqu'un se connecte, création d'une socket = poignée de main
//chaque socket peut avoir des events de type ... (message, info,...)
io.on("connection", (socket) => {

  socket.on("conrequest", (message) => {

    if (message == "creer") {
      id=Math.floor((Math.random()) * 1000000)
      while (id in parties) {
        id=Math.floor((Math.random()) * 1000000)
      }
      parties[id] = new Partie(socket.id, id)
      socket.emit("info", "id:" + id)
      joueurs[socket.id] = id

    //vérifie que la partie existe et qu'il n'y a pas encore de joueur 2  
    } else if ((+message) in parties && parties[message].joueur2 == null) {
      //savoir qui est le joueur 2
      parties[message].joueur2 = socket.id
      joueurs[socket.id] = message
      parties[message].partieCommence()
    
    } else {
      socket.emit("info", "erreur:id inexistant")
    }

  })

  socket.on("partie", (message) => {
    let infoCase = message.split(":")
    if (infoCase[0] == "case") {
      parties[joueurs[socket.id]].coupJoue(infoCase[1], socket.id)
    
    } else if (infoCase[1] == "rejouer") {
      parties[joueurs[socket.id]].partieRecommence()
    }
  })

  socket.on("disconnect", (raison) => {
    const currentPartie = parties[joueurs[socket.id]]
    if (socket.id == currentPartie.joueur1) {
      envoiClient(currentPartie.joueur2, "info", "status:disconnect")
    } else {
      envoiClient(currentPartie.joueur1, "info", "status:disconnect")
    }
    delete joueurs[currentPartie.joueur1]
    delete joueurs[currentPartie.joueur2]
    delete parties[currentPartie.idPartie]
  })

});


//envoyer un message à un client particulier
global.envoiClient = function envoiClient(client, titre, message){
  io.to(client).emit(titre, message);
}

httpServer.listen(25565);



