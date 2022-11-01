/* Selection pane .js logic */

const savePlayers = () => {

    let player1Name = document.getElementById("NamePlayer1");
    let NamePlayer1 = player1Name.value;
    console.log(NamePlayer1);
    sessionStorage.setItem("Name player 1", NamePlayer1);

    let playerOneSort = document.getElementById("TypePlayer1Human");
    let TypePlayer1 = playerOneSort.checked;
    sessionStorage.setItem("Is player 1 human?", TypePlayer1);

    let player2Name = document.getElementById("NamePlayer2");
    let NamePlayer2 = player2Name.value;
    console.log(NamePlayer2);
    sessionStorage.setItem("Name player 2", NamePlayer2);

    let playerTwoSort = document.getElementById("TypePlayer2Human");
    let TypePlayer2 = playerTwoSort.checked;
    sessionStorage.setItem("Is player 2 human?", TypePlayer2);

    /*The below "if" looks over if every field is filled in and if there is a human player*/

    if (TypePlayer1 == false && TypePlayer2 == false) {
        alert("As a minimum a player shall be human");
    } else if (NamePlayer1 == "" || NamePlayer2 == "") {
        alert("Jotting down both names is mandatory mate");
    } else {
        document.getElementById("startGame").href = "../pages/videogame.html";
    };
}
