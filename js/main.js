let player1Mark = "x"
let player1MarkImg = "../img/imgx.png"
let player2Mark = "o"
let player2MarkImg = "../img/imgo.png"
let playerMark = player1Mark
let board = document.getElementById('gameBoard')
let player1 = { nombre: 'jugadorA', tipo: 'humano' }
let player2 = { nombre: 'jugadorB', tipo: 'humano' }
let player = {}

// document.getElementsByClassName("startButton").disabled = false;

const startGame = () => {

    let excludedSquares = [];

    for (let i = 0; i < 9; i++) {   // i != excludedSquares
        let box = document.createElement("div")
        box.id = i;
        box.className = 'board-box';
        console.log("h")

        box.onclick = () => {

            box.style.backgroundImage = `url('${player2MarkImg}')`;
            excludedSquares.push(box.id);


            const createNumberRandom = () => {
                return Math.floor(Math.random() * (9 - 1))
            }


            const numberRandom = () => {

                let exist = false
                let number = createNumberRandom();

                excludedSquares.forEach(element => {
                    if (element == number) {
                    }
                    else {
//
                    }
                }
                );
                return number;
            }

            const Computer = () => {
                const myElement = document.getElementById(numberRandom())

                //  if(box.id === excludedSquares){
                //}
                // Math.floor(Math.random() * (9 - 1))
                // excludedSquares.forEach(element => console.log(element))


                excludedSquares.push(myElement.id);
                myElement.style.backgroundImage = `url('${player1MarkImg}')`;
            }

            setTimeout(Computer, 700);

        }




        board.appendChild(box)

    }
}
