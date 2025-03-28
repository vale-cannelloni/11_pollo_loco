let canvas;
let world;
let keyboard = new Keyboard();
let keyboardActive = true;
let gameState = "start";
let restart = false;
let intervalIds = [];
let mute = false;

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (gameState === "start" && e.key === "Enter") {
    init();
  }

  if ((gameState === "gameover" || gameState === "playing") && e.key.toLowerCase() === "r" && !restart) {
    stopGame();
    startGame();
  }
});

function init() {
  soundEffects.gamePlaySound.play();
  gameState = "playing";
  startPlayMobile();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  restart = false;
}

function initStart() {
  gameState = "start";
  startPlayMobile();
  canvas = document.getElementById("canvas");
  world = new StartScreen(canvas, keyboard);
}

function initOver() {
  restart = false;
  overWinMobile();
  canvas = document.getElementById("canvas");
  world = new GameOverScreen(canvas, keyboard);
  soundEffects.gameOverSound.play();
}

function initWin() {
  overWinMobile();
  canvas = document.getElementById("canvas");
  world = new GameWinScreen(canvas, keyboard);
  soundEffects.gameWinSound.play();
}

function startPlayMobile() {
  blink("blinker", "start", "startGameOverlay");
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
}

function overWinMobile() {
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
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

function rewindSong() {
  for (let key in soundEffects) {
    if (soundEffects[key] instanceof Audio) {
      soundEffects[key].pause();
      soundEffects[key].currentTime = 0;
    }
  }
}

function muteSound() {
  mute = !mute;
  for (let key in soundEffects) {
    if (soundEffects[key] instanceof Audio) {
      soundEffects[key].volume = mute ? 0 : 1;
    }
  }
}

function startGame() {
  restart = true;
  setTimeout(() => {
    init();
  }, 500);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
  rewindSong();
}
/*
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}
setStoppableInterval(world.run, 500);

function stopGame() {
  intervalIds.forEach(clearInterval);
}*/

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

function toggleFullscreen() {
  let elem = document.getElementById("fullscreen");
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen(elem);
  }
}

function enterFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

window.addEventListener("orientationchange", function () {
  let orientation =
    (window.screen.orientation || {}).type || window.screen.mozOrientation || window.screen.msOrientation;

  if (["landscape-primary", "landscape-secondary"].includes(orientation)) {
    toggleFullscreen();
  } else if (orientation === undefined) {
    console.log("The orientation API isn't supported in this browser :(");
  }
});
