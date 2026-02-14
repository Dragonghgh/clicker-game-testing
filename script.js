let score = 0;
let autoClickers = 0;
let autoClickCost = 50;

// Update score display
function updateScore() {
    document.getElementById("score").innerText = `${score} Points`;
}

// Main click button
document.getElementById("click-btn").addEventListener("click", () => {
    score += 1;
    updateScore();
});

// Buy Auto Clicker
document.getElementById("autoClicker-btn").addEventListener("click", () => {
    if(score >= autoClickCost) {
        score -= autoClickCost;
        autoClickers += 1;
        autoClickCost = Math.floor(autoClickCost * 1.5); // cost increases
        document.getElementById("autoClicker-btn").innerText = `Buy Auto Clicker (Cost: ${autoClickCost})`;
        updateScore();
    }
});

// Auto clicker effect
setInterval(() => {
    score += autoClickers;
    updateScore();
}, 1000);
