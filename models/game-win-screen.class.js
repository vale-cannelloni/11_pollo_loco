class GameWinScreen extends DrawableObject {
  x = 60;
  y = 165;
  width = 600;
  height = 150;
  ctx;
  canvas;
  keyboard;

  constructor() {
    super().loadImage("./media/You won, you lost/You Won B.png");
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawGameWinLoop();
  }

  drawGameWinLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMapWin(this);
    let self = this;
    requestAnimationFrame(function () {
      self.drawGameWinLoop();
    });
  }

  addToMapWin(mo) {
    mo.drawWinScreen(this.ctx);
  }

  drawWinScreen(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
