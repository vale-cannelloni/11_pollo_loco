/**
 * Represents a movable object that can interact with gravity, collisions,
 * animations, and damage. Inherits from DrawableObject.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {number} The horizontal movement speed of the object. */
  speed = 0.15;

  /** @type {boolean} Determines the facing direction of the object. */
  otherDirection = false;

  /** @type {number} The current vertical speed. Used for jumping and falling. */
  speedY = 0;

  /** @type {number} The acceleration applied for gravity effects. */
  accelleration = 2.5;

  /** @type {number} The current energy or health of the object. */
  energy = 100;

  /** @type {number} Timestamp of the last time this object was hit. */
  lastHit = 0;

  /**
   * Applies gravity to the object by updating its vertical position and speed.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelleration;
      }
    }, 1000 / 25);
    intervalIds.push(this.gravityInterval);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 172;
    }
  }

  /**
   * Checks for a collision with another movable object.
   * @param {MovableObject} mo - Another movable object to check against.
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + (this.width - this.offsetX) >= mo.x &&
      this.x + this.offsetX <= mo.x + mo.width &&
      this.y + this.height >= mo.y &&
      this.y <= mo.y + mo.height
    );
  }

  /**
   * Checks if the object is close enough to collide with an endboss.
   * @param {MovableObject} mo - Endboss object.
   * @returns {boolean}
   */
  isCollidingEndboss(mo) {
    return this.x + 400 >= mo.x;
  }

  /**
   * Checks if the object is collecting an item (e.g., coins or power-ups).
   * @param {MovableObject} mo - The item to check for collection.
   * @returns {boolean}
   */
  isCollecting(mo) {
    return (
      this.x + (this.width - this.offsetX) >= mo.x + mo.offsetX &&
      this.x + this.offsetX <= mo.x + (mo.width - mo.offsetX) &&
      this.y + this.height >= mo.y &&
      this.y + this.offsetYTop <= mo.y + (mo.height - mo.offsetYTop)
    );
  }

  /**
   * Checks if this object is landing on top of another object (like an enemy).
   * @param {MovableObject} mo - The object being landed on.
   * @returns {boolean}
   */
  isLandingOnTopOf(mo) {
    let thresholdY = 50;
    let bottomOfCharacter = this.y + this.height;
    let topOfEnemy = mo.y;

    let isWithinXBounds =
      this.x + (this.width - this.offsetX) > mo.x && this.x + this.offsetX < mo.x + mo.width;

    let isAboveWithThreshold =
      bottomOfCharacter >= topOfEnemy && bottomOfCharacter <= topOfEnemy + thresholdY;
    if (isWithinXBounds && isAboveWithThreshold) {
      return true;
    }
  }

  /**
   * Applies damage to the object.
   * @param {number} damage - The amount of energy to subtract.
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean}
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Temporarily pushes the object back (usually after a hit).
   */
  pushBack() {
    if (this.x > 0 && !this.isBeingPushedBack) {
      this.isBeingPushedBack = true;
      let pushInterval = setInterval(() => {
        this.x -= 7;
        if (this.x <= 0) {
          this.x = 0;
          clearInterval(pushInterval);
          this.isBeingPushedBack = false;
        }
      }, 50);
      setTimeout(() => {
        clearInterval(pushInterval);
        this.isBeingPushedBack = false;
      }, 1000);
    }
  }

  /**
   * Stops the object's movement. Can be customized later.
   * @returns {boolean}
   */
  stopMovement() {
    return true;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays a looping animation from a given list of image paths.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation once from a given list of image paths.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimationOnce(images) {
    let i = 0;
    this.animationInterval = setInterval(() => {
      let path = images[i];
      this.img = this.imageCache[path];
      i++;
      if (i > images.length) {
        clearInterval(this.animationInterval);
        this.img = this.imageCache[images[images.length - 1]];
      }
    }, 100);
  }

  /**
   * Makes the object jump by setting a vertical speed.
   * @param {number} jumpSpeed - The initial vertical speed for the jump.
   */
  jump(jumpSpeed) {
    this.speedY = jumpSpeed;
    soundEffects.jumpSound.play();
  }
}
