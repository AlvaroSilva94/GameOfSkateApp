//THIS JS File is used only to share info between pages
const storageKey = 'gameOfSkateSharedState';

// Initialize sharedState from localStorage or use default values
window.sharedState = JSON.parse(localStorage.getItem(storageKey)) || {
    player1Name: "Player 1",
};

function saveSharedState() {
    localStorage.setItem(storageKey, JSON.stringify(window.sharedState));
}

export function setPlayer1Name(newName) {
    window.sharedState.player1Name = newName;
    saveSharedState();
}

export function getPlayer1Name() {
    return window.sharedState.player1Name;
}

export function resetNames() {
    window.sharedState.player1Name = "Player 1";
    saveSharedState();
}
