/**
 * Represents the game world including the player, enemies, environment, and logic.
 */
class World {
  character = initCharacter();
  level = initLevel();
  levelEndboss = this.level.endBoss[0];
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bossBar = new BossBar();
  throwableObjects = [];
  coinCount = 0;
  bottleCount = 0;

  bossTrigger = false;
  triggerBossBar = false;

  /**
   * Initializes the world, canvas, and keyboard input.
   * @param {HTMLCanvasElement} canvas - The canvas where the game is rendered.
   * @param {Object} keyboard - Keyboard input state.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the current world reference in the character object.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the game loop for collision detection, interactions, and movement logic.
   */
  run() {
    let runInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.collectCoins();
      this.collectBottles();
      this.bottleCollision();
      this.checkTouch();
      this.chickenWalk();
      this.endbossWalk();
    }, 50);
    intervalIds.push(runInterval);
  }

  /**
   * Checks for collision between the character and the endboss to trigger boss fight.
   */
  checkTouch() {
    this.level.endBoss.forEach((boss) => {
      if (this.triggerBossBar) return;

      if (this.character.isCollidingEndboss(boss)) {
        boss.angry = true;
        rewindSong();
        this.triggerBossBar = true;
        this.character.blockMoves = true;

        setTimeout(() => {
          soundEffects.bossBattleSound.play();
        }, 1000);

        setTimeout(() => {
          boss.angry = false;
          this.character.blockMoves = false;
          soundEffects.endbossSound.play();
        }, 1500);
      }
    });
  }

  /**
   * Handles throwing bottles if conditions are met.
   */
  checkThrowObjects() {
    if (
      this.keyboard.F &&
      this.bottleCount !== 0 &&
      this.character.energy !== 0 &&
      !this.character.blockMoves &&
      !this.levelEndboss.hasPlayedDead
    ) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottleCount -= 1;
      this.bottleBar.setBottleAmount(this.bottleCount);
      this.keyboard.F = false;
    }
  }

  /**
   * Checks for collisions with all enemies and the endboss.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
    this.level.endBoss.forEach((boss) => this.handleBossCollision(boss));
  }

  /**
   * Handles character collision with an enemy.
   * @param {Object} enemy - The enemy to check collision against.
   */
  handleEnemyCollision(enemy) {
    if (!this.character.isColliding(enemy) || enemy.energy === 0) return;

    if (this.character.isLandingOnTopOf(enemy)) {
      soundEffects.killSound.play();
      enemy.hit(100);
    } else if (this.character.energy !== 0) {
      this.applyCharacterDamage(5);
    }
  }

  /**
   * Handles character collision with the boss.
   * @param {Object} boss - The boss to check collision against.
   */
  handleBossCollision(boss) {
    if (this.character.isColliding(boss) && this.character.energy !== 0 && boss.energy !== 0) {
      this.applyCharacterDamage(10);
    }
  }

  /**
   * Applies damage to the character and updates the status bar.
   * @param {number} amount - The amount of damage to apply.
   */
  applyCharacterDamage(amount) {
    this.character.hit(amount);
    soundEffects.charHit.play();
    this.statusBar.setPercentage(this.character.energy);
    if (this.character.energy > 15) {
      this.character.pushBack();
    }
  }

  /**
   * Collects all nearby coins.
   */
  collectCoins() {
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isCollecting(coin)) {
        soundEffects.coinSound.play();
        this.level.coins.splice(i, 1);
        this.coinCount++;
        this.coinBar.setCoinAmount(this.coinCount);
      }
    }
  }

  /**
   * Collects all nearby bottles.
   */
  collectBottles() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      let bottle = this.level.bottles[i];
      if (this.character.isCollecting(bottle)) {
        soundEffects.takeSound.play();
        this.level.bottles.splice(i, 1);
        this.bottleCount++;
        this.bottleBar.setBottleAmount(this.bottleCount);
      }
    }
  }

  /**
   * Checks for collisions between thrown bottles and enemies/boss.
   */
  bottleCollision() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      let hitter = this.throwableObjects[i];
      if (hitter.hasHit) continue;
      if (this.checkEnemyCollision(hitter)) continue;
      this.checkEndBossCollision(hitter);
    }
  }

  /**
   * Checks if a throwable object hits any enemy.
   * @param {Object} hitter - The throwable object.
   * @returns {boolean} True if an enemy was hit.
   */
  checkEnemyCollision(hitter) {
    for (let enemy of this.level.enemies) {
      if (hitter.isCollecting(enemy) && enemy.energy !== 0 && !hitter.hasHit) {
        soundEffects.killSound.play();
        enemy.hit(100);
        this.registerHit(hitter);
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a throwable object hits the boss.
   * @param {Object} hitter - The throwable object.
   * @returns {boolean} True if boss was hit.
   */
  checkEndBossCollision(hitter) {
    for (let boss of this.level.endBoss) {
      if (hitter.isCollecting(boss) && boss.energy !== 0 && !hitter.hasHit) {
        soundEffects.killSound.play();
        boss.hit(20);
        this.bossBar.setPercentage(boss.energy);
        this.registerHit(hitter);
        return true;
      }
    }
    return false;
  }

  /**
   * Marks a throwable object as hit and schedules it for removal.
   * @param {Object} hitter - The object that hit something.
   */
  registerHit(hitter) {
    hitter.hasHit = true;
    hitter.isBroken = true;
    this.imageRemoval(hitter, this.throwableObjects);
  }

  /**
   * Removes an image object from a given array after a delay.
   * @param {Object} imageRemove - The object to remove.
   * @param {Array} removearray - The array to remove it from.
   */
  imageRemoval(imageRemove, removearray) {
    setTimeout(() => {
      const index = removearray.indexOf(imageRemove);
      if (index !== -1) removearray.splice(index, 1);
    }, 1000);
  }

  /**
   * Main render function that draws the world on each frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.triggerBossBar) this.addToMap(this.bossBar);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.endBoss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds multiple objects to the canvas map.
   * @param {Array} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single object to the canvas, handling flipped images.
   * @param {Object} mo - Movable object.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips an image horizontally.
   * @param {Object} mo - Movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Restores image orientation after flip.
   * @param {Object} mo - Movable object to restore.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }

  /**
   * Stops enemy movement if the character is dead.
   */
  chickenWalk() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.energy <= 0) {
        enemy.stopWalk = true;
      }
    });
  }

  /**
   * Stops boss movement if the character is dead.
   */
  endbossWalk() {
    this.level.endBoss.forEach((boss) => {
      if (this.character.energy <= 0) {
        boss.stopWalk = true;
      }
    });
  }
}
