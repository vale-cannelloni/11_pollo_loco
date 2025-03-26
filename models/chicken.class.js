class Chicken extends MovableObject {
  height = 100;
  width = 100;
  y = 320;
  offsetYTop = 20;
  offsetX = 0;
  stopWalk = false;

  IMAGES_WALKING = [
    "./media/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./media/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./media/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEATH = ["media/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  currentImage = 0;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
    this.x = 500 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    this.moveInterval = setInterval(() => {
      if (this.energy > 0 && !this.stopWalk) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (this.energy > 0 && !this.stopWalk) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);

    this.energyCheckInterval = setInterval(() => {
      if (this.energy <= 0 && !this.stopWalk) {
        this.deadChicken();
      }
    }, 100);
  }

  deadChicken() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.energyCheckInterval);
    this.playAnimation(this.IMAGES_DEATH);
  }
}
