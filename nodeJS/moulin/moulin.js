
function connect(io){
    io.of("moulin").on('connection', (socket) => {
        socket.on('connected', () => {
            socket.emit("message", "connect")
        })
    })
}
module.exports = {connect}


