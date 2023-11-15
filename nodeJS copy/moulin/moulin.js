io.of("moulin").on('connection', (socket) => {
    socket.on('connected', () => {
        console.log("connecté !")
    })

    }
)
module.exports;

