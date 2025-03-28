/**
 * Class representing a status bar for displaying health.
 * Extends DrawableObject and visually updates based on percentage of health.
 */
class StatusBar extends DrawableObject {
  /**
   * Array of image paths representing different health levels.
   * @type {string[]}
   */
  IMAGES_HEALTH = [
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];

  /**
   * The current health percentage.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of StatusBar and initializes the default state.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 0;
    this.y = 0;
    this.width = 300;
    this.height = 80;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage and updates the image accordingly.
   * @param {number} percentage - The new health percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex(this.percentage)];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current health percentage.
   * @param {number} percentage - The current health percentage.
   * @returns {number} Index of the image in IMAGES_HEALTH.
   */
  resolveImageIndex(percentage) {
    if (percentage == 100) {
      return 0;
    } else if (percentage <= 99 && percentage >= 75) {
      return 1;
    } else if (percentage <= 74 && percentage >= 50) {
      return 2;
    } else if (percentage <= 49 && percentage >= 25) {
      return 3;
    } else if (percentage <= 24 && percentage >= 1) {
      return 4;
    } else if (percentage == 0) {
      return 5;
    }
  }
}
