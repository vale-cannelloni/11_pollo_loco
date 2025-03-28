/**
 * Represents the status bar showing the number of collected bottles.
 * Extends the DrawableObject class to make use of drawing capabilities.
 */
class BottleBar extends DrawableObject {
  /**
   * Array of image paths representing the different bottle fill states.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "media/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "media/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "media/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "media/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "media/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "media/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Current amount of collected bottles (0–10).
   * @type {number}
   */
  bottleAmount = 0;

  /**
   * Creates a new BottleBar instance and initializes its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 0;
    this.y = 110;
    this.width = 300;
    this.height = 80;
    this.setBottleAmount(0);
  }

  /**
   * Sets the number of bottles and updates the displayed image accordingly.
   * @param {number} bottleAmount - The number of bottles collected (0–10).
   */
  setBottleAmount(bottleAmount) {
    this.bottleAmount = bottleAmount;
    const path = this.IMAGES_BOTTLE[this.resolveImageBottle(this.bottleAmount)];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the bottle amount.
   * @param {number} bottleAmount - The number of bottles collected.
   * @returns {number} Index of the corresponding image in IMAGES_BOTTLE.
   */
  resolveImageBottle(bottleAmount) {
    if (bottleAmount === 0) {
      return 0;
    } else if (bottleAmount >= 1 && bottleAmount < 3) {
      return 1;
    } else if (bottleAmount >= 3 && bottleAmount < 5) {
      return 2;
    } else if (bottleAmount >= 5 && bottleAmount < 7) {
      return 3;
    } else if (bottleAmount >= 7 && bottleAmount < 9) {
      return 4;
    } else if (bottleAmount >= 9 && bottleAmount <= 10) {
      return 5;
    }
  }
}
