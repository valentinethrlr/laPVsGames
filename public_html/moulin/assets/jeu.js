let tour = 0
let id = null

function joue(n) {
    console.log(n)
}

function creer() {
    document.getElementById("optionsJouer").style.display = "none"
    document.getElementById("optionsCreer").style.display = "block" 
}

function creerAppareil() {
    document.getElementById("optionsCreer").style.display = "none"
    document.getElementById("plateau").style.display = "block"
    document.getElementById("pionsBlancs").style.display = "block"
    document.getElementById("pionsNoirs").style.display = "block"
    document.getElementById("bouge").style.display = "block"
}

function mouvement(pion, place) {
    let elem = document.getElementById(pion)
    let but = document.getElementById(place)
    let posPion = elem.getBoundingClientRect()
    let posCase = but.getBoundingClientRect()
    let pos = 0

    console.log(posCase)
    console.log(document.getElementById("case3").getBoundingClientRect())
    console.log(document.getElementById("case3").coords)
    console.log(document.getElementById("case4").coords)


    clearInterval(id)
    id = setInterval(frame, 10)

    function frame() {
        if (pos == 20) {
            clearInterval(id);
        } else {
            pos++
            elem.style.top = (Math.abs(posCase.y - posPion.y)/20) * pos + 'px';
            elem.style.left = (Math.abs(posCase.x - posPion.x)/20) * pos + 'px';
        }
    }}
