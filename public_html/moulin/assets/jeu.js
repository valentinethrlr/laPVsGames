let tour = 1
let id = null
let plateau = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

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
    let posPion = pionBouge.getBoundingClientRect()
    let xPion = posPion.x
    let yPion = posPion.y
    let but = document.getElementById(place)
    let coords = but.coords.split(",")
    let xBut = Number(coords[0])
    let yBut = Number(coords[1])
    let posPlateau = (document.getElementById("grille")).getBoundingClientRect()
    let xPlateau = posPlateau.x
    let yPlateau = posPlateau.y
    pionBouge.style.transform = `translate(${xBut + xPlateau - xPion}px, ${yBut + yPlateau - yPion}px)`
}


function joue(caseId) {
    if (tour <= 18) {
        console.log(tour)
        console.log(caseId)
        if (tour % 2 == 1) {
            console.log(`pb${(tour+1)/2}`, `case${caseId}`)
            mouvement(`pb${(tour+1)/2}`, `case${caseId}`)
            console.log('blanc')
            tour ++
        } else {
            console.log(`pn${tour/2}`, `case${caseId}`)
            mouvement(`pn${tour/2}`, `case${caseId}`)
            console.log('noir')
            tour ++
        }
    }
}

function selectionne(pionId) {
    if (tour > 18) {
        document.getElementById(pionId).style['animation-name'] = "selectionner"
        document.getElementById(pionId).style['animation-duration'] = "0.75s"
        document.getElementById(pionId).style['animation-iteration-count'] = "2"
    }

}