
function init() {
    socket = io("http://totifle.ch:25565/moulin")
    socket.on("info", (message) => {
        let separeMessage = message.split(":")
        if (separeMessage[0] == "id") {
            document.getElementById("optionsCreer").style.display = "none"
            document.getElementById("votreId").innerText += separeMessage[1]
            document.getElementById("creationId").style.display = "block"
        } else if (separeMessage[0] == "fausseId") {
            document.getElementById("idFausse").innerText = "Cette partie n'existe pas."
        } else if (separeMessage[0] == "commencer1") {
            document.getElementById("creationId").style.display = "none"
            document.getElementById("jeuTotal").style.display = "block"
            if (!(separeMessage[1] == "pasTimer")) {
                document.getElementById("tempsb").innerText = `${separeMessage[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                document.getElementById("tempsn").innerText = `${separeMessage[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                document.getElementById("tempsb").style.display = "block"
                document.getElementById("tempsn").style.display = "block"
            }
        } else if (separeMessage[0] == "commencer2") {
            document.getElementById("login").style.display = "none"
            document.getElementById("jeuTotal").style.display = "block"
            if (!(separeMessage[1] == "pasTimer")) {
                document.getElementById("tempsb").innerText = `${separeMessage[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                document.getElementById("tempsn").innerText = `${separeMessage[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                document.getElementById("tempsb").style.display = "block"
                document.getElementById("tempsn").style.display = "block"
            }
        }
    })
}

function creerLigne() {
    if (!(dureeJoueur == null) && !(couleurJoueur == null)) {
        socket.emit("setup", `creationId:${dureeJoueur}:${couleurJoueur}`)
    } else {
        document.getElementById("incompletude").style.display = "block"
    }
}

function rejoindre() {
    socket.emit("setup", "idConnexion:" + document.getElementById("noPartie").value)
}

document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)
