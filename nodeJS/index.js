const httpServer = require("http").createServer();
var moulinController = require("./moulin/moulin.js")

//initialiser le serveur
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://vgames.totifle.ch",
      methods: ["GET", "POST"]
    }
  });

io.of("moulin").on("connect", (socket) => {
  moulinController.connect(io)
})

httpServer.listen(25565)