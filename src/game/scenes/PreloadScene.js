import { Scene } from "phaser";

export class PreloadScene extends Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    console.log(`%c
  _______ __ __ __                                     
 |   _   |__|  |  |--.-----.-----.                     
 |   1___|  |  |    <|  -__|     |                     
 |____   |__|__|__|__|_____|__|__|                     
 |:  1   |             ___ ___       __ __             
 |::.. . |            |   Y   .---.-|  |  .-----.--.--.
 \`-------'            |.  |   |  _  |  |  |  -__|  |  |
                      |.  |   |___._|__|__|_____|___  |
                      |:  1   |                 |_____|
                       \:.. ./                         
                        \`---'                          
                                                       
    `, `font-family: monospace; color: red`);

    console.log("%c-------------------------------------------------------------------------------", "color: red; font-weight: bold;");

    /* ------ ENVIRONMENT ------ */
    this.sendProgress("Loading environment assets...");
    this.load.image("sky", "game/sprites/world/sky.png");
    this.load.image("ground", "game/sprites/world/ground.png");
    this.load.image("floor", "game/sprites/world/floor.png");

    /* ------ MENUS ------ */
    this.sendProgress("Loading menu assets...");
    this.load.image("logo", "game/sprites/menus/Logo.png");
    this.load.image("large_background", "game/sprites/menus/LargeBackground.png");
    this.load.image("button", "game/sprites/menus/BlueTitle2.png");

    /* ------ GAME MECHANICS ------ */
    this.sendProgress("Loading game mechanics assets...");
    this.load.spritesheet("lives", "game/sprites/character/lives.png", {
      frameWidth: 420,
      frameHeight: 420,
    });

    /* ------ CHARACTER ------ */
    this.sendProgress("Loading character assets...");
    this.load.spritesheet("character", "game/sprites/character/character.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    /* ------ NPCS ------ */
    this.sendProgress("Loading npc assets...");
    this.load.image("dialog_box", "game/sprites/menus/DialogueBox.png");
    this.load.spritesheet("angel_01", "game/sprites/npc/angel_01.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    /* ------ ENEMIES ------ */
    this.sendProgress("Loading enemies assets...");
    this.enemy_amount = 5;

    for(let i = 0; i < this.enemy_amount; i++) {
      this.load.spritesheet(`enemy_${i + 1}`, `game/sprites/enemies/enemy_${i + 1}.png`, {
        frameWidth: 32,
        frameHeight: 32,
      });
    }

    /* ------ ENEMIES ------ */
    this.sendProgress("Loading map assets...");

    this.load.image("background", "game/sprites/map/tilesetOpenGameBackground.png");

    this.load.spritesheet('tiles', 'game/sprites/map/world_tileset.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    /* ------ SOUNDS ------ */
    this.sendProgress("Loading sounds assets...");
    
    // -- Ambient
    this.load.audio("ambient", "game/assets/sounds/ambient.mp3");
    
    // -- Music
    this.load.audio("correct", "game/assets/sounds/correct.mp3");
    this.load.audio("main_theme", "game/assets/sounds/main_theme.mp3");
    this.load.audio("during_game_1", "game/assets/sounds/during_game_1.mp3");
    // this.load.audio("during_game_2", "game/assets/sounds/during_game_2.mp3");
    // this.load.audio("during_game_3", "game/assets/sounds/during_game_3.mp3");
    
    // -- Character-related
    this.load.audio("character_jump", "game/assets/sounds/jump.mp3");
    this.load.audio("character_hurt", "game/assets/sounds/hurt.mp3");
    this.load.audio("character_death", "game/assets/sounds/death.mp3");
    
    // -- Enemey-related
    this.load.audio("enemy_death", "game/assets/sounds/enemy_death.mp3");
    this.load.audio("enemy_damage", "game/assets/sounds/enemy_damage.mp3");
    
    // -- NPC-related
    this.load.audio("npc_talking", "game/assets/npc/talking.mp3");
    
    /* ------ MAIN MENU ------ */
    this.load.image('sky_background', 'game/sprites/world/sky_background.png');
    
    /* ------ END GAME ------ */
    this.load.spritesheet('end_game', 'game/sprites/menus/EndGameSpritesheet.png', {
      frameWidth: 800,
      frameHeight: 600
    });

    console.log("%c-------------------------------------------------------------------------------", "color: red; font-weight: bold;");
  }

  sendProgress(progress) {
    console.log("%cDEBUG | %c", "color: red; font-weight: bold;", "background-color: none; color: white; font-weight: bold;", progress);
  }

  create() {
    this.scene.start("MainMenuScene");
  }
}
