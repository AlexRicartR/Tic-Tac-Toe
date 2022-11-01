let playerOneData = document.getElementById("playerOne");
playerOneData.innerHTML = sessionStorage.getItem("Name player 1");

let playerTwoData = document.getElementById("playerTwo");
playerTwoData.innerHTML = sessionStorage.getItem("Name player 2");

let playerOneSort = "";
if (JSON.parse(sessionStorage.getItem("Is player 1 human?")) == true) {
    playerOneSort = "human";
} else {
    playerOneSort = "machine";
};

let playerTwoSort = "";
if (JSON.parse(sessionStorage.getItem("Is player 2 human?")) == true) {
    playerTwoSort = "human";
} else {
    playerTwoSort = "machine";
};

class TicPlayer {
    constructor(name, type) {
        this.name = name,
        this.type = type
    }
};

let playerOne = new TicPlayer(playerOneData.innerHTML, playerOneSort);
let playerTwo = new TicPlayer(playerTwoData.innerHTML, playerTwoSort);
let playerOneMoves = 3;
let playerTwoMoves = 3;

// This let the user know how many moves holds.

let playerOneMovesData = document.getElementById("player1TurnsLeft");
let playerOneMovesText = document.getElementById("playerOneMovesText");
playerOneMovesData.innerHTML = 3;
playerOneMovesText.innerHTML = " moves left."
const playerOneMovesSum = () => {
    if (playerOneMoves > 1) {
        playerOneMovesData.innerHTML = playerOneMoves;
        playerOneMovesText.innerHTML = " moves left.";
    } else if (playerOneMoves == 1) {
        playerOneMovesData.innerHTML = playerOneMoves;
        playerOneMovesText.innerHTML = " move left."
    } else {
        playerOneMovesData.innerHTML = "";
        playerOneMovesText.innerHTML = "You ran out of pieces, buddy!";
    };
}
let player2TurnsInfo = document.getElementById("player2TurnsLeft");
let player2TurnsText = document.getElementById("player2TurnsText");
player2TurnsInfo.innerHTML = 3;
player2TurnsText.innerHTML = " moves left."
const playerTwoMovesSum = () => {
    if (playerTwoMoves > 1) {
        player2TurnsInfo.innerHTML = playerTwoMoves;
        player2TurnsText.innerHTML = " moves left."
    } else if (playerTwoMoves == 1) {
        player2TurnsInfo.innerHTML = playerTwoMoves;
        player2TurnsText.innerHTML = " move left."
    } else {
        player2TurnsInfo.innerHTML = "";
        player2TurnsText.innerHTML = "You ran out of pieces, buddy!"
    }
}

// Initial settings 

let playerOneScore = "X";
let playerTwoScore = "O";
let playerMark = playerOneScore;
let player = playerOne;
let playSum = 0;

// Functions as needed along the game 

const player1Play = () => {
    player = playerOne;
    playerOneMoves--;
    playSum++;
    playerOneMovesSum();
    winnerCheck();
}

const player2Play = () => {
    player = playerTwo;
    playerTwoMoves--;
    playSum++;
    playerTwoMovesSum();
    winnerCheck();
}

const player1MachinePlay = () => {
    let nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    while (nextVerification.innerHTML != "") {
        nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    }
    nextVerification.innerHTML = playerMark;
    player = playerOne;
    playerOneMoves--;
    playSum++;
    playerOneMovesSum();
    winnerCheck();
    playerMark = playerTwoScore;
    player = playerTwo;
}

const player2MachinePlay = () => {
    let nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    while (nextVerification.innerHTML != "") {
        nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    }

    nextVerification.innerHTML = playerMark;
    player = playerTwo;
    playerTwoMoves--;
    playSum++;
    playerTwoMovesSum();
    winnerCheck();
    playerMark = playerOneScore;
    player = playerOne;
}

const computerOne = () => {
    let nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    while (nextVerification.innerHTML == "" || nextVerification.innerHTML == playerTwoScore) {
        nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    }
    nextVerification.innerHTML = "";
    player = playerOne;
    playerOneMoves++;
    playerOneMovesSum();
    winnerCheck();

}

const computerTwo = () => {
    let nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    while (nextVerification.innerHTML == "" || nextVerification.innerHTML == playerOneScore) {
        nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
    }
    nextVerification.innerHTML = "";
    player = playerTwo;
    playerTwoMoves++;
    playerTwoMovesSum();
    winnerCheck();

}

// Game performance 

let boardVerifications = Array.from(document.getElementsByClassName("cell"));

boardVerifications.map((boardCheck) => {

    if (playerOne.type == "machine" && player == playerOne) {

        let nextVerification = boardVerifications[Math.floor(Math.random() * boardVerifications.length)];
        nextVerification.innerHTML = playerMark;
        player = playerOne;
        playerOneMoves--;
        playSum++;
        playerOneMovesSum();
        playerMark = playerTwoScore;
        player = playerTwo;

    }

    boardCheck.addEventListener('click', () => {
        if (playerOneMoves > 0 || playerTwoMoves > 0) {
            if (boardCheck.innerHTML == "") {
                boardCheck.innerHTML = playerMark;
                if (playerMark == playerOneScore) {
                    player1Play();
                    if (winnerCheck() != true) {
                        playerMark = playerTwoScore;
                        if (playerTwo.type == "machine") {
                            if (playSum > 5 && playSum % 2 != 0) {
                                computerTwo();
                            }
                            setTimeout(player2MachinePlay, 500);
                        }
                    }

                } else {
                    boardCheck.classList.remove("boldTextMain");
                    boardCheck.classList.add("innerText");
                    player2Play();
                    if (winnerCheck() != true) {
                        playerMark = playerOneScore;
                        if (playerOne.type == "machine") {
                            if (playSum > 5 && playSum % 2 == 0) {
                                computerOne();
                            }
                            setTimeout(player1MachinePlay, 500);
                        }
                    }
                }
            }
        } else {
            if (boardCheck.innerHTML == playerMark) {
                boardCheck.innerHTML = "";
                if (playerMark == playerOneScore) {
                    player = playerOne;
                    playerOneMoves++;
                    playerOneMovesSum();
                } else {
                    player = playerTwo;
                    playerTwoMoves++;
                    playerTwoMovesSum();
                }
            }
        }
    })
})

// The below code set forth the winning conditions. 

const winnerCheck = () => {
    if (boardVerifications[0].innerHTML === boardVerifications[1].innerHTML && boardVerifications[1].innerHTML === boardVerifications[2].innerHTML && boardVerifications[0].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;
    }
    if (boardVerifications[3].innerHTML === boardVerifications[4].innerHTML && boardVerifications[4].innerHTML === boardVerifications[5].innerHTML && boardVerifications[3].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
    if (boardVerifications[6].innerHTML === boardVerifications[7].innerHTML && boardVerifications[7].innerHTML === boardVerifications[8].innerHTML && boardVerifications[6].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
    if (boardVerifications[0].innerHTML === boardVerifications[3].innerHTML && boardVerifications[3].innerHTML === boardVerifications[6].innerHTML && boardVerifications[0].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
    if (boardVerifications[1].innerHTML === boardVerifications[4].innerHTML && boardVerifications[4].innerHTML === boardVerifications[7].innerHTML && boardVerifications[1].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
    if (boardVerifications[2].innerHTML === boardVerifications[5].innerHTML && boardVerifications[5].innerHTML === boardVerifications[8].innerHTML && boardVerifications[2].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
    if (boardVerifications[0].innerHTML === boardVerifications[4].innerHTML && boardVerifications[4].innerHTML === boardVerifications[8].innerHTML && boardVerifications[0].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
    if (boardVerifications[2].innerHTML === boardVerifications[4].innerHTML && boardVerifications[4].innerHTML === boardVerifications[6].innerHTML && boardVerifications[6].innerHTML != "") {
        JSON.stringify(sessionStorage.setItem("Winner", player.name));
        window.location.href = "../pages/winnerpage.html"
        return true;

    }
}