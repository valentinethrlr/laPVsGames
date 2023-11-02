let turn = 0;
let gameBoard = ["","","","","","","","",""];
const victory = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


function buttonClicked(x){
    if (gameBoard[x] != "") {
       return    
    }
    if (turn % 2 == 1) {
        let btn = document.getElementsByClassName("case-btn")[x];
        btn.textContent= "O"
        gameBoard[x] = "O"
    } else {
        let btn = document.getElementsByClassName("case-btn")[x];
        btn.textContent = "X" 
        gameBoard[x] = "X" 
    }
    turn ++

    for (let i = 0; i < victory.length; i++) {
        let previous = gameBoard[victory[i][0]]
        if (previous == "") {
            continue
        }
        if (gameBoard[victory[i][1]] == previous && gameBoard[victory[i][2]] == previous) {
            end(previous)
            return 
        }
    }

    if (turn === 9) {
        end("")
    }
}

function end(winner) {
    document.getElementById("table").style.display = "none";
    if (winner === "") {
        document.getElementById("titre").style.display = "none";
        document.getElementById("victoire").textContent = "Egalité parfaite ! ARGH !"
        document.getElementById("victoire").innerHTML += "<br><button id='rejouer-btn' onclick=\"location.href = 'http://vgames.totifle.ch/morpion/local/'\">REJOUER</button>"
    } else {
        document.getElementById("titre").style.display = "none";
        document.getElementById("victoire").textContent = `Le joueur.euse ${winner} a gagné ! YEAHY !`
        document.getElementById("victoire").innerHTML += "<br><button id='rejouer-btn' onclick=\"location.href = 'http://vgames.totifle.ch/morpion/local/'\">REJOUER</button>"
    }
    
}