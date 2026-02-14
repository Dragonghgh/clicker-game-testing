let score = 0;
let autoClickers = 0;
let fertilizerBoost = 0;

let autoClickCost = 50;
let fertilizerCost = 100;

function updateScore() {
    document.getElementById("score").innerText = `${score} Carrots`;
}

// Click button
document.getElementById("click-btn").addEventListener("click", () => {
    score += 1 + fertilizerBoost;
    updateScore();
});

// Buy Auto Clicker
document.getElementById("autoClicker-btn").addEventListener("click", () => {
    if(score >= autoClickCost) {
        score -= autoClickCost;
        autoClickers += 1;
        autoClickCost = Math.floor(autoClickCost * 1.5);
        document.getElementById("autoClicker-btn").innerText = `Buy Bunny Helper (Cost: ${autoClickCost})`;
        updateScore();
    }
});

// Buy Fertilizer Boost
document.getElementById("fertilizer-btn").addEventListener("click", () => {
    if(score >= fertilizerCost) {
        score -= fertilizerCost;
        fertilizerBoost += 1;
        fertilizerCost = Math.floor(fertilizerCost * 2);
        document.getElementById("fertilizer-btn").innerText = `Buy Fertilizer Boost (Cost: ${fertilizerCost})`;
        updateScore();
    }
});

// Auto Clicker effect
setInterval(() => {
    score += autoClickers * (1 + fertilizerBoost);
    updateScore();
}, 1000);
