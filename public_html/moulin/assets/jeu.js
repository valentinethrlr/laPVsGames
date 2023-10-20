let tour = 0
let id = null
let plateau = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

function joue(n) {
    console.log(n)
}

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
    console.log(xBut + xPlateau)
    console.log(yBut + yPlateau)
    pionBouge.style.transform = `translate(${xBut + xPlateau - xPion - 15}px, ${yBut + yPlateau - yPion - 8}px)`

}

    
function miseEnPlace() {
    
    }