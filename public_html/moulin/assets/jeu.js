let tour = 1
let id = null
let plateau = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
let current_pion = null


function creer() {
    document.getElementById("optionsJouer").style.display = "none"
    document.getElementById("optionsCreer").style.display = "block" 
}

function creerAppareil() {
    document.getElementById("optionsCreer").style.display = "none"
    document.getElementById("grille").style.display = "block"
    document.getElementById("pionsBlancs").style.display = "block"
    document.getElementById("pionsNoirs").style.display = "block"
    document.getElementById("bouge").style.display = "block"
}

function mouvement(pion, place) {
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
}


function joue(caseNumber) {
    if (tour <= 18) {
        if (tour % 2 == 1) {
            mouvement(`pb${(tour+1)/2}`, `case${caseNumber}`)
            tour ++
        } else {
            mouvement(`pn${tour/2}`, `case${caseNumber}`)
            tour ++
        }
    } else if (tour > 18) {

        //impossible de déplacer un pion adverse
        if (tour % 2 == 1 && current_pion.startsWith('pn')) {
            return

        } else if (tour % 2 == 0 && current_pion.startsWith('pb')) {
            return
        }

        mouvement(current_pion, `case${caseNumber}`)
        document.getElementById(current_pion).classList.remove("animationSelection")
        current_pion = null
        tour ++
    }
}


function selectionne(pionId) {
    for (let i = 1; i < 10; i++) {
        document.getElementById("pb" + i).classList.remove("animationSelection")
        document.getElementById("pn" + i).classList.remove("animationSelection")}

    if (tour > 18) {
        //impossible de sélectionner un pion adverse
        if (tour % 2 == 1 && pionId.startsWith('pb')) {
            document.getElementById(pionId).classList.add("animationSelection")
            current_pion = pionId
        
        } else if (tour % 2 == 0 && pionId.startsWith('pn')) {
            document.getElementById(pionId).classList.add("animationSelection")
            current_pion = pionId
        }    
    }
}
