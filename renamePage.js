import { setPlayer1Name, setPlayer2Name } from './aux/shared.js';

const ReturnRename = document.getElementById('return');
let GetPlayer1 = document.getElementById('player1');
let GetPlayer2 = document.getElementById('player2');
const UpdateNames = document.getElementById('update');

ReturnRename.addEventListener("click", () => {
  window.history.back();
  });

UpdateNames.addEventListener("click", () => {
    const newPlayer1Name = GetPlayer1.value;
    const newPlayer2Name = GetPlayer2.value;

    //if name is empty, dont update the fields
    if(!newPlayer1Name) {
      setPlayer1Name("Player 1");
    }
    else {
      setPlayer1Name(newPlayer1Name);
    }

    //if name is empty, dont update the fields
    if(!newPlayer2Name) {
      setPlayer2Name("Player 2");
    }
    else {
      setPlayer2Name(newPlayer2Name);
    }

    // Optionally redirect to another page
    alert("Player Names have been updated!");
    window.history.back();
});