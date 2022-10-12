let player1Mark = "x"
let player1MarkImg = "../img/imgx.png"
let player2Mark = "o"
let player2MarkImg = "../img/imgo.png"
let playerMark = player1Mark
let board = document.getElementById('gameBoard')
let player1 = {nombre: 'jugadorA', tipo:'humano'}
let player2 = {nombre: 'jugadorB', tipo:'humano'}
let player = {}

const startGame = () => {
        for (let i = 0; i < 9; i++){
        let box = document.createElement("div")
        box.id = i
        box.className = 'board-box'

        box.onclick = () => {
            if (box.innerHTML == "") {
                if (playerMark == player1Mark) {
                    console.log(`url("${player1MarkImg}")`)
                    box.style.backgroundImage = `url('${player1MarkImg}')`;
                    player = player1;
                    // player1Turns--;
                    // player1TurnsCounter();
                    // checkWinner();
                    playerMark = player2Mark;
                } else {
                    box.style.backgroundImage = `url("${player2MarkImg}")`;
                    player = player2;
                    // player2Turns--;
                    // player2TurnsCounter();
                    // checkWinner();
                    playerMark = player1Mark;
                }
            }
        }

        board.appendChild(box)

    }
}