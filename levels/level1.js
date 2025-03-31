/**
 * Initializes and returns a new level instance.
 *
 * @returns {Level} The newly created level containing all game elements such as enemies, clouds, background objects, coins, bottles, and endboss.
 */
function initLevel() {
  return new Level(
    /**
     * @type {Chicken[]} Array of Chicken enemy instances.
     */
    [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],

    /**
     * @type {Cloud[]} Array of Cloud instances for environmental effects.
     */
    [new Cloud(), new Cloud(), new Cloud()],

    /**
     * @type {BackgroundObject[]} Array of layered background objects to create the parallax effect.
     */
    [
      new BackgroundObject("./media/5_background/layers/air.png", -959),
      new BackgroundObject("./media/5_background/layers/3_third_layer/2.png", -959),
      new BackgroundObject("./media/5_background/layers/2_second_layer/2.png", -959),
      new BackgroundObject("./media/5_background/layers/1_first_layer/2.png", -959),

      new BackgroundObject("./media/5_background/layers/air.png", 0),
      new BackgroundObject("./media/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./media/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./media/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("./media/5_background/layers/air.png", 959),
      new BackgroundObject("./media/5_background/layers/3_third_layer/2.png", 959),
      new BackgroundObject("./media/5_background/layers/2_second_layer/2.png", 959),
      new BackgroundObject("./media/5_background/layers/1_first_layer/2.png", 959),

      new BackgroundObject("./media/5_background/layers/air.png", 959 * 2),
      new BackgroundObject("./media/5_background/layers/3_third_layer/1.png", 959 * 2),
      new BackgroundObject("./media/5_background/layers/2_second_layer/1.png", 959 * 2),
      new BackgroundObject("./media/5_background/layers/1_first_layer/1.png", 959 * 2),
    ],

    /**
     * @type {Coin[]} Array of Coin instances placed at specific coordinates.
     */
    [
      new Coin("media/8_coin/coin_2.png", 100, 300),
      new Coin("media/8_coin/coin_1.png", 400, 300),
      new Coin("media/8_coin/coin_2.png", 700, 300),
      new Coin("media/8_coin/coin_1.png", 900, 300),
      new Coin("media/8_coin/coin_2.png", 1000, 300),
    ],

    /**
     * @type {Bottle[]} Array of Bottle instances representing collectibles or throwable objects.
     */
    [
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 100),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 200),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 400),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 400),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 400),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 400),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 400),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 500),
      new Bottle(" media/6_salsa_bottle/1_salsa_bottle_on_ground.png", 500),
    ],

    /**
     * @type {Endboss[]} Array containing the Endboss enemy for the level.
     */
    [new Endboss()]
  );
}
