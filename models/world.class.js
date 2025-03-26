class World {
  character = new Character();
  level = level1;
  levelEndboss = level1.endBoss[0];
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
  endbossSound = new Audio(
    "https://static.wikia.nocookie.net/soundeffects/images/b/b8/Godzilla_1962-1975_SFX.ogg"
  );
  coinSound = new Audio("./media/sound/smb_coin.wav");
  killSound = new Audio("./media/sound/smb_stomp.wav");
  takeSound = new Audio("./media/sound/smb_kick.wav");
  charHit = new Audio("./media/sound/smb2_damage.wav");
  bossTrigger = false;
  triggerBossBar = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.collectCoins();
      this.collectBottles();
      this.bottleCollision();
      this.checkTouch();
      this.chickenWalk();
    }, 50);
  }

  checkTouch() {
    this.level.endBoss.forEach((boss) => {
      if (this.triggerBossBar) {
        return;
      } else if (this.character.isCollidingEndboss(boss)) {
        boss.angry = true;
        this.triggerBossBar = true;
        this.character.blockMoves = true;
        setTimeout(() => {
          boss.angry = false;
          this.character.blockMoves = false;
          this.endbossSound.play();
        }, 1500);
        setTimeout;
      }
    });
  }

  checkThrowObjects() {
    if (
      this.keyboard.F &&
      this.bottleCount != 0 &&
      this.character.energy != 0 &&
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

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.energy !== 0) {
        if (this.character.isLandingOnTopOf(enemy)) {
          this.killSound.play();
          enemy.hit(100);
        } else if (this.character.energy !== 0) {
          this.character.hit(5);
          this.charHit.play();
          this.statusBar.setPercentage(this.character.energy);
          this.character.pushBack();
        }
      }
    });
  }

  collectCoins() {
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isCollecting(coin)) {
        this.coinSound.play();
        this.level.coins.splice(i, 1);
        this.coinCount = this.coinCount + 1;
        this.coinBar.setCoinAmount(this.coinCount);
      }
    }
  }

  collectBottles() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      let bottle = this.level.bottles[i];
      if (this.character.isCollecting(bottle)) {
        this.takeSound.play();
        this.level.bottles.splice(i, 1);
        this.bottleCount = this.bottleCount + 1;
        this.bottleBar.setBottleAmount(this.bottleCount);
      }
    }
  }

  bottleCollision() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      let hitter = this.throwableObjects[i];
      if (hitter.hasHit) continue;
      for (let indexEnemy = 0; indexEnemy < this.level.enemies.length; indexEnemy++) {
        let enemy = this.level.enemies[indexEnemy];
        if (hitter.isCollecting(enemy) && enemy.energy !== 0 && !hitter.hasHit) {
          this.killSound.play();
          enemy.hit(100);
          hitter.hasHit = true;
          hitter.isBroken = true;
          this.imageRemoval(hitter, this.throwableObjects);
          break;
        }
      }
      if (!hitter.hasHit) {
        for (let indexEnd = 0; indexEnd < this.level.endBoss.length; indexEnd++) {
          let end = this.level.endBoss[indexEnd];
          if (hitter.isCollecting(end) && end.energy !== 0 && !hitter.hasHit) {
            this.killSound.play();
            end.hit(20);
            this.bossBar.setPercentage(end.energy);
            hitter.hasHit = true;
            hitter.isBroken = true;
            this.imageRemoval(hitter, this.throwableObjects);
            break;
          }
        }
      }
    }
  }

  imageRemoval(imageRemove, removearray) {
    setTimeout(() => {
      let indexRemove = removearray.indexOf(imageRemove);
      if (indexRemove !== -1) {
        removearray.splice(indexRemove, 1);
      }
    }, 1000);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (this.triggerBossBar) {
      this.addToMap(this.bossBar);
    }

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.endBoss);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    //mo.drawFrame(this.ctx);

    //mo.drawHitBox(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  chickenWalk() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.energy <= 0) {
        enemy.stopWalk = true;
      }
    });
  }
}
