/**
 * Represents a collectible coin object in the game, extending DrawableObject.
 * The coin is initialized with a random position offset to create variation.
 */
class Coin extends DrawableObject {
  /**
   * Vertical offset from the top of the canvas.
   * @type {number}
   */
  offsetYTop = 50;

  /**
   * Horizontal offset from the left of the canvas.
   * @type {number}
   */
  offsetX = 50;

  /**
   * Creates a new Coin instance.
   * @param {string} imagePath - The path to the coin's image.
   * @param {number} x - The initial x-coordinate base value.
   * @param {number} y - The initial y-coordinate base value.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);

    /**
     * The x-coordinate of the coin, with a random offset.
     * @type {number}
     */
    this.x = x + Math.random() * 700;

    /**
     * The y-coordinate of the coin, with a random offset.
     * @type {number}
     */
    this.y = y - Math.random() * 300;

    /**
     * The width of the coin image.
     * @type {number}
     */
    this.width = 200;

    /**
     * The height of the coin image.
     * @type {number}
     */
    this.height = 200;
  }
}
