const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
  ],
  [new Cloud(), new Cloud(), new Cloud()],
  [
    new BackgroundObject("./media/5_background/layers/air.png", -719),
    new BackgroundObject(
      "./media/5_background/layers/3_third_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "./media/5_background/layers/2_second_layer/2.png",
      -719
    ),
    new BackgroundObject(
      "./media/5_background/layers/1_first_layer/2.png",
      -719
    ),

    new BackgroundObject("./media/5_background/layers/air.png", 0),
    new BackgroundObject("./media/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./media/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./media/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("./media/5_background/layers/air.png", 719),
    new BackgroundObject(
      "./media/5_background/layers/3_third_layer/2.png",
      719
    ),
    new BackgroundObject(
      "./media/5_background/layers/2_second_layer/2.png",
      719
    ),
    new BackgroundObject(
      "./media/5_background/layers/1_first_layer/2.png",
      719
    ),

    new BackgroundObject("./media/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "./media/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "./media/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "./media/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
  ],
  [
    new Coin("media/8_coin/coin_2.png", 100, 300),
    new Coin("media/8_coin/coin_1.png", 400, 300),
    new Coin("media/8_coin/coin_2.png", 700, 300),
    new Coin("media/8_coin/coin_1.png", 900, 300),
    new Coin("media/8_coin/coin_2.png", 1000, 300),
  ]
);
