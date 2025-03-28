/**
 * Represents a Chicken enemy that moves and animates within the game.
 * Inherits from the MovableObject class.
 */
class Chicken extends MovableObject {
  /** @type {number} The height of the chicken sprite. */
  height = 100;

  /** @type {number} The width of the chicken sprite. */
  width = 100;

  /** @type {number} The vertical position of the chicken on the canvas. */
  y = 320;

  /** @type {number} The vertical offset for the top collision box. */
  offsetYTop = 20;

  /** @type {number} The horizontal offset for the collision box. */
  offsetX = 0;

  /** @type {boolean} Flag to stop the chicken from walking. */
  stopWalk = false;

  /** @type {string[]} Array of image paths for the walking animation. */
  IMAGES_WALKING = [
    "./media/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./media/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./media/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** @type {string[]} Array of image paths for the death animation. */
  IMAGES_DEATH = ["media/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /** @type {number} The index of the current image in the animation. */
  currentImage = 0;

  /**
   * Creates a new Chicken instance and initializes movement and animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
    this.x = 500 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Starts the movement, animation, and energy-check intervals.
   */
  animate() {
    this.startMovement();
    this.startAnimation();
    this.startEnergyCheck();
  }

  /**
   * Initiates the interval that moves the chicken to the left.
   */
  startMovement() {
    this.moveInterval = setInterval(() => {
      if (this.energy > 0 && !this.stopWalk) {
        this.moveLeft();
      }
    }, 1000 / 60);
    intervalIds.push(this.moveInterval);
  }

  /**
   * Initiates the interval that updates the walking animation.
   */
  startAnimation() {
    this.animationInterval = setInterval(() => {
      if (this.energy > 0 && !this.stopWalk) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
    intervalIds.push(this.animationInterval);
  }

  /**
   * Initiates the interval that checks the chicken's energy to determine death.
   */
  startEnergyCheck() {
    this.energyCheckInterval = setInterval(() => {
      if (this.energy <= 0 && !this.stopWalk) {
        this.deadChicken();
      }
    }, 100);
    intervalIds.push(this.energyCheckInterval);
  }

  /**
   * Stops all intervals and plays the death animation for the chicken.
   */
  deadChicken() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.energyCheckInterval);
    this.playAnimation(this.IMAGES_DEATH);
  }
}
