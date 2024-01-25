import { setPlayer1Name } from './aux/shared.js';

const ReturnRename = document.getElementById('return');
let GetPlayer1 = document.getElementById('player1');
let GetPlayer2 = document.getElementById('player2');
const UpdateNames = document.getElementById('update');

ReturnRename.addEventListener("click", () => {
  window.history.back();
  });

UpdateNames.addEventListener("click", () => {
    const newPlayer1Name = GetPlayer1.value;
    console.log(newPlayer1Name);
    setPlayer1Name(newPlayer1Name);
    // Optionally redirect to another page
    alert("Player Names have been updated!");
    window.history.back();
});