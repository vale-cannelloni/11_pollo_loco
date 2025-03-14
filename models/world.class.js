class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ];
  backgroundObjects = [
    new BackgroundObject(
      "./media/5_background/layers/1_first_layer/1.png",
      0,
      0
    ),
  ];
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.backgroundObjects);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
