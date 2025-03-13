class Cloud extends MovableObject {
  constructor() {
    super().loadImage("./media/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 720;
    this.y = 0 + Math.random() * 100;
  }
}
