let votreId = null
let chornometreLigne

function init() {
    socket = io("http://totifle.ch:25565/moulin")
    socket.on("info", (message) => {
        switch (message["but"]) {
            case "id":
                document.getElementById("optionsCreer").style.display = "none"
                document.getElementById("votreId").innerText += message["id"]
                votreId = message["id"]
                document.getElementById("creationId").style.display = "block"
                break
            
            case "fausseId":
                document.getElementById("idFausse").innerText = "Cette partie n'existe pas."
                break

            case "commencer1":
                document.getElementById("creationId").style.display = "none"
                document.getElementById("jeuTotal").style.display = "block"
                enLigne = true
                break

            case "commencer2":
                document.getElementById("login").style.display = "none"
                document.getElementById("jeuTotal").style.display = "block"  
                enLigne = true
                break

            case "temps":
                if (!(message["temps"] == "pasTimer")) {
                    document.getElementById("tempsb").innerText = `${message["temps"].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                    document.getElementById("tempsn").innerText = `${message["temps"].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:00`
                    document.getElementById("tempsb").style.display = "block"
                    document.getElementById("tempsn").style.display = "block"
                } 
                break
                
            case "couleur":     
                if (message["couleur"] == "b") {
                    document.getElementById("indication").innerText = "C'est à vous de jouer !"
                } else {
                    document.getElementById("indication").innerText = "C'est à l'adversaire de commencer !"
                }
                break

            case "mouvement":
                mouvementLigne(message["pion"], message["case"])
                if (message["sonTour"] == "oui") {
                    document.getElementById("indication").innerText = "C'est à vous de jouer !"
                } else {
                    document.getElementById("indication").innerText = "C'est à l'adversaire de jouer !"
                }
                break

            case "chrono":
                clearInterval(chornometreLigne)
                timerLigne(message["temps"], message["couleurJoueur"])
                break

            case "fin":
                finEnLigne(message["gagnant"])
                break

            case "supprimeAnimation":
                supprimeAnimationLigne()
                break

            case "animation":
                document.getElementById(message["pion"]).classList.add("animationSelection")
                break

            case "moulin":
                document.getElementById("indication").innerText = "MOULIN !"
                break

            case "elimine":
                console.log("la condition")
                elimineLigne(message["pion"], message["couleur"], message["sonTour"])
                break

            case "deconnecte":
                document.getElementById("login").style.display = "none"
                document.getElementById("jeuTotal").style.display = "none"
                document.getElementById("indication").innerText = "Votre adversaire s'est déconnecté"
                document.getElementById("indication").style.display = "block"
                break
        }
    })
}

function creerLigne() {
    if (!(dureeJoueur == null) && !(couleurJoueur == null)) {
        socket.emit("setup", {"but": "creationId", "duree": dureeJoueur, "couleur": couleurJoueur})
    } else {
        document.getElementById("incompletude").style.display = "block"
    }
}

function rejoindre() {
    socket.emit("setup", {"but": "idConnexion", "id": document.getElementById("noPartie").value})
    votreId = document.getElementById("noPartie").value
}

function selectionneLigne(pion) {
    if (! enLigne) {
    } else {
        socket.emit("setup", {"but": "pion", "pion": pion, "id": votreId})
    }
}

function joueLigne(caseOnline) {
    if (enLigne == false) {
    } else {
        socket.emit("setup", {"but": "case", "case": caseOnline, "id": votreId})
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

function supprimeAnimationLigne() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("pb" + i).classList.remove("animationSelection")
        document.getElementById("pn" + i).classList.remove("animationSelection")}
}

function mouvementLigne(pion, place) {
    let pionBouge = document.getElementById(pion)
    pionBouge.style.position ="absolute";
    let but = document.getElementById(place)
    let posBut = but.coords.split(",")
    let xBut = Number(posBut[0])
    let yBut = Number(posBut[1])
    let plateau = document.getElementById("grille")
    let xPlateau = plateau.offsetLeft
    let yPlateau = plateau.offsetTop
    pionBouge.style.top = (yPlateau + yBut - 29) + "px"
    pionBouge.style.left = (xPlateau + xBut) + "px"
    supprimeAnimationLigne()
}

function elimineLigne(pion, nPion, doitJouer) {
    document.getElementById(pion).style.display = "none"
    document.getElementById(`p${pion[1]}Elimine${Number(nPion) + 1}`).style.visibility = "visible"
    console.log("ceci s'exécute")
    console.log(doitJouer)
    console.log (doitJouer == "oui")
    if (doitJouer == "oui") {
        document.getElementById("indication").innerText = "C'est à vous de jouer !"
    } else {
        document.getElementById("indication").innerText = "C'est à l'adversaire de jouer !"
    }  
}

function timerLigne(temps, joueur) {

    chornometreLigne = setInterval(
        function() {

            temps--
            let minutes = Math.floor(temps / 60)
            minutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            let secondes = Math.floor(temps - minutes * 60)
            secondes = secondes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            document.getElementById(`temps${joueur}`).innerText = `${minutes}:${secondes}`
            
        }, 1000)
}

document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)
