class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 120;
  x = 50;
  speed = 5;
  offsetYTop = 100;
  offsetX = 50;

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
    "./media/2_character_pepe/5_dead/D-57.png",
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
    setInterval(() => {
      if (
        (this.world.keyboard.RIGHT || this.world.keyboard.D) &&
        this.x < this.world.level.level_end_x
      ) {
        this.otherDirection = false;
        this.moveRight();
      }
      if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0) {
        this.otherDirection = true;
        this.moveLeft();
      }
      if (
        (this.world.keyboard.UP || this.world.keyboard.SPACE) &&
        !this.isAboveGround()
      ) {
        this.jump(30);
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (
        (this.world.keyboard.RIGHT ||
          this.world.keyboard.LEFT ||
          this.world.keyboard.D ||
          this.world.keyboard.A) &&
        !this.isAboveGround()
      ) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 100);
  }
}
