//Bubble Game By Moleeekkk
let timer = 60;
let score = 0;
let hitNum = 0;
let countdown;
let highScore = localStorage.getItem("highscore") || 0;

makeBubble();
setHighScore();

function playGame() {
  document.getElementById("play").style.display = "none";
  document.getElementById("main-screen-div").style.display = "none";
  score = 0;
  makeBubble();
  getNewHit();
  countdown = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.getElementById("timeval").textContent = timer;
    } else {
      document.getElementById("main-screen-div").style.display = "flex";
      document.getElementById("game-over").style.display = "flex";
      clearInterval(countdown);
      gameOver();
    }
  }, 1000);
}

// Generate Random Bubbles
function makeBubble() {
  let clutter = "";
  for (let i = 1; i <= 161; i++) {
    let rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }
  document.getElementById("pbtm").innerHTML = clutter;
}

// New Hit Number
function getNewHit() {
  hitNum = Math.floor(Math.random() * 10);
  document.getElementById("hitval").textContent = hitNum;
}

// Increase Score
function increaseScore() {
  score += 10;
  document.getElementById("scoreval").textContent = score;
}

// Event Listener for Bubble Click
document.getElementById("pbtm").addEventListener("click", function (e) {
  let clickedNum = Number(e.target.textContent);
  if (!isNaN(clickedNum)) {
    if (clickedNum === hitNum) {
      increaseScore();
      makeBubble();
      getNewHit();
    } else {
      document.getElementById("main-screen-div").style.display = "flex";
      document.getElementById("game-over").style.display = "flex";
      clearInterval(countdown);
      gameOver();
    }
  }
});
//Bubble Game By Moleeekkk

function gameOver() {
  if (highScore < score) {
    highScore = score;
  }
  document.getElementById("curr-score").textContent = score;
  setHighScore();
  storeToLocal();
}

function setHighScore() {
  let ele = document.querySelectorAll(".high-score");
  ele.forEach((e) => {
    e.textContent = highScore;
  });
}

function storeToLocal() {
  localStorage.setItem("highscore", highScore);
}
