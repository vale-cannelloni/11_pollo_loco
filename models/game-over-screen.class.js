/**
 * Class representing the Game Over screen.
 * Extends DrawableObject to utilize image rendering capabilities.
 */
class GameOverScreen extends DrawableObject {
  /** @type {number} X coordinate of the image on canvas */
  x = 0;

  /** @type {number} Y coordinate of the image on canvas */
  y = 0;

  /** @type {number} Width of the image */
  width = 720;

  /** @type {number} Height of the image */
  height = 480;

  /** @type {CanvasRenderingContext2D} Rendering context of the canvas */
  ctx;

  /** @type {HTMLCanvasElement} The canvas element */
  canvas;

  /** @type {Object} Keyboard input handler (optional/external usage) */
  keyboard;

  /**
   * Creates a new GameOverScreen instance.
   * Loads the game over image and starts the drawing loop.
   */
  constructor() {
    super().loadImage("./media/9_intro_outro_screens/game_over/game over!.png");
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawGameOverLoop();
  }

  /**
   * Continuously draws the Game Over screen using requestAnimationFrame.
   * Clears the previous frame and redraws the image.
   */
  drawGameOverLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMapOver(this);
    let self = this;
    requestAnimationFrame(function () {
      self.drawGameOverLoop();
    });
  }

  /**
   * Adds the object to the canvas by calling its draw method.
   * @param {DrawableObject} mo - The drawable object to render.
   */
  addToMapOver(mo) {
    mo.drawOverScreen(this.ctx);
  }

  /**
   * Draws the Game Over image onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawOverScreen(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
