class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 1500;
  coins;
  bottles;
  endBoss;

  constructor(enemies, clouds, backgroundObjects, coins, bottles, endBoss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.endBoss = endBoss;
  }
}
