import { Scene } from "phaser";

export class MainMenuScene extends Scene {
  constructor() {
    super("MainMenuScene");
  }

  create() {
    this.add.image(400, 300, "sky_background").setScale(1);
    this.sound.stopAll();
    this.theme = this.sound.play("main_theme", { volume: 0.01, loop: true });

    this.pauseBackground = this.add.image(400, 330, 'large_background').setScale(0.25).setDepth(2).setScrollFactor(0);
    this.pauseLogo = this.add.image(400, 130, 'logo').setScale(0.45).setDepth(2).setScrollFactor(0);

    this.buttons = {
      continue: this.add.rectangle(400, 250, 200, 50, 0x000000, 0.5).setDepth(2).setScrollFactor(0),
      newGame: this.add.rectangle(400, 318, 200, 50, 0x000000, 0.5).setDepth(2).setScrollFactor(0),
      quit: this.add.rectangle(400, 387, 200, 50, 0x000000, 0.5).setDepth(2).setScrollFactor(0),
    }

    this.buttons.continue.setInteractive();
    this.buttons.newGame.setInteractive();
    this.buttons.quit.setInteractive();

    this.buttons.continue.on('pointerdown', () => {
      this.sound.stopAll();
      this.scene.start('GameScene');
    }, this);
    this.buttons.newGame.on('pointerdown', () => {
      this.sound.stopAll();
      this.scene.start('GameScene');
    }, this);
    this.buttons.quit.on('pointerdown', () => {
      // TODO: implement
    }, this);

    this.menu_text = {
      continue: this.add.text(400, 250, 'Continuar', { color: '#ffffff', fontSize: '24px', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(3).setScrollFactor(0),
      newGame: this.add.text(400, 318, 'Novo jogo', { color: '#ffffff', fontSize: '24px', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(3).setScrollFactor(0),
      quit: this.add.text(400, 387, 'Sair', { color: '#ffffff', fontSize: '24px', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(3).setScrollFactor(0),
    }
  }
}
