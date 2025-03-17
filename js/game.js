let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

window.addEventListener("keydown", (e) => {
  let key = e.keyCode;
  if (key == 37) {
    console.log("Left");
  } else if (key == 38) {
    console.log("Up");
  } else if (key == 39) {
    console.log("Right");
  } else if (key == 40) {
    console.log("Down");
  } else if (key == 87) {
    console.log("W");
  } else if (key == 83) {
    console.log("S");
  } else if (key == 65) {
    console.log("A");
  } else if (key == 68) {
    console.log("D");
  } else if (key == 32) {
    console.log("Space");
  }
});
