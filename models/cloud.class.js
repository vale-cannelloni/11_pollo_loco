/**
 * Represents a moving cloud in the background.
 * Extends the MovableObject class to inherit movement behavior.
 */
class Cloud extends MovableObject {
  /** @type {number} The horizontal movement speed of the cloud */
  speed = 0.05;

  /**
   * Creates a new Cloud instance.
   * Initializes position, size, loads image, and starts animation.
   */
  constructor() {
    super().loadImage("./media/5_background/layers/4_clouds/1.png");

    /** @type {number} X position of the cloud, randomized within a range */
    this.x = 0 + Math.random() * 720;

    /** @type {number} Y position of the cloud */
    this.y = 20;

    /** @type {number} Width of the cloud image */
    this.width = 500;

    /** @type {number} Height of the cloud image */
    this.height = 250;

    this.animate();
  }

  /**
   * Starts the cloud's leftward movement by setting an interval.
   * Adds the interval ID to a global interval manager (intervalIds).
   */
  animate() {
    this.cloudMovement = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // Assumes intervalIds is a globally accessible array for tracking intervals
    intervalIds.push(this.cloudMovement);
  }
}
