/**
 * Represents a throwable object, such as a salsa bottle, that can be thrown and animated.
 * Extends from MovableObject, inheriting position and movement behavior.
 */
class ThrowableObject extends MovableObject {
  /** @type {number} Vertical offset from the top */
  offsetYTop = 0;

  /** @type {number} Horizontal offset */
  offsetX = 0;

  /** @type {boolean} Indicates whether the object has broken (e.g., after impact) */
  isBroken = false;

  /**
   * @type {string[]}
   * Image paths used to animate the rotation of the object while in motion
   */
  IMAGES_ROTATION = [
    "media/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "media/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "media/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "media/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * @type {string[]}
   * Image paths used to animate the splash effect after the object breaks
   */
  IMAGES_SPLASH = [
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "media/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject at the given coordinates.
   * Initializes images, sets default dimensions, starts the throw and animation.
   *
   * @param {number} x - The initial horizontal position
   * @param {number} y - The initial vertical position
   */
  constructor(x, y) {
    super().loadImage("media/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATION);

    this.x = 100;
    this.y = 100;
    this.height = 80;
    this.width = 60;
    this.throw(x, y);
    this.animate();
  }

  /**
   * Initiates the throwing motion of the object with simulated gravity.
   * Moves the object horizontally and sets up the physics update loop.
   *
   * @param {number} x - The starting x-coordinate
   * @param {number} y - The starting y-coordinate
   */
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
        clearInterval(this.gravityInterval);
      }
    }, 25);
  }

  /**
   * Handles animation of the object during flight and upon breaking.
   * Rotates the object continuously while unbroken, and plays splash animation once if broken.
   */
  animate() {
    this.splashInterval = setInterval(() => {
      if (this.isBroken) {
        clearInterval(this.rotateInterval);
        this.playAnimationOnce(this.IMAGES_SPLASH);
      }
    }, 100);

    this.rotateInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 100);
  }
}
