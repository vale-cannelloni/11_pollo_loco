class GameOverScreen extends DrawableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;
  ctx;
  canvas;
  keyboard;

  constructor() {
    super().loadImage("./media/9_intro_outro_screens/game_over/game over!.png");
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawGameOverLoop();
  }

  drawGameOverLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMapOver(this);
    let self = this;
    requestAnimationFrame(function () {
      self.drawGameOverLoop();
    });
  }

  addToMapOver(mo) {
    mo.drawOverScreen(this.ctx);
  }

  drawOverScreen(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
