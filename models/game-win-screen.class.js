/**
 * Represents the Game Win screen displayed when the player wins.
 * Extends DrawableObject to gain drawing capabilities.
 */
class GameWinScreen extends DrawableObject {
  /** @type {number} The X position of the win screen image. */
  x = 60;

  /** @type {number} The Y position of the win screen image. */
  y = 165;

  /** @type {number} The width of the win screen image. */
  width = 600;

  /** @type {number} The height of the win screen image. */
  height = 150;

  /** @type {CanvasRenderingContext2D} The canvas rendering context. */
  ctx;

  /** @type {HTMLCanvasElement} The canvas element used to render the image. */
  canvas;

  /** @type {Object} The keyboard input handler (if applicable). */
  keyboard;

  /**
   * Creates a new GameWinScreen instance, sets up rendering context and starts the draw loop.
   */
  constructor() {
    super().loadImage("./media/You won, you lost/You Won B.png");

    /** @type {HTMLCanvasElement} canvas must be globally accessible for this to work. */
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.drawGameWinLoop();
  }

  /**
   * Continuously clears and redraws the win screen using requestAnimationFrame.
   */
  drawGameWinLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMapWin(this);
    let self = this;
    requestAnimationFrame(function () {
      self.drawGameWinLoop();
    });
  }

  /**
   * Adds the win screen object to the map for drawing.
   * @param {GameWinScreen} mo - The win screen object to draw.
   */
  addToMapWin(mo) {
    mo.drawWinScreen(this.ctx);
  }

  /**
   * Draws the win screen image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawWinScreen(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
