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
    let elem = document.getElementById(pion)
    let but = document.getElementById(place)
    let posPion = elem.getBoundingClientRect()
    let coords = but.coords.split(",")
    let xBut = Number(coords[0])
    let yBut = Number(coords[1])
    let posPlateau = (document.getElementById("grille")).getBoundingClientRect()
    let xPlateau = posPlateau.x
    let yPlateau = posPlateau.y
    let pos = 0


    console.log(yPlateau + yBut - posPion.y)
    console.log(xPlateau + xBut - posPion.x)

    clearInterval(id)
    id = setInterval(frame, 10)

    function frame() {
        if (pos == 20) {
            clearInterval(id);
        } else {
            pos++
            elem.style.top = (Math.abs(yPlateau + yBut - posPion.y)/20) * pos + 'px';
            elem.style.left = (Math.abs(xPlateau + xBut - posPion.x)/20) * pos + 'px';
        }
    }}

    
function miseEnPlace() {
    
    }