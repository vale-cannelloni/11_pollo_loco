function initLevel() {
  return new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],
    [new Cloud(), new Cloud(), new Cloud()],
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
    [
      new Coin("media/8_coin/coin_2.png", 100, 300),
      new Coin("media/8_coin/coin_1.png", 400, 300),
      new Coin("media/8_coin/coin_2.png", 700, 300),
      new Coin("media/8_coin/coin_1.png", 900, 300),
      new Coin("media/8_coin/coin_2.png", 1000, 300),
    ],
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
    [new Endboss()]
  );
}
