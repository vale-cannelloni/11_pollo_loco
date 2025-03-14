class Chicken extends MovableObject {
  height = 100;
  width = 100;
  y = 320;

  IMAGES_WALKING = [
    "./media/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./media/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./media/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  currentImage = 0;
  constructor() {
    super().loadImage(
      "./media/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500;
    this.animate();
  }
  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }
}
