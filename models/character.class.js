class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 120;
  x = 50;
  speed = 5;
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
  IMAGES_IDLE = [
    "./media/2_character_pepe/3_jump/J-31.png",
    "./media/2_character_pepe/3_jump/J-31.png",
  ];

  world;
  currentImage = 0;
  constructor() {
    super().loadImage("./media/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);

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
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
      if (
        (this.world.keyboard.RIGHT ||
          this.world.keyboard.LEFT ||
          this.world.keyboard.D ||
          this.world.keyboard.A) &&
        !this.isAboveGround()
      ) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
