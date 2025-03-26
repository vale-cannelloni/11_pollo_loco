let canvas;
let world;
let keyboard = new Keyboard();
let keyboardActive = true;
let gameState = "start";

//start
//playing
//gameover

document.addEventListener("keydown", function (e) {
  if (gameState === "start" && e.key === "Enter") {
    gameState = "playing";
    init();
  }

  if (gameState === "gameover" && e.key.toLowerCase() === "r") {
    gameState = "start";
    initStart();
  }
});

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}
function initStart() {
  canvas = document.getElementById("canvas");
  world = new StartScreen(canvas, keyboard);
}

function initOver() {
  canvas = document.getElementById("canvas");
  world = new GameOverScreen(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  if (keyboardActive) {
    let key = e.keyCode;
    if (key == 37) {
      keyboard.LEFT = true;
    }
    if (key == 38) {
      keyboard.UP = true;
    }
    if (key == 39) {
      keyboard.RIGHT = true;
    }
    if (key == 40) {
      keyboard.DOWN = true;
    }
    if (key == 32) {
      keyboard.SPACE = true;
    }
    if (key == 87) {
      keyboard.W = true;
    }
    if (key == 65) {
      keyboard.A = true;
    }
    if (key == 83) {
      keyboard.S = true;
    }
    if (key == 68) {
      keyboard.D = true;
    }
    if (key == 70) {
      keyboard.F = true;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (keyboardActive) {
    let key = e.keyCode;
    if (key == 37) {
      keyboard.LEFT = false;
    }
    if (key == 38) {
      keyboard.UP = false;
    }
    if (key == 39) {
      keyboard.RIGHT = false;
    }
    if (key == 40) {
      keyboard.DOWN = false;
    }
    if (key == 32) {
      keyboard.SPACE = false;
    }
    if (key == 87) {
      keyboard.W = false;
    }
    if (key == 65) {
      keyboard.A = false;
    }
    if (key == 83) {
      keyboard.S = false;
    }
    if (key == 68) {
      keyboard.D = false;
    }
    if (key == 70) {
      keyboard.F = false;
    }
  }
});
