class Endboss extends MovableObject {
  /** @type {number} Boss's scaled height */
  height = this.height * 3.5;

  /** @type {number} Boss's scaled width */
  width = this.width * 3.5;

  /** @type {number} Y position */
  y = -20;

  /** @type {number} Initial energy level */
  energy = 100;

  /** @type {number} Vertical offset for collision box */
  offsetYTop = 100;

  /** @type {number} Horizontal offset for collision box */
  offsetX = 75;

  /** @type {number} Movement speed */
  speed = 20;

  /** @type {boolean} Whether the boss is in angry mode */
  angry = false;

  /** @type {boolean} Whether the alert animation has played */
  hasPlayedAlert = false;

  /** @type {boolean} Whether the dead animation has played */
  hasPlayedDead = false;

  /** @type {boolean} Whether walking is stopped */
  stopWalk = false;

  /** @type {string[]} Image paths for walking animation */
  IMAGES_WALKING = [
    "./media/4_enemie_boss_chicken/1_walk/G1.png",
    "./media/4_enemie_boss_chicken/1_walk/G2.png",
    "./media/4_enemie_boss_chicken/1_walk/G3.png",
    "./media/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** @type {string[]} Image paths for alert animation */
  IMAGES_ALERT = [
    "media/4_enemie_boss_chicken/2_alert/G5.png",
    "media/4_enemie_boss_chicken/2_alert/G6.png",
    "media/4_enemie_boss_chicken/2_alert/G7.png",
    "media/4_enemie_boss_chicken/2_alert/G8.png",
    "media/4_enemie_boss_chicken/2_alert/G9.png",
    "media/4_enemie_boss_chicken/2_alert/G10.png",
    "media/4_enemie_boss_chicken/2_alert/G11.png",
    "media/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /** @type {string[]} Image paths for attack animation */
  IMAGES_ATTACK = [
    "media/4_enemie_boss_chicken/3_attack/G13.png",
    "media/4_enemie_boss_chicken/3_attack/G14.png",
    "media/4_enemie_boss_chicken/3_attack/G15.png",
    "media/4_enemie_boss_chicken/3_attack/G16.png",
    "media/4_enemie_boss_chicken/3_attack/G17.png",
    "media/4_enemie_boss_chicken/3_attack/G18.png",
    "media/4_enemie_boss_chicken/3_attack/G19.png",
    "media/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /** @type {string[]} Image paths for hurt animation */
  IMAGES_HURT = [
    "media/4_enemie_boss_chicken/4_hurt/G21.png",
    "media/4_enemie_boss_chicken/4_hurt/G22.png",
    "media/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** @type {string[]} Image paths for death animation */
  IMAGES_DEAD = [
    "media/4_enemie_boss_chicken/5_dead/G24.png",
    "media/4_enemie_boss_chicken/5_dead/G25.png",
    "media/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /** @type {number} Index of the current animation image */
  currentImage = 0;

  /** @type {World} Reference to the game world */
  world;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ALERT);

    /** @type {number} X position */
    this.x = 1500;

    this.animate();
  }

  /**
   * Initializes the main animation loop for the boss.
   */
  animate() {
    let endbossLoop = setInterval(() => {
      if (this.shouldPlayDeadAnimation()) {
        this.playDeadSequence();
      } else if (this.shouldPlayHurtAnimation()) {
        this.playHurtAnimation();
      } else if (this.shouldPlayAlertAnimation()) {
        this.playAlertAnimation();
      } else if (this.shouldAttack()) {
        this.performAttack();
      } else if (!this.hasPlayedDead && !this.stopWalk && !this.hasPlayedAlert) {
        this.playWalkAnimation();
      }
    }, 100);
    intervalIds.push(endbossLoop);
  }

  /** @returns {boolean} True if the boss should play the death animation */
  shouldPlayDeadAnimation() {
    return this.energy <= 0 && !this.hasPlayedDead && !this.stopWalk;
  }

  /** @returns {boolean} True if the boss is hurt and should show it */
  shouldPlayHurtAnimation() {
    return this.isHurt() && !this.hasPlayedDead && this.energy > 0 && !this.stopWalk;
  }

  /** @returns {boolean} True if the boss should play the alert animation */
  shouldPlayAlertAnimation() {
    return this.angry && !this.hasPlayedDead && !this.stopWalk && !this.hasPlayedAlert;
  }

  /** @returns {boolean} True if the boss should attack */
  shouldAttack() {
    return this.hasPlayedAlert && !this.angry && !this.hasPlayedDead && !this.stopWalk;
  }

  /**
   * Plays the full death animation and ends the game.
   */
  playDeadSequence() {
    this.hasPlayedDead = true;
    this.startDyingAnimation();
    this.scheduleDeathAnimation();
    this.scheduleGameOver();
  }

  /**
   * Starts the hurt animation loop for dying.
   */
  startDyingAnimation() {
    this.dyingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
      soundEffects.hurtBoss.play();
    }, 100);
  }

  /**
   * Switches from the hurt animation to the dead animation after a delay.
   */
  scheduleDeathAnimation() {
    setTimeout(() => {
      rewindSong();
      clearInterval(this.dyingInterval);
      this.playAnimationOnce(this.IMAGES_DEAD);
      soundEffects.deadBoss.play();
    }, 2000);
  }

  /**
   * Triggers the game over state after the boss dies.
   */
  scheduleGameOver() {
    setTimeout(() => {
      gameState = "gameover";
      initWin();
    }, 3000);
  }

  /**
   * Plays the hurt animation with sound.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    soundEffects.hurtBoss.play();
  }

  /**
   * Plays the alert animation once and sets the alert flag.
   */
  playAlertAnimation() {
    this.playAnimationOnce(this.IMAGES_ALERT);
    this.hasPlayedAlert = true;
  }

  /**
   * Plays the attack animation and then moves the boss left.
   */
  performAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
    let bossAttackMove = setTimeout(() => {
      this.moveLeft();
    }, 500);
    intervalIds.push(bossAttackMove);
  }

  /**
   * Plays the walking animation in a loop.
   */
  playWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }
}
