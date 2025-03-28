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
  jumpSound: new Audio(
    "https://soundfxcenter.com/video-games/new-super-mario-bros/8d82b5_New_Super_Mario_Bros_Jump_Sound_Effect.mp3"
  ),
  stepsSound: new Audio("https://noproblo.dayjo.org/zeldasounds/OOT/OOT_Steps_Dirt6.wav"),
  gameOver: new Audio("./media/sound/smb_mariodie.wav"),
  snoring: new Audio("https://noproblo.dayjo.org/zeldasounds/OOT/OOT_Talon_Snore.wav"),
  coinSound: new Audio("./media/sound/smb_coin.wav"),
  killSound: new Audio("./media/sound/smb_stomp.wav"),
  takeSound: new Audio("./media/sound/smb_kick.wav"),
  charHit: new Audio("./media/sound/hurtChar.wav"),
  deadBoss: new Audio("https://noproblo.dayjo.org/zeldasounds/OOT/OOT_6amRooster.wav"),
  hurtBoss: new Audio("https://noproblo.dayjo.org/zeldasounds/OOT/OOT_Cucco2.wav"),
  endbossSound: new Audio(
    "https://static.wikia.nocookie.net/soundeffects/images/b/b8/Godzilla_1962-1975_SFX.ogg"
  ),
  gamePlaySound: new Audio(
    "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/cybobvkufo/12.%20Overworld.mp3"
  ),
  gameOverSound: new Audio(
    "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/rzghhryzkm/52.%20Game%20Over.mp3"
  ),
  gameWinSound: new Audio(
    "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/xhdrnmdrka/42.%20Bonus%20Game%20Clear.mp3"
  ),
  bossBattleSound: new Audio(
    "https://eta.vgmtreasurechest.com/soundtracks/super-mario-world-snes-gamerip/dlgohnhgam/55.%20Bowser%27s%20Last%20Attack.mp3"
  ),
  fireSound: new Audio("./media/sound/smw_lava_bubble.wav"),
};
