/**
 * Global canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents the current world or screen being rendered.
 * @type {World|StartScreen|GameOverScreen|GameWinScreen}
 */
let world;

/**
 * Keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates whether keyboard controls are currently active.
 * @type {boolean}
 */
let keyboardActive = true;

/**
 * Represents the current game state.
 * Possible values: "start", "playing", "gameover"
 * @type {string}
 */
let gameState = "start";

/**
 * Prevents rapid restart when 'R' is pressed.
 * @type {boolean}
 */
let restart = false;

/**
 * Stores interval IDs to allow clearing on game stop.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Mute preference loaded from localStorage.
 * @type {boolean}
 */
let savedMute = localStorage.getItem("mute");

/**
 * Controls whether audio is muted.
 * @type {boolean}
 */
let mute = savedMute === "true";

/**
 * Checks status of screen.
 * @type {string}
 */
let mediaQuery = window.matchMedia("(orientation: portrait)");

/**
 * Standard canvas width.
 * @type {number}
 */
const DEFAULT_WIDTH = 960;

/**
 * Standard canvas height.
 * @type {number}
 */
const DEFAULT_HEIGHT = 540;

/**
 * Prevent spacebar from scrolling the page.
 */
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
});

/**
 * Disable right-click context menu.
 */
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

/**
 * Global keydown handler for starting/restarting the game.
 */
document.addEventListener("keydown", function (e) {
  if (gameState === "start" && e.key === "Enter") {
    init();
  }

  if ((gameState === "gameover" || gameState === "playing") && e.key.toLowerCase() === "r" && !restart) {
    stopGame();
    startGame();
  }
});

/**
 * Sets key flags to true when keys are pressed.
 */
window.addEventListener("keydown", (e) => {
  if (!keyboardActive) return;
  switch (e.keyCode) {
    case 37:
      keyboard.LEFT = true;
      break;
    case 38:
      keyboard.UP = true;
      break;
    case 39:
      keyboard.RIGHT = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 32:
      keyboard.SPACE = true;
      break;
    case 87:
      keyboard.W = true;
      break;
    case 65:
      keyboard.A = true;
      break;
    case 83:
      keyboard.S = true;
      break;
    case 68:
      keyboard.D = true;
      break;
    case 70:
      keyboard.F = true;
      break;
  }
});

/**
 * Sets key flags to false when keys are released.
 */
window.addEventListener("keyup", (e) => {
  if (!keyboardActive) return;
  switch (e.keyCode) {
    case 37:
      keyboard.LEFT = false;
      break;
    case 38:
      keyboard.UP = false;
      break;
    case 39:
      keyboard.RIGHT = false;
      break;
    case 40:
      keyboard.DOWN = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 87:
      keyboard.W = false;
      break;
    case 65:
      keyboard.A = false;
      break;
    case 83:
      keyboard.S = false;
      break;
    case 68:
      keyboard.D = false;
      break;
    case 70:
      keyboard.F = false;
      break;
  }
});

/**
 * Initializes the game and switches to the gameplay screen.
 */
function init() {
  soundEffects.gamePlaySound.play();
  gameState = "playing";
  startPlayMobile();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  restart = false;
}

/**
 * Initializes and displays the start screen.
 */
function initStart() {
  handleOrientationChange(mediaQuery);
  detectMobile();
  for (let key in soundEffects) {
    if (soundEffects[key] instanceof Audio) {
      soundEffects[key].volume = mute ? 0 : 1;
    }
  }
  gameState = "start";
  startPlayMobile();
  canvas = document.getElementById("canvas");
  world = new StartScreen(canvas, keyboard);
}

/**
 * Initializes and displays the game over screen.
 */
function initOver() {
  restart = false;
  overWinMobile();
  canvas = document.getElementById("canvas");
  world = new GameOverScreen(canvas, keyboard);
  soundEffects.gameOverSound.play();
}

/**
 * Initializes and displays the win screen.
 */
function initWin() {
  overWinMobile();
  canvas = document.getElementById("canvas");
  world = new GameWinScreen(canvas, keyboard);
  soundEffects.gameWinSound.play();
}

/**
 * Sets up mobile controls and screen overlays during play.
 */
function startPlayMobile() {
  blink("blinker", "start", "startGameOverlay");
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
}

/**
 * Sets up mobile overlays and buttons for endgame states.
 */
function overWinMobile() {
  blink("blinkerOver", "gameover", "restartGameOverlay");
  showButtons();
}

/**
 * Shows or hides mobile control buttons based on game state.
 */
function showButtons() {
  const mobileButton = document.getElementById("mobileButtons");
  if (!mobileButton) return;
  mobileButton.style.visibility = gameState === "playing" ? "visible" : "hidden";
}

/**
 * Stops all playing audio and rewinds to start.
 */
function rewindSong() {
  for (let key in soundEffects) {
    if (soundEffects[key] instanceof Audio) {
      soundEffects[key].pause();
      soundEffects[key].currentTime = 0;
    }
  }
}

/**
 * Toggles sound on/off and saves setting in localStorage.
 */
function muteSound() {
  mute = !mute;
  localStorage.setItem("mute", mute);
  for (let key in soundEffects) {
    if (soundEffects[key] instanceof Audio) {
      soundEffects[key].volume = mute ? 0 : 1;
    }
  }
}

/**
 * Restarts the game after a short delay.
 */
function startGame() {
  restart = true;
  setTimeout(() => {
    init();
  }, 500);
}

/**
 * Stops the game by clearing intervals and audio.
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
  rewindSong();
}

/**
 * Simulates a keydown event for the specified key code.
 * @param {number} keyCode
 */
function simulateKeyDown(keyCode) {
  let event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, "keyCode", { value: keyCode });
  Object.defineProperty(event, "which", { value: keyCode });
  document.dispatchEvent(event);
}

/**
 * Simulates a keyup event for the specified key code.
 * @param {number} keyCode
 */
function simulateKeyUp(keyCode) {
  let event = new KeyboardEvent("keyup", {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, "keyCode", { value: keyCode });
  Object.defineProperty(event, "which", { value: keyCode });
  document.dispatchEvent(event);
}

/**
 * Creates a blinking effect on a given element while in the specified game state.
 * @param {string} blinkerId - The ID of the blinking element.
 * @param {string} state - The game state during which to blink.
 * @param {string} overlayId - The ID of the overlay element.
 */
function blink(blinkerId, state, overlayId) {
  let blinker = document.getElementById(blinkerId);
  let overlay = document.getElementById(overlayId);
  overlay.style.visibility = "visible";

  if (gameState === state) {
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

/**
 * Toggles between fullscreen and normal mode.
 */
function toggleFullscreen() {
  let elem = document.getElementById("fullscreen");
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen(elem);
  }
}

/**
 * Enters fullscreen mode for a given element.
 * @param {HTMLElement} el
 */
function enterFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
  setTimeout(resizeCanvasToFullscreen, 100);
}

/**
 * Resizes the canvas to match fullscreen window size.
 */
function enterFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
  setTimeout(resizeCanvasToFullscreen, 100);
}

/**
 * Resizes the canvas to match fullscreen window size.
 */
function resizeCanvasToFullscreen() {
  let canvasGame = document.getElementById("fullscreen");
  canvasGame.width = window.innerWidth;
  canvasGame.height = window.innerHeight;
}

/**
 * Exits fullscreen mode and resets canvas to default size.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  setTimeout(() => {
    let canvasGame = document.getElementById("fullscreen");
    canvasGame.width = DEFAULT_WIDTH;
    canvasGame.height = DEFAULT_HEIGHT;
  }, 100);
}
/**
 * Checks whether device is in landscape or portrait mode on page load.
 *  * @param {HTMLElement} e
 */
function handleOrientationChange(e) {
  let landscape = document.getElementById("landscapeOverlay");
  let portrait = e.matches;
  if (portrait) {
    landscape.style.display = "block";
  } else {
    landscape.style.display = "none";
  }
}

/**
 * Event listener checking on change of screen whether landscape or portrait mode is selected.
 */
mediaQuery.addEventListener("change", handleOrientationChange);

/**
 * Checks whether the user is on a mobile device based on the user agent string.
 *
 * @returns {boolean} True if the user is on a mobile device, false otherwise.
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detects on initStart() whether user is on mobile device or not
 */
function detectMobile() {
  let mobileTitle = document.getElementById("gameTitle");
  let mobileInstructions = document.getElementById("gameInstructions");
  if (isMobileDevice()) {
    mobileInstructions.style.display = "none";
    mobileTitle.style.display = "none";
  }
}
