let meteorX, meteorY;
let tankX, tankY;
let missileX, missileY;
let missileActive;
let gameState;

function setup() {
  createCanvas(400, 400);
  resetGame();
}

function draw() {
  background(220);

  if (gameState === "playing") {
    // move meteor
    meteorY += 2;

    // move tank
    if (keyIsDown(LEFT_ARROW)) {
      tankX -= 4;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      tankX += 4;
    }

    // keep tank on screen
    tankX = constrain(tankX, 20, width - 20);

    // move missile
    if (missileActive) {
      missileY -= 5;
      if (missileY < 0) {
        missileActive = false;
      }

      // missile hit meteor?
      let d = dist(missileX, missileY, meteorX, meteorY);
      if (d < 30) {      // meteor radius (60 / 2)
        gameState = "won";
        missileActive = false;
      }
    }

    // meteor missed (off bottom)?
    if (meteorY > height + 30) {
      gameState = "lost";
    }
  }

  // draw meteor
  fill(150, 100, 50);
  circle(meteorX, meteorY, 60);

  // draw tank
  rectMode(CENTER);
  fill(0, 200, 0);
  rect(tankX, tankY, 40, 20);

  // draw missile
  if (missileActive) {
    fill(0);
    rect(missileX, missileY, 5, 10);
  }

  // messages
  fill(0);
  textAlign(CENTER);
  textSize(16);
  if (gameState === "won") {
    text("You hit the meteor!", width / 2, 40);
    text("Press R to restart", width / 2, 60);
  } else if (gameState === "lost") {
    text("You missed!", width / 2, 40);
    text("Press R to restart", width / 2, 60);
  }
}

function keyPressed() {
  // fire missile
  if (key === ' ' && !missileActive && gameState === "playing") {
    missileX = tankX;
    missileY = tankY - 20;
    missileActive = true;
  }

  // restart
  if ((key === 'r' || key === 'R') && gameState !== "playing") {
    resetGame();
  }
}

function resetGame() {
  meteorX = random(50, width - 50);
  meteorY = 50;
  tankX = width / 2;
  tankY = height - 30;
  missileActive = false;
  gameState = "playing";
}