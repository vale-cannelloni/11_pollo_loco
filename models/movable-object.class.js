class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelleration;
      }
    }, 1000 / 25);
    intervalIds.push(this.gravityInterval);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 120;
    }
  }

  isColliding(mo) {
    return (
      this.x + (this.width - this.offsetX) >= mo.x &&
      this.x + this.offsetX <= mo.x + mo.width &&
      this.y + this.height >= mo.y &&
      this.y <= mo.y + mo.height
    );
  }

  isCollidingEndboss(mo) {
    return this.x + 400 >= mo.x;
  }

  isCollecting(mo) {
    return (
      this.x + (this.width - this.offsetX) >= mo.x + mo.offsetX &&
      this.x + this.offsetX <= mo.x + (mo.width - mo.offsetX) &&
      this.y + this.height >= mo.y &&
      this.y + this.offsetYTop <= mo.y + (mo.height - mo.offsetYTop)
    );
  }

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

  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

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

  stopMovement() {
    return true;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

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

  jump(jumpSpeed) {
    this.speedY = jumpSpeed;
    soundEffects.jumpSound.play();
  }
}
