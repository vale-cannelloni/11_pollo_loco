class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage(
      "media/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = 100;
    this.y = 100;
    this.height = 80;
    this.width = 60;
    this.throw(x, y);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
