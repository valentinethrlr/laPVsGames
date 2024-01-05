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