class ThrowableObject extends MovableObject {
  offsetYTop = 0;
  offsetX = 0;

  IMAGES_ROTATION = [
    "media/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "media/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "media/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "media/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

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
