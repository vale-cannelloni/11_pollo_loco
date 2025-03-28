/**
 * CoinBar class represents a status bar that displays the amount of collected coins
 * using different image stages. It extends DrawableObject to handle rendering.
 */
class CoinBar extends DrawableObject {
  /**
   * Array of image paths for each coin amount stage (0 to 5).
   * @type {string[]}
   */
  IMAGES_COIN = [
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * Current amount of coins collected (0–5).
   * @type {number}
   */
  coinAmount = 0;

  /**
   * Creates a new CoinBar instance and initializes its position, size,
   * and default image based on 0 coins.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.x = 0;
    this.y = 55;
    this.width = 300;
    this.height = 80;
    this.setCoinAmount(0);
  }

  /**
   * Sets the current amount of coins and updates the image accordingly.
   * @param {number} coinAmount - The current coin amount (expected range: 0–5).
   */
  setCoinAmount(coinAmount) {
    this.coinAmount = coinAmount;
    let path = this.IMAGES_COIN[this.resolveImageCoin(this.coinAmount)];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves which image index corresponds to the given coin amount.
   * @param {number} coinAmount - The current coin amount (0–5).
   * @returns {number} Index of the image in IMAGES_COIN array.
   */
  resolveImageCoin(coinAmount) {
    if (coinAmount == 0) {
      return 0;
    } else if (coinAmount == 1) {
      return 1;
    } else if (coinAmount == 2) {
      return 2;
    } else if (coinAmount == 3) {
      return 3;
    } else if (coinAmount == 4) {
      return 4;
    } else if (coinAmount == 5) {
      return 5;
    }
  }
}
