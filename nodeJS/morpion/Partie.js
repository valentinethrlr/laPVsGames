//créer une classe exportable
//constructor pour créer une instance
//this = variable locale de la classe
module.exports = class Partie {

    constructor(joueur, number) {
        this.joueur1=joueur
        this.joueur2=null
        this.idPartie=number
        this.etat=["","","","","","","","",""]
        this.victory=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        this.scoreX=0
        this.scoreO=0
        this.turn=0
        this.oPrems=0;
    }
    //quand la partie commence
    partieCommence(){
        this.envoiJoueurs("partie", "plateau:" + JSON.stringify(this.etat))
        this.envoiJoueurs("info", "statut:commence")
        
        envoiClient(this.joueur1, "partie", "tour:" + (1-this.oPrems))
        envoiClient(this.joueur2, "partie", "tour:" + (this.oPrems))
    }

    envoiJoueurs(titre, message) {
        envoiClient(this.joueur1, titre, message)
        
        envoiClient(this.joueur2, titre, message)
    }

    coupJoue(n, joueur) {
        if (this.etat[n] != "") {
            return
        }

        if (joueur == this.joueur1 && this.turn%2 == this.oPrems) {
            this.etat[n] = "X"
            envoiClient(this.joueur1, "partie", "tour:0")
            envoiClient(this.joueur2, "partie", "tour:1")
            this.turn ++;
            this.controleVictoire()
        } else if (joueur == this.joueur2 && this.turn%2 == 1-this.oPrems){
            this.etat[n] = "O"
            envoiClient(this.joueur1, "partie", "tour:1")
            envoiClient(this.joueur2, "partie", "tour:0")
            this.turn ++
            this.controleVictoire()
        }
        this.envoiJoueurs("partie", "plateau:" + JSON.stringify(this.etat))
    
    }

    controleVictoire() {
        for (let i = 0; i < this.victory.length; i++) {
            let previous = this.etat[this.victory[i][0]]
            if (previous == "") {
                continue
            }
            if (this.etat[this.victory[i][1]] == previous && this.etat[this.victory[i][2]] == previous) {
                this.envoiJoueurs("partie", "gagnant:" + previous)
                
                if (previous == "X") {
                    this.scoreX ++
                } else {
                    this.scoreO ++
                }

                this.envoiJoueurs("partie", "score:" + this.scoreX + "*" + this.scoreO)

                return 
            }
        }

        if (this.turn == 9) {
            this.envoiJoueurs("partie", "gagnant:egalite")
        }
    }

    partieRecommence() {
        this.etat=["","","","","","","","",""]
        this.turn=0
        this.oPrems = 1-this.oPrems;
        
        this.partieCommence()
    }

};