/* This .js is inteded to flow-down the winner name once that player has won the game */ 

let winner = document.getElementById("winnerMessage");
winner.innerHTML = sessionStorage.getItem("Winner");