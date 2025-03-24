class Bottle extends DrawableObject {
  offsetYTop = 20;
  offsetX = 40;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x + Math.random() * 700;
    this.y = 325;
    this.width = 100;
    this.height = 100;
  }
}
