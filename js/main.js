let structure = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ticplayer = 1;
let numberOfPlayers = 0;
let whichPlayerBegins = 0;
let globalTurnPlayer = 0;
let corners = [0, 2, 6, 8];
let player1name;
let player2name;
let movesDoneByPlayer1 = [];
let movesDoneByPlayer2 = [];
let movesDoneByComputer = [];

let thisPositionAlreadyHasAPiece = false
let readyPutPieceComputer = false


// This function would clean the boardScreen if called.

function resetgame() {
    document.getElementById("chooseNumberPlayersScreen").removeAttribute("hidden", "khidden");
    document.getElementById("writePlayersNames").setAttribute("hidden", "hidden");
    document.getElementById("player1askname").setAttribute("hidden", "hidden");
    document.getElementById("player2askname").setAttribute("hidden", "hidden");
    document.getElementById("whoBeginsScreen").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").setAttribute("hidden", "hidden");
    document.getElementById("msgplaceholder").textContent = "Make your first move";
    ticplayer = 1;
    numberOfPlayers = 0;
    globalTurnPlayer = 0;
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

function whoStartsSelection(playerWhoBegins) {
    whichPlayerBegins = playerWhoBegins;
    globalTurnPlayer = playerWhoBegins;

    showBoardScreen();
    makeMove();
}

function nextTurn(){
    globalTurnPlayer = globalTurnPlayer === 1 ? 2 : 1; 
    makeMove();
}

/*Here it checks which positions are occupied to perform the next movement by the machine. 
Injects the value you specify and "cellglobal" inserts the value by the machine. */

function makeMove() {
    if(isComputerTurn()){
        if(movesDoneByComputer.length === 3){
            structure[movesDoneByComputer[0]] = 0;
            movesDoneByComputer = movesDoneByComputer.shift();
        }
        const computerMovePosition = computerRandomizeSelection();
        setTimeout(()=>{
            movesDoneByComputer.push(computerMovePosition);
            structure[computerMovePosition] = 2;
            manageFinalOrNextTurn(), 1000
        })
        drawxo()
    }
    else{
        console.log("Watis for Player move");
    } 
    
}

function playerMakesMove(positionWherePlayerMakesMove){
    // Aquí nunca entra el ordenador, porque se llama desde la vista

    //PLAYER 1
    if(globalTurnPlayer === 1 /*&& !isComputerTurn()*/){
        if(movesDoneByPlayer1.length === 3){
            structure[movesDoneByPlayer1[0]] = 0;
            movesDoneByPlayer1 = movesDoneByPlayer1.shift();
        }
        structure[positionWherePlayerMakesMove] = 1;
        movesDoneByPlayer1.push(positionWherePlayerMakesMove);
    }


    //PLAYER 2
    if(globalTurnPlayer === 2 /*&& !isComputerTurn()*/){
        if(movesDoneByPlayer2.length === 3){
            structure[movesDoneByPlayer2[0]] = 0;
            movesDoneByPlayer2 = movesDoneByPlayer2.shift();
        }
        structure[positionWherePlayerMakesMove] = 2;
        movesDoneByPlayer2.push(positionWherePlayerMakesMove);
    }
    
    manageFinalOrNextTurn();
    
    
}

function manageFinalOrNextTurn(){
    drawxo();
    const finalType = hasEnded();
    if(finalType.hasEnded === false){
        nextTurn();
    }
    else{
        manageFinalTexts(finalType);
    }
}

function manageFinalTexts(finalType){
    switch (finalType) {
        case 0:
            document.getElementById("msgplaceholder").textContent = "Tie, try playing again!";
            question();
            break;
        case 1:
            // console.log(numberOfPlayers, globalTurnPlayer);
            if (numberOfPlayers === 1) {
                if (globalTurnPlayer === 1) document.getElementById("msgplaceholder").textContent = "You win!!!";
                else document.getElementById("msgplaceholder").textContent = "Game over";
                document.getElementById("boardScreen").setAttribute("hidden", "hidden");
            } else document.getElementById("msgplaceholder").textContent = (player2name + " wins!");
            question();
            break;
        case 2:
            //console.log(numberOfPlayers, globalTurnPlayer);
            if (numberOfPlayers === 1) {
                if (globalTurnPlayer === 2) document.getElementById("msgplaceholder").textContent = (player1name + ", you win!!!");
                else {document.getElementById("msgplaceholder").textContent = "Game over";
                document.getElementById("boardScreen").setAttribute("hidden", "hidden");
            }
            } else document.getElementById("msgplaceholder").textContent = (player2name + ", you win");
            question();
            break;
        default:
            if (numberOfPlayers === 1 && ticplayer !== globalTurnPlayer) { nextTurn(); }
    }
}



/// The below "for" loop checks if the field is empty. The second and third "for" loop checks if there is space to fill blank field with an specified combination. 

function hasEnded() {
    let squares = 0;
    /*
    for (let i = 0; i < structure.length; i++) {
        if (structure[i] == 0) squares++;
    }*/
    for (let a = 0; a < 8; a += 3) {
        if (structure[a] == structure[a + 1] && structure[a + 1] == structure[a + 2] && structure[a] > 0) return structure[a];
    }
    for (let b = 0; b < 3; b++) {
        if (structure[b] == structure[b + 3] && structure[b + 3] == structure[b + 6] && structure[b] > 0) return structure[b];
    }
    if (structure[0] == structure[4] && structure[4] == structure[8] && structure[0] > 0) return {hasEnded:true, whoWins: structure[0]}
    if (structure[2] == structure[4] && structure[4] == structure[6] && structure[2] > 0) return {hasEnded:true, whoWins: structure[0]}
    if (squares == 9) return {hasEnded: false, whoWins:null};
}

// The below function sets up when it should draw an X or either an O based on a "< 9" logic as set forth in the for conditional.

function drawxo() {
    for (let i = 0; i < 9; i++) {            
        if (structure[i] === 0) {
            document.getElementById("gamecell" + i).textContent = "";
        } 
        if(structure[i] === 1) {
            document.getElementById("gamecell" + i).textContent = "X";
            document.getElementById("gamecell" + i).style.color = "yellow";
        }
        if(structure[i] === 2) {
            document.getElementById("gamecell" + i).textContent = "O";
            document.getElementById("gamecell" + i).style.color = "red";
        }
    }
}

//// The below function states if the cell is already filled and which player holds the turn. 

function manageTextContent(tcell) {

    if (numberOfPlayers === 1) {
        if (globalTurnPlayer == ticplayer) {
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

function putpiececomputer(cell) {
    for (i = 0; i < 9; i++) {
        let piecedontdelete

        if (document.getElementById("gamecell" + i).textContent == "") {
            console.log("entre if computer")
            document.getElementById("gamecell" + i).textContent = "O";
            document.getElementById("gamecell" + i).style.color = "red";
            piecedontdelete = i;
            for (i = 0; i < 9; i++) {
                if (document.getElementById("gamecell" + i).textContent == "O" && i != piecedontdelete) {
                    document.getElementById("gamecell" + i).textContent = "";
                    break;
                }
            }
            break;
        }
        // document.getElementById("gamecell" + tcell).textContent = "X";
        // document.getElementById("gamecell" + tcell).style.color = "yellow";

    }

}

function cellglobal(tcell) {
    if(true){

        document.getElementById("gamecell" + tcell).textContent = "X";
        document.getElementById("gamecell" + tcell).style.color = "yellow";

        //putpiececomputer(tcell)
        // globalTurnPlayer = 2;
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
            thisPositionAlreadyHasAPiece = true
        }
        else {
            drawxo();
        }

        
    }
}

/*
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
*/

function computerRandomizeSelection(){
    let randomPosition = Math.floor(Math.random() * (8 - 0 + 1) + 0);
    while(structure[randomPosition]>0){//alguien ha puesto ficha
        randomPosition = Math.floor(Math.random() * (8 - 0 + 1) + 0);
    }   
    return randomPosition; 
    
}

function isComputerTurn(){
    

    if(numberOfPlayers === 2){
        return false;
    }

    let isHuman = ( numberOfPlayers === 1 && globalTurnPlayer === 1);
    if(isHuman){
        return false;
    }
    return true;
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
