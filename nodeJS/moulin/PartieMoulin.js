const { Socket } = require("dgram")

module.exports = class PartieMoulin {

    constructor(id, joueur1, duree, couleur) {
        this.id = id
        this.joueur1 = joueur1
        this.joueur2 = null
        this.duree = duree
        this.tempsb = this.duree * 60
        this.tempsn = this.duree * 60
        this.couleur1 = null
        this.couleur2 = null
        this.couleur = couleur
        this.couleurJoueurs(this.couleur)
        this.tour = 0
        this.plateau = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        //se réfère à moulins, indique s'il y a un moulin sur la plateau à la liste des positions se trouvant au même indexe dans moulins
        this.moulinsPlateau = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
        this.typeMoulin = null
        //indique le nombre de pions blancs et noirs qui ont déjà été éliminés
        this.nbBElimine = 0
        this.nbNElimine = 0
        this.pionsPossibles
        this.supprimeDansMoulin = false
        this.mouvementSansPrise = 0
        this.gardeChrono = false
        this.incrementeTour = false
        this.current_pion = null
        if (this.couleur1 == "b") {
            this.actuel_joueur = 1
            this.autre_joueur = 2
        } else {
            this.actuel_joueur = 2
            this.autre_joueur = 1
        }
        
        //liste les cases atteignables à partir d'une certaine case
        this.zone0 = [1, 9]
        this.zone1 = [0, 2, 4]
        this.zone2 = [1, 14]
        this.zone3 = [4, 10]
        this.zone4 = [1, 3, 5, 7]
        this.zone5 = [4, 13]
        this.zone6 = [7, 11]
        this.zone7 = [4, 6, 8]
        this.zone8 = [7, 12]
        this.zone9 = [0, 10, 21]
        this.zone10 = [3, 9, 11, 18]
        this.zone11 = [6, 10, 15]
        this.zone12 = [8, 13, 17]
        this.zone13 = [5, 12, 14, 20]
        this.zone14 = [2, 13, 23]
        this.zone15 = [11, 16]
        this.zone16 = [15, 17, 19]
        this.zone17 = [12, 16]
        this.zone18 = [10, 19]
        this.zone19 = [16, 18, 20, 22]
        this.zone20 = [13, 19]
        this.zone21 = [9, 22]
        this.zone22 = [19, 21, 23]
        this.zone23 = [14, 22]

        //liste les cases qui doivent être occupées pour avoir un moulin
        this.moulins = [[0,1,2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23], [0, 9, 21], [3, 10, 18], [6, 11, 15], [1, 4, 7], [16, 19, 22], [8, 12, 17], [5, 13, 20], [2, 14, 23]]
    }

    couleurJoueurs(couleur) {
        if (couleur == "a") {
            let aleatoire = Math.round(Math.random())
            if (aleatoire == 1) {
                this.couleur1 = "b"
                this.couleur2 = "n" 
            } else {
                this.couleur1 = "n"
                this.couleur2 = "b" 
            }
        } else if (couleur == "b") {
            this.couleur1 = "b"
            this.couleur2 = "n"
        } else {
            this.couleur1 = "n"
            this.couleur2 = "b"
        }
    }

    tourJoue() {
        this.incrementeTour = false
        this.tour ++
        if (this.tour % 2 == 1 && this.couleur1 == "b") {
            this.actuel_joueur = 1
            this.autre_joueur = 2
        
        } else if (this.tour % 2 == 0 && this.couleur1 == "b") {
            this.actuel_joueur = 2
            this.autre_joueur = 1
            
        } else if (this.tour % 2 == 1 && this.couleur1 == "n") {
            this.actuel_joueur = 2
            this.autre_joueur = 1
            
        } else {
            this.actuel_joueur = 1
            this.autre_joueur = 2
           
        }    
    }


    joue(caseNumber, utilisateur) {

            if (this.tour == 0) {
                this.tourJoue()
            }

            //mise en place du jeu
            if (this.tour < 18 && this.typeMoulin == null) {
                if (eval(`this.couleur${this.actuel_joueur}`) == 'b' && utilisateur == eval(`this.joueur${this.actuel_joueur}`)) {
                    envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `mouvement:pb${(this.tour+1)/2}:case${caseNumber}:pasjouer`)
                    envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `mouvement:pb${(this.tour+1)/2}:case${caseNumber}:jouer`)
                    this.plateau[caseNumber] = `pb${(this.tour+1)/2}`
                    this.incrementeTour = true
                } else if (utilisateur == eval(`this.joueur${this.actuel_joueur}`)) {
                    envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `mouvement:pn${this.tour/2}:case${caseNumber}:pasjouer`)
                    envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `mouvement:pn${this.tour/2}:case${caseNumber}:jouer`)
                    this.plateau[caseNumber] = `pn${this.tour/2}`
                    this.incrementeTour = true
                }
        
            //dernier placement de pion
            } else if (this.tour == 18 && this.typeMoulin == null) {
                envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `mouvement:pn9:case${caseNumber}:pasjouer`)
                envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `mouvement:pn9:case${caseNumber}:jouer`)
                this.plateau[caseNumber] = "pn9"
                this.incrementeTour = true
                this.controleMouvementPossible()
        
            //déplacement des pions (avec 3 pions)    
            } else if (this.nbBElimine == 6 && this.current_joueur == 'b') {
                envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `mouvement:pn${this.tour/2}:case${caseNumber}:pasjouer`)
                envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `mouvement:pn${this.tour/2}:case${caseNumber}:jouer`)
                this.incrementeTour = true
                
            
            } else if (this.nbNElimine == 6 && this.current_joueur == 'n') {
                envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `mouvement:pn${this.tour/2}:case${caseNumber}:pasjouer`)
                envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `mouvement:pn${this.tour/2}:case${caseNumber}:jouer`)
                this.incrementeTour = true
                
            
            //50 mouvements sans prise
            } else if (this.mouvementSansPrise == 50) {
                this.finDePartie("nul")
        
            //déplacement dans les autres cas 
            } else {

                if (eval(`this.zone${this.plateau.indexOf(this.current_pion)}`).includes(Number(caseNumber))) {
                    envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `mouvement:${this.current_pion}:case${caseNumber}:pasjouer`)
                    envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `mouvement:${this.current_pion}:case${caseNumber}:jouer`)
                    this.incrementeTour = true
                    this.mouvementSansPrise ++
        
                }    
            }

            if (this.incrementeTour == true) {
                this.tourJoue()
            }

    }

    selectionne(pionId, utilisateur) {

        //déplacement des pions au cours du jeu
        if (this.tour > 18) {
    
            envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", "supprimeAnimation")
            envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", "supprimeAnimation")
    
            //impossible de sélectionner un pion adverse
            if (eval(`this.couleur${this.actuel_joueur}`) == 'b' && pionId.startsWith("pb") && utilisateur == eval(`this.joueur${this.actuel_joueur}`)) {
                envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `animation:${pionId}`)
                envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `animation:${pionId}`)
                this.current_pion = pionId
            
            } else if (eval(`this.couleur${this.actuel_joueur}`) == 'n' && pionId.startsWith("pn") && utilisateur == eval(`this.joueur${this.actuel_joueur}`)) {
                envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `animation:${pionId}`)
                envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `animation:${pionId}`)
                this.current_pion = pionId
            }   
            
            this.pionSelectionne = true
    
        }
    
        //fin de partie
        if (this.nbBElimine > 6 || this.nbNElimine > 6) {
            this.finDePartie(eval(`this.couleur${this.autre_joueur}`))
        }
    }    
        


    controleMouvementPossible() {
        //contrôle que le joueur suivant peut se déplacer
       let autorise = this.casesAutorises()
       if (autorise.length == 0) {
           this.finDePartie(eval(`this.couleur${this.autre_joueur}`))
       }
    }


    casesAutorises() {
    let cePion = null
    let positionPionPlateau = []
    let deplacementsAutorises = []

    for (let i = 1; i <= 9; i++) {
        cePion = `p${eval(`this.couleur${this.actuel_joueur}`)}${i}` 
        if (this.plateau.includes(cePion)) {
            positionPionPlateau.push(this.plateau.indexOf(cePion))
        }
    }

    for (let i = 0; i < positionPionPlateau.length; i++) {
        let current_zone = eval(`this.zone${positionPionPlateau[i]}`)
        for (let j = 0; j < current_zone.length; j++) {
            let current_case = current_zone[j]
            if (this.plateau[current_case] == null) {
                deplacementsAutorises.push(current_case)
            }
        }
    }

    return deplacementsAutorises
    }

    finDePartie(gagnant) {
        envoiMoulin(eval(`this.joueur${this.actuel_joueur}`), "info", `fin:${gagnant}`)
        envoiMoulin(eval(`this.joueur${this.autre_joueur}`), "info", `fin:${gagnant}`)
    }

}

