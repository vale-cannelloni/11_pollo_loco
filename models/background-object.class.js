/**
 * Represents a background object in the game that can be moved.
 * Extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
  /**
   * The height of the background object.
   * @type {number}
   */
  height = 540;

  /**
   * The width of the background object.
   * @type {number}
   */
  width = 960;

  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The path to the image file used for the background.
   * @param {number} x - The initial x-coordinate position of the background.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;

    /**
     * The y-coordinate position of the background object.
     * Positioned based on canvas height minus object height.
     * @type {number}
     */
    this.y = 540 - this.height;
  }
}
