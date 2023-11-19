const httpServer = require("http").createServer();
var moulinController = new (require("./moulin/moulin.js"))
var morpionController = new (require("./morpion/morpion.js"))

//initialiser le serveur
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://vgames.totifle.ch",
      methods: ["GET", "POST"]
    }
  });

const moulinWorkspace = io.of("moulin")
const morpionWorkspace = io.of("morpion")
  
moulinWorkspace.on("connect", (socket) => {
  console.log("MOOOOULIN")
  moulinController.connect(socket)
})

morpionWorkspace.on("connect", (socket) => {
  console.log("MOOOOORPION")
  morpionController.connect(socket)
})
httpServer.listen(25565)

//envoyer un message à un client particulier
global.envoiMorpion = function envoiMorpion(client, titre, message){
  morpionWorkspace.to(client).emit(titre, message);
}

//envoyer un message à un client particulier
global.envoiMoulin = function envoiMoulin(client, titre, message){
  moulinWorkspace.to(client).emit(titre, message);
}

