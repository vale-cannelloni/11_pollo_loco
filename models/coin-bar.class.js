class CoinBar extends DrawableObject {
  IMAGES_COIN = [
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "media/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  coinAmount = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.x = 0;
    this.y = 55;
    this.width = 300;
    this.height = 80;
    this.setCoinAmount(0);
  }

  setCoinAmount(coinAmount) {
    this.coinAmount = coinAmount;
    let path = this.IMAGES_COIN[this.resolveImageCoin(this.coinAmount)];
    this.img = this.imageCache[path];
  }

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
