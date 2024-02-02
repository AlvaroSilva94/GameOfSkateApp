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

deleteAllButtonEl.addEventListener("click", function() {
    if (window.confirm("Are you sure you want to delete all items?")) {
        // If the user confirms, delete all items from the database
        remove(SkateHistoryListInDB);
    }
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        resultsListEl.innerHTML =`<muft>No items here... yet</muft>`
    }
})

function clearShoppingListEl() {
    resultsListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    resultsListEl.append(newEl)
}