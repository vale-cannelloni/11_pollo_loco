class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "media/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 0;
    this.y = 0;
    this.width = 300;
    this.height = 80;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex(this.percentage)];
    this.img = this.imageCache[path];
  }

  resolveImageIndex(percentage) {
    if (percentage == 100) {
      return 0;
    } else if (percentage >= 80) {
      return 1;
    } else if (percentage >= 60) {
      return 2;
    } else if (percentage >= 40) {
      return 3;
    } else if (percentage >= 20) {
      return 4;
    } else if (percentage >= 0) {
      return 5;
    }
  }
}
