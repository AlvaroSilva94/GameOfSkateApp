import { getPlayer1Name, getPlayer2Name, resetNames } from './aux/shared.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://gameofskate-94fcf-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const SkateHistoryListInDB = ref(database, "SkateGameHistory");

const letterButtonsP1 = document.querySelectorAll('.btn-square1');
const letterButtonsP2 = document.querySelectorAll('.btn-square2');

const StartNewGame = document.getElementById('newgame-button');
const RenamePlayers = document.getElementById('rename-players');
const ViewGameHistory = document.getElementById('view-history');
const ResetNames = document.getElementById('reset-names-def');

const HistoryListEl = document.getElementById('results-list');

let pressedButtonArr1= [];
let pressedButtonArr2 = [];
let letterP1 = "";
let letterP2 = "";

//To store in the results table
let winnerName = ""; //name of match-winner
let loserName = "";

// Function to check if all buttons are pressed for Player 2
function isPlayer2Winner() {
  const sPressed1 = document.getElementById('SletterBtn1').classList.contains('pressed');
  const kPressed1 = document.getElementById('KletterBtn1').classList.contains('pressed');
  const aPressed1 = document.getElementById('AletterBtn1').classList.contains('pressed');
  const tPressed1 = document.getElementById('TletterBtn1').classList.contains('pressed');
  const ePressed1 = document.getElementById('EletterBtn1').classList.contains('pressed');

  return sPressed1 && kPressed1 && aPressed1 && tPressed1 && ePressed1;
}

function isPlayer1Winner() {
  const sPressed2 = document.getElementById('SletterBtn2').classList.contains('pressed');
  const kPressed2 = document.getElementById('KletterBtn2').classList.contains('pressed');
  const aPressed2 = document.getElementById('AletterBtn2').classList.contains('pressed');
  const tPressed2 = document.getElementById('TletterBtn2').classList.contains('pressed');
  const ePressed2 = document.getElementById('EletterBtn2').classList.contains('pressed');

  return sPressed2 && kPressed2 && aPressed2 && tPressed2 & ePressed2;
}

function ButtonsPressedP1() {
  // Allow for pressing and keeping buttons pressed for P1
  letterButtonsP1.forEach(button => {
    button.addEventListener('click', () => {
      letterP1 = button.getAttribute('data-letter');

      // Toggle the pressed state
      if (button.classList.contains('pressed')) {
        button.classList.remove('pressed');
        pressedButtonArr1.pop();
      } else {
        button.classList.add('pressed');
        pressedButtonArr1.push(letterP1);
      }

      // Check if Player 1 has won when any button for Player 1 is clicked
      CheckLostP1();

      // Check if Player 2 has won immediately after Player 1's 'E' button is clicked
      if (letterP1 === 'E') {
        CheckLostP2();
      }

      // MaintainPressOrder(pressedButtonArr);
    });
  });
}

function ButtonsPressedP2()
{
// Allow for pressing and keeping buttons pressed for P2
letterButtonsP2.forEach(button => {
  button.addEventListener('click', () => {
    letterP2 = button.getAttribute('data-letter');

    // Toggle the pressed state
    if (button.classList.contains('pressed')) {
      button.classList.remove('pressed');
      pressedButtonArr2.pop();
    } else {
      button.classList.add('pressed');
      pressedButtonArr2.push(letterP2);
    }

    //Check if player 2 lost
    CheckLostP2();

    //Check if after E the player lost the game
    if(letterP2 === 'E'){
      CheckLostP1();
    }
  });
});
}

function CheckLostP1()
{
    // Check if Player 1 has won when any button for Player 1 is clicked
    if (isPlayer1Winner()) {

      //Add winner name and loser name to table
      winnerName = document.getElementById('name-p1').textContent;
      loserName = document.getElementById('name-p2').textContent;

      alert(`${loserName} lost the game!`);
      storeResult(winnerName, loserName);
      Reset();
    }
}

function CheckLostP2()
{
    // Check if Player 2 has won when any button for Player 2 is clicked
    if (isPlayer2Winner()) {

      //Add winner name and loser name to table
      winnerName = document.getElementById('name-p2').textContent;
      loserName = document.getElementById('name-p1').textContent;

      alert(`${loserName} lost the game!`);
      storeResult(winnerName, loserName);
      Reset();
    }
}

function Reset()
{
  // Reset all presses
  letterButtonsP1.forEach(button => {
    button.classList.remove('pressed');
  });
    
  letterButtonsP2.forEach(button => {
    button.classList.remove('pressed');
  });
}

ButtonsPressedP1();
ButtonsPressedP2();

StartNewGame.addEventListener("click", () => {
  alert('Reseting result, all progress will be lost!');
  Reset();
  window.location.href = "index.html";
})

RenamePlayers.addEventListener("click", () => {
  //Send to another page with only two fields and a button
  // get values, update names and return to this page;
  window.location.href = "renamePage.html";
});

function updatePlayerNames(){
  document.getElementById('name-p1').textContent = getPlayer1Name();
  document.getElementById('name-p2').textContent = getPlayer2Name();
}

window.addEventListener('load', updatePlayerNames);


ResetNames.addEventListener("click", () => {
  document.getElementById('name-p1').textContent = "Player 1";
  document.getElementById('name-p2').textContent = "Player 2";
  resetNames();
  alert("Names have been reset to default!");
});

ViewGameHistory.addEventListener("click", () => {
  window.location.href = "aux/viewHistory.html";
});

function storeResult(win, lost) {
  let arr1 = pressedButtonArr1.toString();
  let arr2 = pressedButtonArr2.toString();
  let info = `${win} won against ${lost}! Result: ${arr2} vs ${arr1}`;
  push(SkateHistoryListInDB, info);

  // Call the function to update the game history list in the UI
  updateGameHistoryList();
}

function fetchGameHistory() {
  onValue(SkateHistoryListInDB, (snapshot) => {
    if (snapshot.exists()) {
      // Get the game history data
      const gameHistoryData = Object.values(snapshot.val()); // Get values only

      // Call a separate function to handle UI update
      updateGameHistoryList(gameHistoryData);
    } else {
      HistoryListEl.innerHTML = "<muft>No game score...yet</muft>";
    }
  });
}

function appendItemToSkateHistory(key, itemValue) {
  // Use the key or itemValue for additional formatting if needed
  const newListItem = document.createElement("li");
  newListItem.textContent = itemValue;
  HistoryListEl.appendChild(newListItem);
}

// Function to fetch and update game history list in the UI
function updateGameHistoryList() {
  // Clear the existing list items (optional)
  HistoryListEl.innerHTML = "";

  onValue(SkateHistoryListInDB, (snapshot) => {
    if (snapshot.exists()) {
      // Get the game history data
      const gameHistoryData = Object.values(snapshot.val()); // Get values only

      for (const item of gameHistoryData) {
        appendItemToSkateHistory(item); // Use item directly
      }
    } else {
      HistoryListEl.innerHTML = "<muft>No game score...yet</muft>";
    }
  });
}

//TODO: 
ViewGameHistory.addEventListener("click", () => {
  // fetchGameHistory();
  window.location.href = "aux/viewHistory.html";
});

//Add logic to allow only K when S is pressed and so on
//disable all others

let P1Name = getNameOfPlayer1();
let P2Name = getNameOfPlayer2();



/********************************************
function updateText() {
    // Get the input element by its ID
    const inputElement = document.getElementById('userInput');
    
    // Get the value entered by the user
    const userInputValue = inputElement.value;

    // Get the output text element by its ID
    const outputTextElement = document.getElementById('outputText');

    // Update the text content of the output element
    outputTextElement.textContent = userInputValue;
}

*/

