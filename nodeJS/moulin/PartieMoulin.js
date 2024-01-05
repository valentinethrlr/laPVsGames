module.exports = class PartieMoulin {

    //liste les cases atteignables à partir d'une certaine case
    static zone0 = [1, 9]
    static zone1 = [0, 2, 4]
    static zone2 = [1, 14]
    static zone3 = [4, 10]
    static zone4 = [1, 3, 5, 7]
    static zone5 = [4, 13]
    static zone6 = [7, 11]
    static zone7 = [4, 6, 8]
    static zone8 = [7, 12]
    static zone9 = [0, 10, 21]
    static zone10 = [3, 9, 11, 18]
    static zone11 = [6, 10, 15]
    static zone12 = [8, 13, 17]
    static zone13 = [5, 12, 14, 20]
    static zone14 = [2, 13, 23]
    static zone15 = [11, 16]
    static zone16 = [15, 17, 19]
    static zone17 = [12, 16]
    static zone18 = [10, 19]
    static zone19 = [16, 18, 20, 22]
    static zone20 = [13, 19]
    static zone21 = [9, 22]
    static zone22 = [19, 21, 23]
    static zone23 = [14, 22]

    //liste les cases qui doivent être occupées pour avoir un moulin
    static moulins = [[0,1,2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23], [0, 9, 21], [3, 10, 18], [6, 11, 15], [1, 4, 7], [16, 19, 22], [8, 12, 17], [5, 13, 20], [2, 14, 23]]



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

    



}