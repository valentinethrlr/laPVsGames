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

function joue(arg) {
    
}