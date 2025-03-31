/**
 * @typedef {Object} SoundEffects
 * @property {HTMLAudioElement} jumpSound - Sound effect for jumping.
 * @property {HTMLAudioElement} stepsSound - Footstep sound on dirt.
 * @property {HTMLAudioElement} gameOver - Local fallback sound for game over.
 * @property {HTMLAudioElement} snoring - Snoring sound, possibly for idle or sleep animation.
 * @property {HTMLAudioElement} coinSound - Sound effect for collecting a coin.
 * @property {HTMLAudioElement} killSound - Sound effect for stomping an enemy.
 * @property {HTMLAudioElement} takeSound - Sound effect for picking up or kicking an item.
 * @property {HTMLAudioElement} charHit - Sound played when the character is hurt.
 * @property {HTMLAudioElement} deadBoss - Sound played when the boss is defeated.
 * @property {HTMLAudioElement} hurtBoss - Sound played when the boss is damaged.
 * @property {HTMLAudioElement} endbossSound - Background sound for final boss sequence.
 * @property {HTMLAudioElement} gamePlaySound - Background music during regular gameplay.
 * @property {HTMLAudioElement} gameOverSound - Background music for game over screen.
 * @property {HTMLAudioElement} gameWinSound - Sound or music for winning or completing the game.
 * @property {HTMLAudioElement} bossBattleSound - Background music for boss battles.
 * @property {HTMLAudioElement} fireSound - Sound effect for lava or fire bubbles.
 */

/** @type {SoundEffects} */
let soundEffects = {
  jumpSound: new Audio("./media/sound/jump.wav"),
  stepsSound: new Audio("./media/sound/step.wav"),
  gameOver: new Audio("./media/sound/no_energy.wav"),
  snoring: new Audio("media/sound/snoring.wav"),
  coinSound: new Audio("./media/sound/coin.wav"),
  killSound: new Audio("./media/sound/bottle_break.wav"),
  takeSound: new Audio("./media/sound/take.wav"),
  charHit: new Audio("./media/sound/playerhit.mp3"),
  deadBoss: new Audio("./media/sound/chicken.wav"),
  hurtBoss: new Audio("./media/sound/chicken.wav"),
  endbossSound: new Audio("./media/sound/monster_scream.wav"),
  gamePlaySound: new Audio("./media/sound/world_music.mp3"),
  gameOverSound: new Audio("./media/sound/game_over.wav"),
  gameWinSound: new Audio("./media/sound/Victory.mp3"),
  bossBattleSound: new Audio("./media/sound/fight.wav"),
};
