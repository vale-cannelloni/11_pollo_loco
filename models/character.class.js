/**
 * Initializes and returns a new Character instance.
 * @returns {Character} A new Character object.
 */
function initCharacter() {
  return new Character();
}

/**
 * Represents the player-controlled character.
 * Inherits movement and animation capabilities from MovableObject.
 */
class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 172;
  x = 25;
  speed = 5;
  offsetYTop = 100;
  offsetX = 50;
  isBeingPushedBack = false;
  blockMoves = false;

  deathStarted = false;
  deathAnimationPlayed = false;
  deathImage = new Image();

  /**
   * Walking animation frames
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./media/2_character_pepe/2_walk/W-21.png",
    "./media/2_character_pepe/2_walk/W-22.png",
    "./media/2_character_pepe/2_walk/W-23.png",
    "./media/2_character_pepe/2_walk/W-24.png",
    "./media/2_character_pepe/2_walk/W-25.png",
    "./media/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Jumping animation frames
   * @type {string[]}
   */
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

  /**
   * Death animation frames
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./media/2_character_pepe/5_dead/D-51.png",
    "./media/2_character_pepe/5_dead/D-52.png",
    "./media/2_character_pepe/5_dead/D-53.png",
    "./media/2_character_pepe/5_dead/D-54.png",
    "./media/2_character_pepe/5_dead/D-55.png",
    "./media/2_character_pepe/5_dead/D-56.png",
  ];

  /**
   * Hurt animation frames
   * @type {string[]}
   */
  IMAGES_HURT = [
    "./media/2_character_pepe/4_hurt/H-41.png",
    "./media/2_character_pepe/4_hurt/H-42.png",
    "./media/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Idle animation frames
   * @type {string[]}
   */
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

  /**
   * Long idle animation frames
   * @type {string[]}
   */
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

  /**
   * Creates a new Character, loads animations and starts behavior loops.
   */
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

  /**
   * Starts the animation and movement loops.
   */
  animate() {
    this.lastActivityTime = Date.now();
    this.startMovementLoop();
    this.startAnimationLoop();
  }

  /**
   * Continuously checks and applies user input and updates the camera.
   */
  startMovementLoop() {
    let movementLoop = setInterval(() => {
      this.handleMovementInput();
      this.handleJump();
      this.updateCameraPosition();
    }, 1000 / 60);
    intervalIds.push(movementLoop);
  }

  /**
   * Handles horizontal movement based on keyboard input.
   */
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

  /**
   * Triggers a jump if allowed and on the ground.
   */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround() && this.blockMovesVar()) {
      this.jump(30);
    }
  }

  /**
   * Updates camera position relative to character position.
   */
  updateCameraPosition() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Determines which animation to play based on character state.
   */
  startAnimationLoop() {
    let animationLoop = setInterval(() => {
      let now = Date.now();
      let idleDuration = now - this.lastActivityTime;

      if (this.isAboveGround()) {
        this.playJumpAnimation(now);
      } else if (this.isHurt() && this.energy != 0) {
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
    intervalIds.push(animationLoop);
  }

  /**
   * Plays jump animation and updates activity time.
   * @param {number} now - The current timestamp.
   */
  playJumpAnimation(now) {
    this.playAnimation(this.IMAGES_JUMPING);
    this.lastActivityTime = now;
  }

  /**
   * Plays hurt animation and updates activity time.
   * @param {number} now - The current timestamp.
   */
  playHurtAnimation(now) {
    this.playAnimation(this.IMAGES_HURT);
    this.lastActivityTime = now;
  }

  /**
   * Returns true if any movement keys are being pressed.
   * @returns {boolean}
   */
  isMoving() {
    return (
      this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A
    );
  }

  /**
   * Plays walking animation and footstep sound.
   * @param {number} now - The current timestamp.
   */
  playWalkingAnimation(now) {
    this.playAnimation(this.IMAGES_WALKING);
    soundEffects.stepsSound.play();
    this.lastActivityTime = now;
  }

  /**
   * Handles the character's death animation and game over transition.
   */
  playDeathSequence() {
    restart = true;
    rewindSong();
    soundEffects.gameOver.play();

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

  /**
   * Plays long idle (snoring) animation and sound effect.
   */
  playLongIdleAnimation() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
    soundEffects.snoring.play();
  }

  /**
   * Checks whether character movement is currently allowed.
   * @returns {boolean}
   */
  blockMovesVar() {
    return (
      !this.isBeingPushedBack && !this.isDead() && !this.blockMoves && !this.world.levelEndboss.hasPlayedDead
    );
  }
}
