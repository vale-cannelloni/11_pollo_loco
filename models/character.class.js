class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 120;
  x = 50;
  speed = 5;
  offsetYTop = 100;
  offsetX = 50;
  isBeingPushedBack = false;
  blockMoves = false;
  stepsSound = new Audio("https://noproblo.dayjo.org/zeldasounds/OOT/OOT_Steps_Dirt6.wav");
  gameOver = new Audio("./media/sound/smb_mariodie.wav");
  snoring = new Audio("https://noproblo.dayjo.org/zeldasounds/OOT/OOT_Talon_Snore.wav");
  deathStarted = false;
  deathAnimationPlayed = false;
  deathImage = new Image();

  IMAGES_WALKING = [
    "./media/2_character_pepe/2_walk/W-21.png",
    "./media/2_character_pepe/2_walk/W-22.png",
    "./media/2_character_pepe/2_walk/W-23.png",
    "./media/2_character_pepe/2_walk/W-24.png",
    "./media/2_character_pepe/2_walk/W-25.png",
    "./media/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "./media/2_character_pepe/3_jump/J-31.png",
    "./media/2_character_pepe/3_jump/J-32.png",
    "./media/2_character_pepe/3_jump/J-33.png",
    "./media/2_character_pepe/3_jump/J-34.png",
    "./media/2_character_pepe/3_jump/J-35.png",
    "./media/2_character_pepe/3_jump/J-36.png",
    "./media/2_character_pepe/3_jump/J-37.png",
    "./media/2_character_pepe/3_jump/J-38.png",
    "./media/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./media/2_character_pepe/5_dead/D-51.png",
    "./media/2_character_pepe/5_dead/D-52.png",
    "./media/2_character_pepe/5_dead/D-53.png",
    "./media/2_character_pepe/5_dead/D-54.png",
    "./media/2_character_pepe/5_dead/D-55.png",
    "./media/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = [
    "./media/2_character_pepe/4_hurt/H-41.png",
    "./media/2_character_pepe/4_hurt/H-42.png",
    "./media/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "./media/2_character_pepe/1_idle/idle/I-1.png",
    "./media/2_character_pepe/1_idle/idle/I-2.png",
    "./media/2_character_pepe/1_idle/idle/I-3.png",
    "./media/2_character_pepe/1_idle/idle/I-4.png",
    "./media/2_character_pepe/1_idle/idle/I-5.png",
    "./media/2_character_pepe/1_idle/idle/I-6.png",
    "./media/2_character_pepe/1_idle/idle/I-7.png",
    "./media/2_character_pepe/1_idle/idle/I-8.png",
    "./media/2_character_pepe/1_idle/idle/I-9.png",
    "./media/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "./media/2_character_pepe/1_idle/long_idle/I-11.png",
    "./media/2_character_pepe/1_idle/long_idle/I-12.png",
    "./media/2_character_pepe/1_idle/long_idle/I-13.png",
    "./media/2_character_pepe/1_idle/long_idle/I-14.png",
    "./media/2_character_pepe/1_idle/long_idle/I-15.png",
    "./media/2_character_pepe/1_idle/long_idle/I-16.png",
    "./media/2_character_pepe/1_idle/long_idle/I-17.png",
    "./media/2_character_pepe/1_idle/long_idle/I-18.png",
    "./media/2_character_pepe/1_idle/long_idle/I-19.png",
    "./media/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  constructor() {
    super().loadImage("./media/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);

    this.animate();

    this.applyGravity();
  }
  animate() {
    this.lastActivityTime = Date.now();
    this.startMovementLoop();
    this.startAnimationLoop();
  }

  startMovementLoop() {
    setInterval(() => {
      this.handleMovementInput();
      this.handleJump();
      this.updateCameraPosition();
    }, 1000 / 60);
  }

  handleMovementInput() {
    if (
      (this.world.keyboard.RIGHT || this.world.keyboard.D) &&
      this.x < this.world.level.level_end_x &&
      this.blockMovesVar()
    ) {
      this.otherDirection = false;
      this.moveRight();
    }

    if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0 && this.blockMovesVar()) {
      this.otherDirection = true;
      this.moveLeft();
    }
  }

  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround() && this.blockMovesVar()) {
      this.jump(30);
    }
  }

  updateCameraPosition() {
    this.world.camera_x = -this.x + 100;
  }

  startAnimationLoop() {
    setInterval(() => {
      let now = Date.now();
      let idleDuration = now - this.lastActivityTime;

      if (this.isAboveGround()) {
        this.playJumpAnimation(now);
      } else if (this.isHurt()) {
        this.playHurtAnimation(now);
      } else if (this.isMoving() && this.blockMovesVar() && !this.blockMoves) {
        this.playWalkingAnimation(now);
      } else if (this.isDead() && !this.deathAnimationPlayed) {
        this.playDeathSequence();
      } else if (this.deathAnimationPlayed) {
        this.playAnimationOnce(this.IMAGES_DEAD);
      } else if (
        idleDuration >= 3000 &&
        !this.world.levelEndboss.hasPlayedDead &&
        !this.world.levelEndboss.hasPlayedAlert
      ) {
        this.playLongIdleAnimation();
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 100);
  }

  playJumpAnimation(now) {
    this.playAnimation(this.IMAGES_JUMPING);
    this.lastActivityTime = now;
  }

  playHurtAnimation(now) {
    this.playAnimation(this.IMAGES_HURT);
    this.lastActivityTime = now;
  }

  isMoving() {
    return (
      this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A
    );
  }

  playWalkingAnimation(now) {
    this.playAnimation(this.IMAGES_WALKING);
    this.stepsSound.play();
    this.lastActivityTime = now;
  }

  playDeathSequence() {
    rewindSong(gamePlaySound);
    rewindSong(bossBattleSound);

    this.gameOver.play();

    if (!this.deathStarted) {
      this.deathStarted = true;
      this.deathImage.src = this.IMAGES_DEAD[0];
      this.img = this.deathImage;

      setTimeout(() => {
        this.deathAnimationPlayed = true;
      }, 500);

      setTimeout(() => {
        gameState = "gameover";
        initOver();
      }, 3000);
    }
  }

  playLongIdleAnimation() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
    this.snoring.play();
  }

  blockMovesVar() {
    if (
      !this.isBeingPushedBack &&
      !this.isDead() &&
      !this.blockMoves &&
      !this.world.levelEndboss.hasPlayedDead
    ) {
      return true;
    }
  }
}
