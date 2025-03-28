/**
 * Represents a level in the game.
 */
class Level {
  /**
   * The list of enemies in the level.
   * @type {Array<Object>}
   */
  enemies;

  /**
   * The list of clouds in the level.
   * @type {Array<Object>}
   */
  clouds;

  /**
   * The background objects for the level.
   * @type {Array<Object>}
   */
  backgroundObjects;

  /**
   * The x-coordinate where the level ends.
   * @type {number}
   */
  level_end_x = 1500;

  /**
   * The list of coins available in the level.
   * @type {Array<Object>}
   */
  coins;

  /**
   * The list of bottles available in the level.
   * @type {Array<Object>}
   */
  bottles;

  /**
   * The final boss of the level.
   * @type {Object}
   */
  endBoss;

  /**
   * Creates a new Level instance.
   * @param {Array<Object>} enemies - The enemies in the level.
   * @param {Array<Object>} clouds - The clouds in the level.
   * @param {Array<Object>} backgroundObjects - The background objects in the level.
   * @param {Array<Object>} coins - The coins in the level.
   * @param {Array<Object>} bottles - The bottles in the level.
   * @param {Object} endBoss - The end boss of the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles, endBoss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.endBoss = endBoss;
  }
}
