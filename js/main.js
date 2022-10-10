

function place(box) {
    alert ("Hey buddy, you clicked here!");
}

/*Setting that the inner text of every <div></div> will be that one stored under the "currentPlayer" variable */

let currentPlayer = "O";
function place(box) {
box.innerText = currentPlayer;
/*Here it is placed an if statement to the above function that will check if a player should place a nought or a cross.*/
if(currentPlayer == "O") {
    currentPlayer = "X";
}
else {
    currentPlayer = "O";
}
}
