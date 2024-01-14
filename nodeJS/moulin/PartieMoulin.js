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
        this.tour = 1
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
        this.tour ++
        if (this.tour % 2 == 1 && this.couleur1 == "b") {
            this.actuel_joueur = 1
            this.autre_joueur = 2
            if (!(this.duree == 0)) {
                timer(this.tempsb)    
            }
    
        } else if (this.tour % 2 == 0 && this.couleur1 == "b") {
            this.actuel_joueur = 2
            this.autre_joueur = 1
            if (!(this.duree == 0)) {
                timer(this.tempsn)
            }
        } else if (this.tour % 2 == 1 && this.couleur1 == "n") {
            this.actuel_joueur = 2
            this.autre_joueur = 1
            if (!(this.duree == 0)) {
                timer(this.tempsn)
            }
        } else {
            this.actuel_joueur = 1
            this.autre_joueur = 2
            if (!(this.duree == 0)) {
                timer(this.tempsb)    
            }
        }    
    }


    joue(caseNumber) {
            //mise en place du jeu
            if (this.tour < 18 && this.typeMoulin == null) {
                if (eval(`couleur${this.actuel_joueur}`) == 'b') {
                    envoiMoulin(eval(`joueur${this.actuel_joueur}`), "info", `mouvement:pb${(this.tour+1)/2}:case${caseNumber}:pasjouer`)
                    envoiMoulin(eval(`joueur${this.autre_joueur}`), "info", `mouvement:pb${(this.tour+1)/2}:case${caseNumber}:jouer`)
                    this.plateau[caseNumber] = `pb${(this.tour+1)/2}`
                    this.incrementeTour = true
                } else {
                    envoiMoulin(eval(`joueur${this.actuel_joueur}`), "info", `mouvement:pn${tour/2}:case${caseNumber}:pasjouer`)
                    envoiMoulin(eval(`joueur${this.autre_joueur}`), "info", `mouvement:pn${tour/2}:case${caseNumber}:jouer`)
                    this.plateau[caseNumber] = `pn${tour/2}`
                    this.incrementeTour = true
                }
        
            //dernier placement de pion
            } else if (tour == 18 && typeMoulin == null) {
                mouvement("pn9", `case${caseNumber}`)
                plateau[caseNumber] = "pn9"
                incrementeTour = true
                
        
                controleMouvementPossible()
        
            //déplacement des pions (avec 3 pions)    
            } else if (nbBElimine == 6 && current_joueur == 'b') {
                deplacement(caseNumber)
                incrementeTour = true
                
            
            } else if (nbNElimine == 6 && current_joueur == 'n') {
                deplacement(caseNumber)
                incrementeTour = true
                
            
            //50 mouvements sans prise
            } else if (mouvementSansPrise == 50) {
                finDePartie("nul")
        
            //déplacement dans les autres cas 
            } else {
                
                if (eval(`zone${plateau.indexOf(current_pion)}`).includes(caseNumber)) {
                    deplacement(caseNumber)
                    incrementeTour = true
                    mouvementSansPrise ++
        
                    controleMouvementPossible()
                }    
            }
        
            //contrôle de moulin
            if (tour > 4) {
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
                        if (moulinsPlateau[i] == null) {
                            document.getElementById("indication").innerText = "MOULIN !"
                            typeMoulin = pion1[1]
                            moulinsPlateau[i] = pion1[1]
                            mouvementSansPrise = 0
                            
                            //crée la liste des pions intouchables et ceux qu'il est possible d'éliminer
                            let pionsIntouchables = listeIntouchable()
                            pionsPossibles = listePossible(pionsIntouchables)
        
                            //si tous les pions adverses sont dans un moulin, tous peuvent être éliminés
                            if (pionsPossibles.length == 0) {
                                pionsPossibles = listePossible([])
                                supprimeDansMoulin = true
                            }
        
                            //anime les pions qu'il est possible d'éliminer
                            for (let i = 0; i < pionsPossibles.length; i++) {
                                document.getElementById(pionsPossibles[i]).classList.add("animationSelection")
                            }        
                        
                        //si le moulin existait déjà, il est à nouveau mis dans la liste moulinsPlateau
                        } else {
                            moulinsPlateau[i] = pion1[1]
                        }
                    
                    //s'il n'y a pas de moulins à cet emplacement, la position dans mise à null dans moulinsPlateau        
                    } else {
                        moulinsPlateau[i] = null
                    }
                }
        
            }
        
            if (typeMoulin == null && incrementeTour == true) {
                tourJoue()
            }
        
            incrementeTour = false
    }
}