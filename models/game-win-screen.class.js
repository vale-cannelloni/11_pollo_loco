class GameWinScreen extends DrawableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;

  constructor() {
    super();
    this.loadImage("./media/You won, you lost/You Won B.png");
  }
}
