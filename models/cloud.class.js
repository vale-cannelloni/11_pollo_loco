class Cloud extends MovableObject {
  speed = 0.05;
  constructor() {
    super().loadImage("./media/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 720;
    this.y = 20;
    this.width = 500;
    this.height = 250;
    this.animate();
  }

  animate() {
    this.cloudMovement = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    intervalIds.push(this.cloudMovement);
  }
}
