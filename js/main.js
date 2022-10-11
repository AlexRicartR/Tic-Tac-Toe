

// function place(box) {
//     alert ("Hey buddy, you clicked here!");
// }

/*Setting that the inner text of every <div></div> will be that one stored under the "currentPlayer" variable */

let currentPlayer = "O";
function place(box) {
    if (box.innerText != "") return;
    box.innerText = currentPlayer;
    currentPlayer == "O" ? currentPlayer = "X" : currentPlayer = "O";
}
    /*Here it is placed an if statement to the above function that will check if a player should place a nought or a cross.*/
    

/* Basically, through the above lines we are telling the program that if the condition of the currentPlayer variable is equal to O, then set the currentPlayer variable to X. Otherwise, if the condition is false, set it to O. */ 
