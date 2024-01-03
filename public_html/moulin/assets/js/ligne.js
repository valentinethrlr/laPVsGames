

function init() {
    socket = io("http://totifle.ch:25565/moulin")
    socket.on('info', (message) => {
        let separeMessage = message.split(":")
        if (separeMessage[0] == "id") {
            document.getElementById("optionsCreer").style.display = "none"
            document.getElementById("votreId").innerText += separeMessage[1]
            document.getElementById("creationId").style.display = "block"

        }
        if (separeMessage[0] == "commencer") {
               
        }
    })

}

function creerLigne() {
    socket.emit("setup", "creationId:")
    socket.emit("setup", "duree:${dureeJoueur}")
    socket.emit("setup", "couleur:${couleurJoueur}")
}

function rejoindre() {
    socket.emit("connexion", "idConnexion:" + document.getElementById("noPartie").value)
}

document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)
