// GAME VARIABLES
let score = 0;
let autoClickers = 1; // Start with 1 bunny
let fertilizerBoost = 0;
let harvester = 0;
let magicBunnyActive = false;
let megaCarrotActive = false;
let goldenCarrots = 0;

// COSTS
let autoClickCost = 50;
let fertilizerCost = 100;
let harvesterCost = 500;
let magicBunnyCost = 1000;
let megaCarrotCost = 5000;

// Sounds
const clickSound = document.getElementById('click-sound');
const upgradeSound = document.getElementById('upgrade-sound');
const prestigeSound = document.getElementById('prestige-sound');
const magicSound = document.getElementById('magic-sound');

// ACHIEVEMENTS
const achievements = [
  {name:"First Carrot!", condition: ()=>score>=1, unlocked:false},
  {name:"100 Carrots!", condition: ()=>score>=100, unlocked:false},
  {name:"1000 Carrots!", condition: ()=>score>=1000, unlocked:false},
  {name:"First Bunny!", condition: ()=>autoClickers>=1, unlocked:false},
  {name:"Fertilizer Expert!", condition: ()=>fertilizerBoost>=5, unlocked:false},
];

function updateAchievements() {
  const list = document.getElementById('achievements-list');
  list.innerHTML = '';
  achievements.forEach(a=>{
    if(a.condition() && !a.unlocked){ a.unlocked=true; alert(`Achievement unlocked: ${a.name}!`);}
    if(a.unlocked){ const li = document.createElement('li'); li.innerText = a.name; list.appendChild(li); }
  });
}

// UPDATE UI
function updateUI() {
    document.getElementById("score").innerText = `${score} Carrots`;
    document.getElementById("golden-carrots").innerText = `Golden Carrots: ${goldenCarrots}`;
    document.getElementById("cpc").innerText = 1 + fertilizerBoost + (magicBunnyActive ? 1 : 0) + (megaCarrotActive ? 4 : 0);
    document.getElementById("cps").innerText = autoClickers*(1+fertilizerBoost) + harvester*3;
    updateAchievements();
}

// CLICK BUTTON
document.getElementById("click-btn").addEventListener("click", () => {
    score += 1 + fertilizerBoost + (magicBunnyActive ? 1 : 0) + (megaCarrotActive ? 4 : 0);
    createFloatingCarrot();
    clickSound.currentTime = 0; clickSound.play();
    animateClick();
    updateUI();
});

// AUTO CLICKER
document.getElementById("autoClicker-btn").addEventListener("click", () => {
    if(score >= autoClickCost){
        score -= autoClickCost; autoClickers += 1; autoClickCost = Math.floor(autoClickCost*1.5);
        document.getElementById("autoClicker-btn").innerText = `🐰 Bunny Helper (${autoClickCost})`;
        upgradeSound.currentTime=0; upgradeSound.play();
        spawnBunny(); updateUI();
    }
});

// FERTILIZER BOOST
document.getElementById("fertilizer-btn").addEventListener("click", () => {
    if(score >= fertilizerCost){
        score -= fertilizerCost; fertilizerBoost +=1; fertilizerCost = Math.floor(fertilizerCost*2);
        document.getElementById("fertilizer-btn").innerText = `🌱 Fertilizer Boost (${fertilizerCost})`;
        upgradeSound.currentTime=0; upgradeSound.play(); updateUI();
    }
});

// HARVESTER
document.getElementById("harvester-btn").addEventListener("click", () => {
    if(score >= harvesterCost){
        score -= harvesterCost; harvester +=1; harvesterCost = Math.floor(harvesterCost*2);
        document.getElementById("harvester-btn").innerText = `🚜 Carrot Harvester (${harvesterCost})`;
        upgradeSound.currentTime=0; upgradeSound.play(); updateUI();
    }
});

// MAGIC BUNNY
document.getElementById("magicBunny-btn").addEventListener("click", () => {
    if(score >= magicBunnyCost && !magicBunnyActive){
        score -= magicBunnyCost; magicBunnyActive=true; magicSound.currentTime=0; magicSound.play(); updateUI();
        setTimeout(()=>{magicBunnyActive=false; updateUI();},10000);
    }
});

// MEGA CARROT
document.getElementById("megaCarrot-btn").addEventListener("click", () => {
    if(score >= megaCarrotCost && !megaCarrotActive){
        score -= megaCarrotCost; megaCarrotActive=true; magicSound.currentTime=0; magicSound.play(); updateUI();
        setTimeout(()=>{megaCarrotActive=false; updateUI();},10000);
    }
});

// PRESTIGE
document.getElementById("prestige-btn").addEventListener("click", () => {
    if(score>=500){
        goldenCarrots += Math.floor(score/500);
        score=0; autoClickers=1; fertilizerBoost=0; harvester=0; magicBunnyActive=false; megaCarrotActive=false;
        autoClickCost=50; fertilizerCost=100; harvesterCost=500; magicBunnyCost=1000; megaCarrotCost=5000;
        prestigeSound.currentTime=0; prestigeSound.play(); updateUI();
        alert(`You prestiged! Golden Carrots: ${goldenCarrots}`);
    } else alert("You need at least 500 carrots to prestige!");
});

// AUTO CPS + HARVESTER
setInterval(()=>{ score += autoClickers*(1+fertilizerBoost) + harvester*3; updateUI(); },1000);

// FLOATING CARROTS
function createFloatingCarrot(){ const carrot=document.createElement('div'); carrot.innerText='🥕'; carrot.className='floating-carrot'; const x=Math.random()*80+10; carrot.style.left=x+'%'; document.getElementById('floating-carrots').appendChild(carrot); setTimeout(()=>carrot.remove(),1000); }

// CLICK ANIMATION
function animateClick(){ const carrot=document.getElementById("click-btn"); carrot.style.transform="scale(0.9)"; setTimeout(()=>carrot.style.transform="scale(1)",100); }

// BUNNY ANIMATION
function spawnBunny(){ const bunny=document.createElement('div'); bunny.innerText='🐇'; bunny.className='bunny'; const x=Math.random()*80+10; bunny.style.left=x+'%'; document.getElementById('bunnies').appendChild(bunny); setTimeout(()=>bunny.remove(),5000); }
