function init() {
    socket = io("http://totifle.ch:25565/moulin")
    socket.on('connecte', () => {
        console.log("connecté !")
        })

}

function creerLigne() {
    console.log("Ca fonctionne !")
    socket.emit('connected')
}

document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)