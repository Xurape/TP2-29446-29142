import "phaser";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { EndGameScene } from "./scenes/EndGameScene";
import { GameScene } from "./scenes/GameScene";
import { PreloadScene } from "./scenes/PreloadScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "phaser-game",
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      fps: 60,
      vsync: true,
      debug: false,
    },
  },
  render: {
    antialias: true,
  },
  resolution: 3,
  scene: [PreloadScene, MainMenuScene, GameScene, EndGameScene],
};

window.addEventListener("load", () => {
  const game = new Phaser.Game(config);
});
