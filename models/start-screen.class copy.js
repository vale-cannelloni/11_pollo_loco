/**
 * Represents the start screen of the game.
 * Extends DrawableObject to utilize drawable functionality.
 */
class StartScreen extends DrawableObject {
  /** @type {number} The x position of the start screen. */
  x = 0;
  /** @type {number} The y position of the start screen. */
  y = 0;
  /** @type {number} The width of the start screen. */
  width = 960;
  /** @type {number} The height of the start screen. */
  height = 540;
  /** @type {CanvasRenderingContext2D} The 2D rendering context for drawing. */
  ctx;
  /** @type {HTMLCanvasElement} The canvas element the screen is drawn on. */
  canvas;
  /** @type {Object} The keyboard input handler. */
  keyboard;

  /**
   * Creates a new StartScreen instance.
   * @param {HTMLCanvasElement} canvas - The canvas on which the start screen will be drawn.
   * @param {Object} keyboard - An object handling keyboard input.
   */
  constructor(canvas, keyboard) {
    super().loadImage("./media/9_intro_outro_screens/start/startscreen_1.png");
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawStartScreenLoop();
  }

  /**
   * Starts the drawing loop for the start screen using requestAnimationFrame.
   * Continuously clears and redraws the screen.
   */
  drawStartScreenLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMapStart(this);
    let self = this;
    requestAnimationFrame(function () {
      self.drawStartScreenLoop();
    });
  }

  /**
   * Adds the object to the map (start screen layer).
   * @param {StartScreen} mo - The start screen object to draw.
   */
  addToMapStart(mo) {
    mo.drawStartScreen(this.ctx);
  }

  /**
   * Draws the start screen image onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  drawStartScreen(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
