import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://gameofskate-94fcf-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const SkateHistoryListInDB = ref(database, "SkateGameHistory");

const resultsListEl = document.getElementById("results-list")
const deleteAllButtonEl = document.getElementById("delete-all-button")

const viewHistoryButton = document.getElementById("view-history");

viewHistoryButton.addEventListener("click", function () {
  getAndDisplayGameHistory(); // Call the new function to retrieve and display history
});

function getAndDisplayGameHistory() {
  const historyListEl = document.getElementById("game-history-list");


  onValue(SkateHistoryListInDB, (snapshot) => {
    if (snapshot.exists()) {
      // Clear the existing list items
      historyListEl.innerHTML = "";

      const gameHistoryData = Object.values(snapshot.val()); // Get values only

      for (const item of gameHistoryData) {
        // Modify the retrieved item to display "Result" on a new line
        const formattedItem = item.replace("Result", "\nResult");
        
        const newListItem = document.createElement("li");
        newListItem.textContent = formattedItem;
        historyListEl.appendChild(newListItem);
      }
    } else {
      historyListEl.innerHTML = "<p>No game history entries yet.</p>";
    }
  });
}

deleteAllButtonEl.addEventListener("click", function() {
    if (window.confirm("Are you sure you want to delete all items?")) {
        // If the user confirms, delete all items from the database
        remove(SkateHistoryListInDB);
    }
})