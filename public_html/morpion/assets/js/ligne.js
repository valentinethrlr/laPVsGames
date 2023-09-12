let socket;
let id;
let infoPartie;

//initialiser le js + toutes les variables, même si déclarée au dessus (obligé pour être globale)
//socket = io(...) -> ouvrir la connection avec le nodeJS
//tous les socket.on vont dans le init()
function init() {
    socket = io("http://totifle.ch:25565")
    socket.on("info", (message) => {
        infoJeu(message);
    });
    socket.on("partie", (message) => {
        deroulement(message)
    });
}


function infoJeu(message) {
    let splitedMessage = message.split(":")
    if (splitedMessage[0] == "id") {
        document.getElementById("attente").style.display = "block"
        document.getElementById("votreId").innerText += " " + splitedMessage[1]
        document.getElementById("login").style.display = "none"
    } 
    else if (splitedMessage[0] == "erreur") {
        document.getElementById("idFausse").innerText = "Cette ID n'existe pas."
    } 
    else if (splitedMessage[1] == "commence") {
        document.getElementById("rejouer-btn").style.display = "none"
        document.getElementById("attente").style.display = "none"
        document.getElementById("login").style.display = "none"
        document.getElementById("partie").style.display = "block"
        document.getElementById("table").style.display = "table"

    } else if (splitedMessage[1] == "disconnect") {
        document.getElementById("partie").style.display = "none"
        document.getElementById("login").style.display = "block"
        document.getElementById("idFausse").innerText = "Votre adversaire s'est déconnecté. :,("
    
    }
}

function rejoindre() {
    socket.emit("conrequest", document.getElementById("noPartie").value)
}


function creer() {
    socket.emit("conrequest", "creer")
    document.getElementById("login").style.display = "none"
    document.getElementById("attente").style.display = "block"
}

function deroulement(message) {
    infoPartie = message.split(":")
    if (infoPartie[0] == "tour"){

        if (infoPartie[1] == 1) {
            document.getElementById("titre").textContent = "A vous de jouer !"

        } else {
            document.getElementById("titre").textContent = "Attendez votre adversaire"
        }
    } else if (infoPartie[0] == "plateau"){
        let parcedPlateau = JSON.parse(infoPartie[1])
        for (let i=0; i < 9; i++) {
            document.getElementsByClassName("case-btn")[i].innerText = parcedPlateau[i]
        }
    } else if (infoPartie[0] == "gagnant") {
        if (infoPartie[1]=="egalite"){
            finPartie("Egalité parfaite ! ARGH !")
        } else {
            finPartie(`Le joueur ${infoPartie[1]} a gagné ! YEAHY !`)
        }
    } else if (infoPartie[0] == "score") {
        let scores = infoPartie[1].split("*")
        document.getElementById("score").innerText = `X: ${scores[0]} vs O: ${scores[1]}`
    }


}

function finPartie(texte){
    document.getElementById("table").style.display = "none"
    document.getElementById("titre").textContent = texte;
    document.getElementById("rejouer-btn").style.display = "block"
}

function buttonClicked(n) {
    socket.emit("partie", "case:" + n)
}

function rejouer() {
    socket.emit("partie", "status:rejouer")
}


//attendre HTML se charge avant de lancer la fonction init()
document.addEventListener('DOMContentLoaded', function() {
    init()
 }, false)
