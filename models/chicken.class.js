class Chicken extends MovableObject {
  y = 290;
  constructor() {
    super().loadImage(
      "./media/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.x = 200 + Math.random() * 500;
  }
}
