class BackgroundObject extends MovableObject {
  height = 480;
  width = 720;
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = 720 - this.width;
    this.y = 480 - this.height;
  }
}
