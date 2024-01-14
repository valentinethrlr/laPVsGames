let votreId = null

function init() {
    socket = io("http://totifle.ch:25565/moulin")
    socket.on("info", (message) => {
        let separeMessage = message.split(":")
        if (separeMessage[0] == "id") {
            document.getElementById("optionsCreer").style.display = "none"
            document.getElementById("votreId").innerText += separeMessage[1]
            votreId = separeMessage[1]
            document.getElementById("creationId").style.display = "block"
        } else if (separeMessage[0] == "fausseId") {
            document.getElementById("idFausse").innerText = "Cette partie n'existe pas."
        } else if (separeMessage[0] == "commencer1") {
            document.getElementById("creationId").style.display = "none"
            document.getElementById("jeuTotal").style.display = "block"
            enLigne = true
        } else if (separeMessage[0] == "commencer2") {
            document.getElementById("login").style.display = "none"
            document.getElementById("jeuTotal").style.display = "block"  
            enLigne = true
        } else if (separeMessage[0] == "temps") {
            if (!(separeMessage[1] == "pasTimer")) {
                document.getElementById("tempsb").innerText = `${separeMessage[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                document.getElementById("tempsn").innerText = `${separeMessage[1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                document.getElementById("tempsb").style.display = "block"
                document.getElementById("tempsn").style.display = "block"
            }
        } else if (separeMessage[0] == "couleur") {
            if (separeMessage[1] == "b") {
                document.getElementById("indication").innerText = "C'est à vous de jouer !"
            } else {
                document.getElementById("indication").innerText = "C'est à l'adversaire de commencer !"
            }
        } else if (separeMessage[0] == "mouvement") {
            mouvement(separeMessage[1], separeMessage[2])
            if (separeMessage[3] == "jouer") {
                document.getElementById("indication").innerText = "C'est à vous de jouer !"
            } else {
                document.getElementById("indication").innerText = "C'est à l'adversaire de jouer !"
            }
        } else if (separeMessage[0] == "fin") {
            finEnLigne(separeMessage[1])
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
    votreId = document.getElementById("noPartie").value
}

function selectionneLigne() {
    if (! enLigne) {
    } else {

    }

}

function joueLigne(caseOnline) {
    if (enLigne == false) {
    } else {
        console.log(votreId)
        socket.emit("setup", `case:${caseOnline}:${votreId}`)
    }

}

function finEnLigne(gagnant) {
    document.getElementById("grille").style.display = "none"
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`pb${i}`).style.display = "none"
        document.getElementById(`pn${i}`).style.display = "none"
    }
    
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`pnElimine${i}`).style.display = "none"
        document.getElementById(`pbElimine${i}`).style.display = "none"
    }

    document.getElementById("tempsb").style.display = "none"
    document.getElementById("tempsn").style.display = "none"
    document.getElementById("indication").style.marginTop= "200px"
    document.getElementById("indication").style.fontSize = "50px"

    if (gagnant == "n") {
        document.getElementById("indication").innerText = "Victoire des noirs !"

    } else if (gagnant == "b") {
        document.getElementById("indication").innerText = "Victoire des blancs !"
        
    } else {
        document.getElementById("indication").innerText = "La partie est nulle ! :("
    }
}


document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)
