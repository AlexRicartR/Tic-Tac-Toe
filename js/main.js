let structure = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ticplayer = 1;
let numberOfPlayers = 0;
let choice = 0;
let corners = [0, 2, 6, 8];
let player1name;
let player2name;

let pieces = 6;
let readyPutPiece = false
let readyPutPieceComputer = false


// This function would clean the boardScreen if called.

function resetgame() {
    document.getElementById("chooseNumberPlayersScreen").removeAttribute("hidden", "hidden");
    document.getElementById("writePlayersNames").setAttribute("hidden", "hidden");
    document.getElementById("player1askname").setAttribute("hidden", "hidden");
    document.getElementById("player2askname").setAttribute("hidden", "hidden");
    document.getElementById("whoBeginsScreen").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").textContent = "Make your first move";
    ticplayer = 1;
    numberOfPlayers = 0;
    choice = 0;
    structure = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    drawxo();
    document.getElementById("boardScreen").setAttribute("hidden", "hidden");
}

function chooseNumberOfPlayers(num) {
    numberOfPlayers = num;
    showWritePlayersNames();
}

let a = document.getElementById("player2askname")
const secondinput = document.getElementById("player2askname");

function saveNames(name1, name2) {
    player1name = name1.value;

    if (name1.value.length > 0 && (secondinput.hidden || name2.value.length > 0)) {
        document.getElementById("writePlayersNames").setAttribute("hidden", "hidden");
        document.getElementById("player1askname").setAttribute("hidden", "hidden");
        if (numberOfPlayers === 1) {
            showWhoBeginsScreen();
        }
        if (numberOfPlayers === 2) {
            player2name = name2.value;
            showBoardScreen();
            whoStartsSelection(1);
        }

    } else {
        alert("Field cannot be blank");
    }

}

function whoStartsSelection(turn) {
    choice = turn;
    // human choice 1  and computer 2

    showBoardScreen();
    beginGame();
}

/*Here it checks which positions are occupied to perform the next movement by the machine. 
Injects the value you specify and "cellglobal" inserts the value by the machine. */

function beginGame() {
    console.log("entro")

    if (choice == 2) {
        if (ticplayer != choice) {
            if (final() == 9) {
                cellglobal(8);
            } else {
                if (!jugadaganadora(1)) {
                    if (!jugadaganadora(2)) {
                        if (esigual(structure, [0, 2, 0, 0, 0, 0, 0, 0, 1]) || esigual(structure, [0, 0, 0, 2, 0, 0, 0, 0, 1]) || esigual(structure, [0, 0, 0, 0, 0, 2, 0, 0, 1]))
                            cellglobal(6);
                        else if (esigual(structure, [0, 0, 0, 0, 0, 0, 0, 2, 1]))
                            cellglobal(2);
                        else if (esigual(structure, [2, 0, 0, 0, 0, 0, 0, 0, 1]) || esigual(structure, [0, 0, 2, 0, 0, 0, 0, 0, 1]))
                            cellglobal(6);
                        else if (esigual(structure, [0, 0, 0, 0, 0, 0, 2, 0, 1]))
                            cellglobal(2);
                        else if (structure[4] == 0) {
                            if (structure[8] == 1 && (structure[6] == 1 || structure[2] == 1))
                                cellglobal(4);
                        }
                        else if (esigual(structure, [0, 0, 0, 0, 2, 0, 0, 0, 1]))
                            cellglobal(0);
                        else if (esigual(structure, [1, 0, 2, 0, 2, 0, 0, 0, 1]))
                            cellglobal(6);
                        else if (esigual(structure, [1, 0, 0, 0, 2, 0, 2, 0, 1]))
                            cellglobal(2);
                        else {
                            cellglobal(structure.indexOf(0));
                        }
                    }
                }
            }
        }

        //// It performs the same operation as the above when the computer is not the player that makes the first move.

    } else if (ticplayer == 2) {
        if (!jugadaganadora(2)) {
            if (!jugadaganadora(1)) {
                if (structure[4] == 0)
                    cellglobal(4);
                else if (esigual(structure, [0, 0, 0, 0, 1, 0, 0, 0, 0]))
                    cellglobal(8);
                else if ((structure[0] == 1 || structure[2] == 1 || structure[6] == 1 || structure[8] == 1) && structure[1] == 0)
                    cellglobal(1);
                else if ((structure[0] == 1 || structure[2] == 1 || structure[6] == 1 || structure[8] == 1) && structure[3] == 0)
                    cellglobal(3);
                else if (esigual(structure, [0, 1, 0, 0, 2, 0, 0, 1, 0]) || esigual(structure, [0, 0, 0, 1, 2, 1, 0, 0, 0]))
                    cellglobal(2);
                else {
                    cellglobal(structure.indexOf(0));
                }
            }

        }
    }
}

/// The below "for" loop checks if the field is empty. The second and third "for" loop checks if there is space to fill blank field with an specified combination. 

function final() {
    let squares = 0;
    for (let i = 0; i < structure.length; i++) {
        if (structure[i] == 0) squares++;
    }
    for (let a = 0; a < 8; a += 3) {
        if (structure[a] == structure[a + 1] && structure[a + 1] == structure[a + 2] && structure[a] > 0) return structure[a];
    }
    for (let b = 0; b < 3; b++) {
        if (structure[b] == structure[b + 3] && structure[b + 3] == structure[b + 6] && structure[b] > 0) return structure[b];
    }
    if (structure[0] == structure[4] && structure[4] == structure[8] && structure[0] > 0) return structure[0];
    if (structure[2] == structure[4] && structure[4] == structure[6] && structure[2] > 0) return structure[2];
    if (squares == 9) return 9;
    if (squares == 0) return 0;
}

// The below function sets up when it should draw an X or either an O based on a "< 9" logic as set forth in the for conditional.

function drawxo() {
    pieces--;

    if (pieces >= 0) {
        for (let i = 0; i < 9; i++) {
            if (structure[i] == 0) {
                document.getElementById("gamecell" + i).textContent = "";
            } else if (structure[i] == 1) {
                // const delay = () => {
                document.getElementById("gamecell" + i).textContent = "X";
                document.getElementById("gamecell" + i).style.color = "yellow";
                // }            
                // setTimeout(delay, 1000) //// Check to implement delay 

            } else {
                document.getElementById("gamecell" + i).textContent = "O";
                document.getElementById("gamecell" + i).style.color = "red";
            }
        }
    }
}

//// The below function states if the cell is already filled and which player holds the turn. 

function manageTextContent(tcell) {

    if (numberOfPlayers === 1) {
        if (choice == ticplayer) {
            document.getElementById("msgplaceholder").textContent = "Computer turn";
        }
        else {
            document.getElementById("msgplaceholder").textContent = (player1name + ", you play");
        }
    }
    else {
        if (ticplayer == 1) {
            document.getElementById("msgplaceholder").textContent = (player2name + " , you play!");
        }
        else {
            document.getElementById("msgplaceholder").textContent = (player1name + " , you play!");
        }
    }
    if (structure[tcell] !== 0) {
        document.getElementById("msgplaceholder").textContent = "Hey buddy, you can't do that!";
    }
}

// function putpiececomputer(cell) {
//     for (i = 0; i < 9; i++) {
//         let piecedontdelete

//         if (document.getElementById("gamecell" + i).textContent == "") {
//             console.log("entre if computer")
//             document.getElementById("gamecell" + i).textContent = "O";
//             document.getElementById("gamecell" + i).style.color = "red";
//             piecedontdelete = i;
//             for (i = 0; i < 9; i++) {
//                 if (document.getElementById("gamecell" + i).textContent == "O" && i != piecedontdelete) {
//                     document.getElementById("gamecell" + i).textContent = "";
//                 }
//             }
//         }
//         // document.getElementById("gamecell" + tcell).textContent = "X";
//         // document.getElementById("gamecell" + tcell).style.color = "yellow";

//     }

// }

function cellglobal(tcell) {

    if (readyPutPiece == true) {
        document.getElementById("gamecell" + tcell).textContent = "X";
        document.getElementById("gamecell" + tcell).style.color = "yellow";
        readyPutPiece = false;

        putpiececomputer(tcell)
        // choice = 2;
        // beginGame()
    }

    else {
        //manageTextContent(tcell);

        if (structure[tcell] === 0) {
            if (ticplayer === 1) {
                structure[tcell] = 1;
                ticplayer = 2;
            }
            else {
                structure[tcell] = 2;
                ticplayer = 1;
            }
        }

        if (pieces < 0 && document.getElementById("gamecell" + tcell).textContent == "X") {
            document.getElementById("gamecell" + tcell).textContent = "";
            readyPutPiece = true
        }
        else {
            drawxo();
        }
        
        switch (final()) {
            case 0:
                document.getElementById("msgplaceholder").textContent = "Tie, try playing again!";
                question();
                break;
            case 1:
                // console.log(numberOfPlayers, choice);
                if (numberOfPlayers == 1) {
                    if (choice == 1) document.getElementById("msgplaceholder").textContent = "You win!!!";
                    else document.getElementById("msgplaceholder").textContent = "Game over";
                    document.getElementById("boardScreen").setAttribute("hidden", "hidden");
                } else document.getElementById("msgplaceholder").textContent = (player2name + " wins!");
                question();
                break;
            case 2:
                //console.log(numberOfPlayers, choice);
                if (numberOfPlayers == 1) {
                    if (choice == 2) document.getElementById("msgplaceholder").textContent = (player1name + ", you win!!!");
                    else {document.getElementById("msgplaceholder").textContent = "Game over";
                    document.getElementById("boardScreen").setAttribute("hidden", "hidden");
                }
                } else document.getElementById("msgplaceholder").textContent = (player2name + ", you win");
                question();
                break;
            default:
                if (numberOfPlayers == 1 && ticplayer != choice) { beginGame(); }
        }
    }
}

function jugadaganadora(num) {
    let finalizado = false;
    let trio = [0, 0, 0];

    for (let a = 0; a < 8; a += 3) {
        trio[0] = structure[a];
        trio[1] = structure[a + 1];
        trio[2] = structure[a + 2];
        let primera = trio.indexOf(num);
        let ultima = trio.lastIndexOf(num);
        let cero = trio.indexOf(0);
        if (primera != ultima && cero != -1) {
            cellglobal(a + cero);
            return true;
        }
    }
    for (let b = 0; b < 3; b++) {
        trio[0] = structure[b];
        trio[1] = structure[b + 3];
        trio[2] = structure[b + 6];
        let primeraa = trio.indexOf(num);
        let ultimaa = trio.lastIndexOf(num);
        let ceroa = trio.indexOf(0);
        if (primeraa != ultimaa && ceroa != -1) {

            cellglobal(b + ceroa * 3);
            return true;
        }
    }
    trio[0] = structure[0];
    trio[1] = structure[4];
    trio[2] = structure[8];
    let cerof = trio.indexOf(0);
    if (trio.indexOf(num) != trio.lastIndexOf(num) && cerof != -1) {
        cellglobal(cerof * 4);
        return true;
    }
    trio[0] = structure[2];
    trio[1] = structure[4];
    trio[2] = structure[6];
    cerof = trio.indexOf(0);
    if (trio.indexOf(num) != trio.lastIndexOf(num) && cerof != -1) {

        cellglobal(2 * cerof + 2);
        return true;
    }
}

function esigual(a1, a2) {
    igual = true;
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i]) igual = false;
    }
    return igual;
}

// This function ask the user if he wants to play again and cleans the boardScreen through the "resetgame" function

function question() {
    document.getElementById("final").innerHTML = '<button id="question" type="button" onclick="resetgame()" class="button1">Play again</button>';
}

function showchooseNumberPlayersScreen() {
    document.getElementById("chooseNumberPlayersScreen").removeAttribute("hidden", "hidden");
    document.getElementById("writePlayersNames").setAttribute("hidden", "hidden");
    document.getElementById("player1askname").setAttribute("hidden", "hidden");
    document.getElementById("player2askname").setAttribute("hidden", "hidden");
    document.getElementById("whoBeginsScreen").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").setAttribute("hidden", "hidden");
}

function showWritePlayersNames() {
    document.getElementById("chooseNumberPlayersScreen").setAttribute("hidden", "hidden");
    document.getElementById("whoBeginsScreen").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").setAttribute("hidden", "hidden");

    document.getElementById("writePlayersNames").removeAttribute("hidden", "hidden");
    document.getElementById("player1askname").removeAttribute("hidden", "hidden");
    if (numberOfPlayers === 2) {
        document.getElementById("player2askname").removeAttribute("hidden", "hidden");
    }
}

function showWhoBeginsScreen() {
    document.getElementById("whoBeginsScreen").removeAttribute("hidden", "hidden");
    document.getElementById("chooseNumberPlayersScreen").setAttribute("hidden", "hidden");
    document.getElementById("writePlayersNames").setAttribute("hidden", "hidden");
    document.getElementById("player1askname").setAttribute("hidden", "hidden");
    document.getElementById("player2askname").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").setAttribute("hidden", "hidden");
}

function showBoardScreen() {
    document.getElementById("whoBeginsScreen").setAttribute("hidden", "hidden");
    document.getElementById("chooseNumberPlayersScreen").setAttribute("hidden", "hidden");
    document.getElementById("writePlayersNames").setAttribute("hidden", "hidden");
    document.getElementById("player1askname").setAttribute("hidden", "hidden");
    document.getElementById("player2askname").setAttribute("hidden", "hidden");
    document.getElementById("whoBeginsScreen").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").removeAttribute("hidden", "hidden");
    document.getElementById("boardScreen").removeAttribute("hidden", "hidden");
}
