class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 130;
  x = 50;
  IMAGES_WALKING = [
    "./media/2_character_pepe/2_walk/W-21.png",
    "./media/2_character_pepe/2_walk/W-22.png",
    "./media/2_character_pepe/2_walk/W-23.png",
    "./media/2_character_pepe/2_walk/W-24.png",
    "./media/2_character_pepe/2_walk/W-25.png",
    "./media/2_character_pepe/2_walk/W-26.png",
  ];
  currentImage = 0;
  constructor() {
    super().loadImage("./media/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

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

  jump() {}
}
