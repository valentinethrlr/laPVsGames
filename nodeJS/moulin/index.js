const httpServer = require("http").createServer();

//initialiser le serveur
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://vgames.totifle.ch",
      methods: ["GET", "POST"]
    },
    path:'/asdf'
  });

io.on('connection', (socket) => {
  console.log("asodufhgoasidhfoasihf")
    socket.on('connected', () => {
    socket.emit('connecte')
    })

    }
)

httpServer.listen(25565);