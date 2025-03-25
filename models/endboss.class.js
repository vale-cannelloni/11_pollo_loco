class Endboss extends MovableObject {
  height = this.height * 3.5;
  width = this.width * 3.5;
  y = -60;
  energy = 100;

  IMAGES_WALKING = [
    "./media/4_enemie_boss_chicken/1_walk/G1.png",
    "./media/4_enemie_boss_chicken/1_walk/G2.png",
    "./media/4_enemie_boss_chicken/1_walk/G3.png",
    "./media/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "media/4_enemie_boss_chicken/2_alert/G5.png",
    "media/4_enemie_boss_chicken/2_alert/G6.png",
    "media/4_enemie_boss_chicken/2_alert/G7.png",
    "media/4_enemie_boss_chicken/2_alert/G8.png",
    "media/4_enemie_boss_chicken/2_alert/G9.png",
    "media/4_enemie_boss_chicken/2_alert/G10.png",
    "media/4_enemie_boss_chicken/2_alert/G11.png",
    "media/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "media/4_enemie_boss_chicken/3_attack/G13.png",
    "media/4_enemie_boss_chicken/3_attack/G14.png",
    "media/4_enemie_boss_chicken/3_attack/G15.png",
    "media/4_enemie_boss_chicken/3_attack/G16.png",
    "media/4_enemie_boss_chicken/3_attack/G17.png",
    "media/4_enemie_boss_chicken/3_attack/G18.png",
    "media/4_enemie_boss_chicken/3_attack/G19.png",
    "media/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "media/4_enemie_boss_chicken/4_hurt/G21.png",
    "media/4_enemie_boss_chicken/4_hurt/G22.png",
    "media/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "media/4_enemie_boss_chicken/5_dead/G24.png",
    "media/4_enemie_boss_chicken/5_dead/G25.png",
    "media/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  currentImage = 0;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);

    this.x = 1500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.energy <= 0) {
        this.playAnimationOnce(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
