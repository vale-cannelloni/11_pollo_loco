class Coin extends DrawableObject {
  offsetYTop = 50;
  offsetX = 50;
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x + Math.random() * 700;
    this.y = y - Math.random() * 300;
    this.width = 200;
    this.height = 200;
  }
}
