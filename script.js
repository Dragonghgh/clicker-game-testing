let score = 0;
let autoClickers = 0;
let fertilizerBoost = 0;
let goldenCarrots = 0;

let autoClickCost = 50;
let fertilizerCost = 100;

// Update score display
function updateScore() {
    document.getElementById("score").innerText = `${score} Carrots`;
    document.getElementById("golden-carrots").innerText = `Golden Carrots: ${goldenCarrots}`;
}

// Click button
document.getElementById("click-btn").addEventListener("click", () => {
    score += 1 + fertilizerBoost;
    animateClick();
    updateScore();
});

// Auto Clicker
document.getElementById("autoClicker-btn").addEventListener("click", () => {
    if(score >= autoClickCost) {
        score -= autoClickCost;
        autoClickers += 1;
        autoClickCost = Math.floor(autoClickCost * 1.5);
        document.getElementById("autoClicker-btn").innerText = `🐰 Bunny Helper (${autoClickCost})`;
        updateScore();
    }
});

// Fertilizer Boost
document.getElementById("fertilizer-btn").addEventListener("click", () => {
    if(score >= fertilizerCost) {
        score -= fertilizerCost;
        fertilizerBoost += 1;
        fertilizerCost = Math.floor(fertilizerCost * 2);
        document.getElementById("fertilizer-btn").innerText = `🌱 Fertilizer Boost (${fertilizerCost})`;
        updateScore();
    }
});

// Prestige
document.getElementById("prestige-btn").addEventListener("click", () => {
    if(score >= 500) { // Require 500 carrots to prestige
        goldenCarrots += Math.floor(score / 500);
        score = 0;
        autoClickers = 0;
        fertilizerBoost = 0;
        autoClickCost = 50;
        fertilizerCost = 100;
        updateScore();
        alert("You prestiged! Golden Carrots earned!");
    } else {
        alert("You need at least 500 carrots to prestige!");
    }
});

// Auto Clicker effect
setInterval(() => {
    score += autoClickers * (1 + fertilizerBoost);
    updateScore();
}, 1000);

// Simple click animation
function animateClick() {
    const carrot = document.getElementById("click-btn");
    carrot.style.transform = "scale(0.9)";
    setTimeout(() => {
        carrot.style.transform = "scale(1)";
    }, 100);
}
