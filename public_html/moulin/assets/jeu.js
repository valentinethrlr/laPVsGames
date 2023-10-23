let tour = 1
let id = null
let plateau = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
let current_pion = null
let zone0 = [1, 9]
let zone1 = [0, 2, 4]
let zone2 = [1, 14]
let zone3 = [4, 10]
let zone4 = [1, 3, 5, 7]
let zone5 = [4, 13]
let zone6 = [7, 12]
let zone7 = [4, 6, 8]
let zone8 = [7, 12]
let zone9 = [0, 21]
let zone10 = [3, 9, 11, 18]
let zone11 = [6, 10]
let zone12 = [8, 13, 17]
let zone13 = [5, 12, 14, 20]
let zone14 = [2, 13, 23]
let zone15 = [11, 16]
let zone16 = [15, 17, 19]
let zone17 = [12, 16]
let zone18 = [10, 19]
let zone19 = [16, 18, 20, 22]
let zone20 = [13, 19]
let zone21 = [9, 22]
let zone22 = [19, 21, 23]
let zone23 = [14, 22]

let moulins = [[0,1,2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23], [0, 9, 21], [3, 10, 18], [6, 11, 15], [1, 4, 7], [16, 19, 22], [8, 12, 17], [5, 13, 20], [2, 14, 23]]
let moulinsPlateau = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function creer() {
    document.getElementById("optionsJouer").style.display = "none"
    document.getElementById("optionsCreer").style.display = "block" 
}

function creerAppareil() {
    document.getElementById("optionsCreer").style.display = "none"
    document.getElementById("grille").style.display = "block"
    document.getElementById("pionsBlancs").style.display = "block"
    document.getElementById("pionsNoirs").style.display = "block"
    document.getElementById("indication").style.display = "block"
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

    //mise en place du jeu
    if (tour <= 18) {
        if (tour % 2 == 1) {
            mouvement(`pb${(tour+1)/2}`, `case${caseNumber}`)
            plateau[caseNumber] = `pb${(tour+1)/2}`
            tour ++
            document.getElementById("indication").innerText = "BONJOUR !"
        } else {
            mouvement(`pn${tour/2}`, `case${caseNumber}`)
            plateau[caseNumber] = `pn${tour/2}`
            tour ++
            document.getElementById("indication").innerText = "BONJOUR !"
        }

    //déplacement des pions    
    } else if (tour > 18) {

        //impossible de déplacer un pion adverse
        if (tour % 2 == 1 && current_pion.startsWith('pn')) {
            return

        } else if (tour % 2 == 0 && current_pion.startsWith('pb')) {
            return
        
        //contrôle que le mouvement est autorisé
        } else if (!(eval(`zone${plateau.indexOf(current_pion)}`).includes(caseNumber))) {
            return
        }

        mouvement(current_pion, `case${caseNumber}`)
        document.getElementById("indication").innerText = "BONJOUR !"
        document.getElementById(current_pion).classList.remove("animationSelection")
        //déplace le pion dans la liste plateau
        plateau[plateau.indexOf(current_pion)] = null
        plateau[caseNumber] = current_pion
        current_pion = null
        tour ++
    }

    //contrôle de moulin
    if (tour > 5) {
        let possibilite = null
        let pion1 = null
        let pion2 = null
        let pion3 = null
        for (let i=0; i<moulins.length; i++) {
            possibilite = moulins[i]
            pion1 = plateau[possibilite[0]]
            pion2 = plateau[possibilite[1]]
            pion3 = plateau[possibilite[2]]

            //contrôle que le pion soit de type b ou n (deuxième caractère de la chaîne de caractère)

            if (!(pion1== null) && !(pion2 == null) && !(pion3 == null) 
                && pion1[1] == pion2[1] && pion2[1] == pion3[1]) {
                
                //contrôle que le moulin vient d'être formé
                if (moulinsPlateau[i] == 0) {
                    document.getElementById("indication").innerText = "MOULIN !"
                    moulinsPlateau[i] = 1
                } else {
                    moulinsPlateau[i] = 1
                }    
            } else {
                moulinsPlateau[i] = 0
            }
        }
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
