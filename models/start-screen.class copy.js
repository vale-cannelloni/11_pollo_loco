class StartScreen extends DrawableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;
  ctx;
  canvas;
  keyboard;

  constructor(canvas, keyboard) {
    super().loadImage("./media/9_intro_outro_screens/start/startscreen_1.png");
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawStartScreenLoop();
  }

  drawStartScreenLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMapStart(this);
    let self = this;
    requestAnimationFrame(function () {
      self.drawStartScreenLoop();
    });
  }

  addToMapStart(mo) {
    mo.drawStartScreen(this.ctx);
  }

  drawStartScreen(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
