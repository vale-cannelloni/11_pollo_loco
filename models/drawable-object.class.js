/**
 * Represents a drawable object with image loading and rendering capabilities.
 * Intended as a base class for characters, enemies, and other entities.
 */
class DrawableObject {
  /** @type {HTMLImageElement} */
  img;

  /**
   * Cache for loaded images to optimize performance.
   * @type {Object<string, HTMLImageElement>}
   */
  imageCache = {};

  /** @type {number} Index or identifier for the current image */
  currentImage = 0;

  /** @type {number} Horizontal position on the canvas */
  x = 120;

  /** @type {number} Vertical position on the canvas */
  y;

  /** @type {number} Height of the image/object */
  height = 150;

  /** @type {number} Width of the image/object */
  width = 100;

  /**
   * Loads a single image into the object.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on a given 2D rendering context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Preloads multiple images and stores them in the cache.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws a blue rectangle frame around the object (for debugging/visualization).
   * Only applies to specific instance types (Character, Endboss, ThrowableObject).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws a red rectangle representing the hitbox of the object.
   * Only applies to specific instance types (Character, Endboss, ThrowableObject).
   * Requires that `offsetX`, `offsetYTop` properties exist on the instance.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawHitBox(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offsetX,
        this.y + this.offsetYTop,
        this.width - this.offsetX - this.offsetX,
        this.height - this.offsetYTop
      );
      ctx.stroke();
    }
  }
}
