/**
 * Class representing the health bar of the end boss.
 * Extends the DrawableObject to inherit drawing functionality.
 */
class BossBar extends DrawableObject {
  /**
   * Array of image paths representing various health states.
   * @type {string[]}
   */
  IMAGES_HEALTH = [
    "./media/7_statusbars/2_statusbar_endboss/green/green100.png",
    "./media/7_statusbars/2_statusbar_endboss/green/green80.png",
    "./media/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./media/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./media/7_statusbars/2_statusbar_endboss/green/green20.png",
    "./media/7_statusbars/2_statusbar_endboss/green/green0.png",
  ];

  /**
   * Current health percentage of the boss.
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructs a new BossBar object, sets its position and loads initial images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 650;
    this.y = 10;
    this.width = 300;
    this.height = 80;
    this.setPercentage(100);
  }

  /**
   * Updates the health bar to reflect the current health percentage.
   * @param {number} percentage - The new health percentage (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex(this.percentage)];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the current percentage.
   * @param {number} percentage - The current health percentage.
   * @returns {number} The index corresponding to the image in IMAGES_HEALTH.
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
