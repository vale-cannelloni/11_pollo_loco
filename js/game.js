let canvas;
let world;
let keyboard = new Keyboard();
let keyboardActive = true;
let gameState = "start";

let clickSound = new Audio(
  "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/dhhtgkuddl/01.%20Nintendo%20Logo.mp3"
);

let gamePlaySound = new Audio(
  "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/cybobvkufo/12.%20Overworld.mp3"
);

let gameOverSound = new Audio(
  "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/rzghhryzkm/52.%20Game%20Over.mp3"
);

let gameWinSound = new Audio(
  "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/xhdrnmdrka/42.%20Bonus%20Game%20Clear.mp3"
);

let bossBattleSound = new Audio(
  "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/dlgohnhgam/55.%20Bowser%27s%20Last%20Attack.mp3"
);

document.addEventListener("keydown", function (e) {
  if (gameState === "start" && e.key === "Enter") {
    startGame();
  }

  if (gameState === "gameover" && e.key.toLowerCase() === "r") {
    initStart();
  }
});

function init() {
  gamePlaySound.play();
  gameState = "playing";
  blink("blinker", "start", "startGameOverlay");
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function initStart() {
  rewindSong(gameOverSound);
  rewindSong(gameWinSound);
  gameState = "start";
  blink("blinker", "start", "startGameOverlay");
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
  canvas = document.getElementById("canvas");
  world = new StartScreen(canvas, keyboard);
}

function initOver() {
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
  canvas = document.getElementById("canvas");
  world = new GameOverScreen(canvas, keyboard);
  gameOverSound.play();
}

function initWin() {
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
  canvas = document.getElementById("canvas");
  world = new GameWinScreen(canvas, keyboard);
  gameWinSound.play();
}

function showButtons() {
  let mobileButton = document.getElementById("mobileButtons");
  if (!mobileButton) return;
  if (gameState === "playing") {
    mobileButton.style.visibility = "visible";
  } else {
    mobileButton.style.visibility = "hidden";
  }
}

function rewindSong(song) {
  song.pause();
  song.currentTime = 0;
}

function startGame() {
  clickSound.play();
  setTimeout(() => {
    init();
  }, 500);
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

function simulateKeyDown(keyCode) {
  let event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
  });

  Object.defineProperty(event, "keyCode", { value: keyCode });
  Object.defineProperty(event, "which", { value: keyCode });

  document.dispatchEvent(event);
}

function simulateKeyUp(keyCode) {
  let event = new KeyboardEvent("keyup", {
    bubbles: true,
    cancelable: true,
  });

  Object.defineProperty(event, "keyCode", { value: keyCode });
  Object.defineProperty(event, "which", { value: keyCode });

  document.dispatchEvent(event);
}

function blink(blinkerId, state, overlayId) {
  let blinker = document.getElementById(blinkerId);
  let overlay = document.getElementById(overlayId);
  overlay.style.visibility = "visible";
  if (gameState == state) {
    blinker.style.visibility = "hidden";
    setTimeout(() => {
      blinker.style.visibility = "visible";
      setTimeout(() => {
        blink(blinkerId, state, overlayId);
      }, 500);
    }, 500);
  } else {
    blinker.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  }
}
