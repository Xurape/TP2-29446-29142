import { Scene } from "phaser";

export class EndGameScene extends Scene {
  constructor() {
    super("EndGameScene");
  }

  init(data) {
    this.time = data.time;
  }

  create() {
    this.sound.stopAll();
    this.sound.play("correct", { volume: 0.01, loop: false })

    if(!this.anims.exists("end_game"))
      this.anims.create({
        key: "end_game",
        frames: this.anims.generateFrameNumbers("end_game", { start: 0, end: 19 }),
        frameRate: 10,
        repeat: -1,
      });

    this.add.sprite(400, 300, "end_game").setAlpha(0.5).play("end_game");

    this.add.image(400, 300, "logo").setScale(0.5);

    this.add.text(200, 200, "PARABÉNS, ACABASTE O JOGO!", {
      font: "40px Arial",
      fill: "#ffffff",
    }).setOrigin(0.18);

    this.add.text(200, 100, `TEMPO: ${Math.floor(this.time / 60)} SEGUNDOS`, {
      font: "40px Arial",
      fill: "#ffffff",
    }).setOrigin(0.05);

    this.add.image(400, 400, "button").setScale(0.5).setInteractive().on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });

    this.add.text(400, 405, "Voltar ao menu", {
      font: "25px Arial",
      fill: "#ffffff",
    }).setOrigin(0.5);
  }
}
