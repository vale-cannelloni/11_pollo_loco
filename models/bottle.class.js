/**
 * Represents a bottle object that can be drawn on the canvas.
 * Inherits from DrawableObject.
 */
class Bottle extends DrawableObject {
  /**
   * Vertical offset for rendering the top of the bottle.
   * @type {number}
   */
  offsetYTop = 20;

  /**
   * Horizontal offset for rendering the bottle.
   * @type {number}
   */
  offsetX = 30;

  /**
   * Creates a new Bottle instance.
   * @param {string} imagePath - The path to the image used for the bottle.
   * @param {number} x - The base x-coordinate where the bottle will appear. A random value up to 700 is added.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);

    /**
     * The x-coordinate of the bottle's position.
     * Randomized to add variation in placement.
     * @type {number}
     */
    this.x = x + Math.random() * 700;

    /**
     * The y-coordinate of the bottle's position.
     * Fixed position to align with the ground or platform.
     * @type {number}
     */
    this.y = 375;

    /**
     * The width of the bottle.
     * @type {number}
     */
    this.width = 100;

    /**
     * The height of the bottle.
     * @type {number}
     */
    this.height = 100;
  }
}
