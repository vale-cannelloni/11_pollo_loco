class ThrowableObject extends MovableObject {
  offsetYTop = 0;
  offsetX = 0;
  isBroken = false;

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
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATION);

    this.x = 100;
    this.y = 100;
    this.height = 80;
    this.width = 60;
    this.throw(x, y);
    this.animate();
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      if (!this.isBroken) {
        this.x += 10;
      } else {
        clearInterval(this.throwInterval);
      }
    }, 25);
  }

  animate() {
    this.splashInterval = setInterval(() => {
      if (this.isBroken) {
        clearInterval(this.rotateInterval);
        this.playAnimationOnce(this.IMAGES_SPLASH);
      }
    });
    this.rotateInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    });
  }
}
