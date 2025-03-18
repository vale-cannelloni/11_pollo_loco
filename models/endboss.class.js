class Endboss extends MovableObject {
  height = this.height * 3.5;
  width = this.width * 3.5;
  y = -60;

  IMAGES_WALKING = [
    "./media/4_enemie_boss_chicken/1_walk/G1.png",
    "./media/4_enemie_boss_chicken/1_walk/G2.png",
    "./media/4_enemie_boss_chicken/1_walk/G3.png",
    "./media/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  currentImage = 0;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 1500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
