

function init() {
    socket = io("http://totifle.ch:25565/moulin")
    socket.on('info', (message) => {
        let separeMessage = message.split(":")
        if (separeMessage[0] == "id") {
            console.log(separeMessage[1])
        }
        if (separeMessage[0] == "commencer") {
            utils.creerAppareil()    
        }
        })
    socket.on("test", (message) => {
        console.log(message)
    })

}

function creerLigne() {
    socket.emit("setup", "creationId:")
    socket.emit("setup", `duree:${dureeJoueur}`)
    socket.emit("setup", `couleur:${couleurJoueur}`)
}


document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)
