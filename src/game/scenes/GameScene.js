import { Scene } from "phaser";
import Character from "../objects/Character";
import Enemy from "../objects/Enemy";
import NPC from "../objects/NPC";

export class GameScene extends Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        /* ------ ENVIRONMENT ------ */
        this.platform = null;
        this.buildEnvironment();

        /* ------ CHARACTER ------ */
        this.character = new Character(this, this.input, 100, 100);

        /* ------ ENEMIES ------ */
        this.enemies = [];
        this.spawnEnemy();

        /* ------ NPC ------ */
        this.npc = new NPC(this, 370, 100, 'angel_01', "angel", "Angel");
        this.canInteractNPC = true;

        /* ------ EVENTS ------ */
        this.createTimeEvents();
        this.isWinnable = false;

        /* ------ COLLIDERS ------ */
        this.setupColliders();

        /* ------ PAUSE SCREEN ------ */
        this.buildPauseScreen();

        /* ------ SOUND ------ */
        this.sfx = {
            ambient: this.sound.add('ambient', { volume: 0.05, loop: true }),
            music_1: this.sound.add('during_game_1', { volume: 0.03, loop: true }),
        }

        this.sfx.ambient.play();
        this.sfx.music_1.play();
    }

    /* ------ ENVIRONMENT ------ */
    buildEnvironment() {
        this.add.image(400, 300, 'background');

        this.structures = [
            {"gid":8,"height":35.9492,"id":151,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":83.5616,"y":198.577},{"gid":25,"height":27.2028,"id":152,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":580.603,"y":472.142},{"gid":25,"height":27.2028,"id":153,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":471.88,"y":472.301},{"gid":11,"height":27.2028,"id":154,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":499.081,"y":474.02},{"gid":12,"height":27.2028,"id":155,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":526.285,"y":472.32},{"gid":13,"height":27.2028,"id":156,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":553.434,"y":474.02},{"gid":58,"height":15.6484,"id":157,"name":"","rotation":0,"type":"","visible":true,"width":14.4081,"x":82.4298,"y":163.665},{"gid":8,"height":35.9491,"id":158,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":183.978,"y":225.212},{"gid":8,"height":38.6876,"id":162,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":100.129,"y":499.446},{"gid":8,"height":38.6876,"id":166,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":209.967,"y":381.361},{"gid":8,"height":38.6876,"id":168,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":248.474,"y":381.31},{"gid":8,"height":38.6876,"id":170,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":286.889,"y":381.314},{"gid":8,"height":38.6876,"id":172,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":325.396,"y":381.342},{"gid":24,"height":38.7425,"id":173,"name":"","rotation":0,"type":"","visible":true,"width":38.6374,"x":362.569,"y":379.797},{"gid":8,"height":38.6876,"id":174,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":362.642,"y":343.5},{"gid":8,"height":38.6876,"id":176,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":476.84,"y":343.5},{"gid":8,"height":38.6876,"id":178,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":671.846666666667,"y":361.47},{"gid":24,"height":38.7425,"id":179,"name":"","rotation":0,"type":"","visible":true,"width":38.6374,"x":708.92,"y":361.469},{"gid":24,"height":38.7425,"id":180,"name":"","rotation":0,"type":"","visible":true,"width":38.6374,"x":746.31,"y":361.326},{"gid":8,"height":38.6876,"id":181,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":708.924,"y":325.14},{"gid":8,"height":38.6876,"id":182,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":746.26,"y":325.049},{"gid":8,"height":38.6876,"id":190,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":400.428,"y":343.5},{"gid":57,"height":21.5894,"id":203,"name":"","rotation":0,"type":"","visible":true,"width":21.5894,"x":759.752,"y":286.562},{"gid":57,"height":21.5894,"id":204,"name":"","rotation":0,"type":"","visible":true,"width":21.5894,"x":759.752,"y":265.141},{"gid":57,"height":21.5894,"id":205,"name":"","rotation":0,"type":"","visible":true,"width":21.5894,"x":759.797,"y":243.746},{"gid":57,"height":21.5894,"id":206,"name":"","rotation":0,"type":"","visible":true,"width":21.5894,"x":759.797,"y":222.325},{"gid":8,"height":35.9491,"id":207,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":268.07425,"y":158.02545},{"gid":8,"height":35.9491,"id":209,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":304.07425,"y":158.03},{"gid":8,"height":35.9491,"id":210,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":339.07425,"y":158.03},{"gid":8,"height":35.9491,"id":211,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":375.07425,"y":158.03},{"gid":8,"height":35.9491,"id":212,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":411.57425,"y":158.02545},{"gid":8,"height":35.9491,"id":213,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":447.57425,"y":158.02545},{"gid":8,"height":38.6876,"id":214,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":439.042033333333,"y":343.5},{"gid":25,"height":27.2028,"id":215,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":424.7601,"y":537.4471},{"gid":25,"height":27.2028,"id":216,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":316.0371,"y":537.6061},{"gid":11,"height":27.2028,"id":217,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":343.2381,"y":539.3251},{"gid":12,"height":27.2028,"id":218,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":370.4421,"y":537.6251},{"gid":13,"height":27.2028,"id":219,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":397.5911,"y":539.3251},{"gid":25,"height":27.2028,"id":221,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":257.7601,"y":516.4471},{"gid":25,"height":27.2028,"id":222,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":149.0371,"y":516.6061},{"gid":11,"height":27.2028,"id":223,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":176.2381,"y":518.3251},{"gid":12,"height":27.2028,"id":224,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":203.4421,"y":516.6251},{"gid":13,"height":27.2028,"id":225,"name":"","rotation":0,"type":"","visible":true,"width":27.2028,"x":230.5911,"y":518.3251},{"gid":8,"height":38.6876,"id":227,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":170.7087,"y":381.36},{"gid":8,"height":38.6876,"id":228,"name":"","rotation":0,"type":"","visible":true,"width":38.5826,"x":51.7087,"y":452.6562},{"gid":8,"height":35.9491,"id":229,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":569.07425,"y":266.02545},{"gid":8,"height":35.9491,"id":230,"name":"","rotation":0,"type":"","visible":true,"width":35.8515,"x":617.07425,"y":211.02545}
        ];

        this.structureGroup = this.add.group();

        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 668, 'floor').refreshBody();

        this.structureGroup = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            allowGravity: false
        });

        this.structures.forEach(structure => {
            let sprite = this.structureGroup.create(structure.x, structure.y, 'tiles', structure.gid - 2)
             .setOrigin(0, 1)
             .setScale(2)
             .setDisplaySize(structure.width, structure.height)
             .body.immovable = true;
        });
    }

    /* ------ ENEMIES ------ */
    spawnEnemy() {
        const enemySprites = ['enemy_1', 'enemy_2', 'enemy_3', 'enemy_4', 'enemy_5'];

        const sprite = enemySprites[Phaser.Math.Between(0, enemySprites.length - 1)];

        const x = Phaser.Math.Between(50, 750);

        const enemy = new Enemy(this, x, 100, this.character.getSprite(), sprite);
        this.enemies.push(enemy);

        this.physics.add.collider(enemy.getSprite(), this.platform, this.handleTouchOnPlatform, null, this);
        this.physics.add.overlap(this.character.getSprite(), enemy.getSprite(), this.handlePlayerOnEnemyHead, null, this);
        this.physics.add.collider(this.character.getSprite(), enemy.getSprite(), this.handleEnemyTouchingPlayer, null, this);
    }
    
    spawnEnemies(quantity) {
        const enemySprites = ['enemy_1', 'enemy_2', 'enemy_3', 'enemy_4', 'enemy_5'];

        const sprite = enemySprites[Phaser.Math.Between(0, enemySprites.length - 1)];
        
        const allowedX = [ 420, 400, 400, 700, 700 ];
        const allowedY = [ 100, 100, 200, 200, 400 ];

        for (let i = 0; i < quantity; i++) {
            const x = allowedX[Math.floor(Math.random() * allowedX.length)];
            const y = allowedY[Math.floor(Math.random() * allowedY.length)];
            const enemy = new Enemy(this, x, y, this.character.getSprite(), sprite);

            this.enemies.push(enemy);

            this.physics.add.collider(enemy.getSprite(), this.platform, this.handleTouchOnPlatform, null, this);

            this.structureGroup.getChildren().forEach(structure => {
                this.physics.add.collider(enemy.getSprite(), structure);
            });

            this.physics.add.overlap(this.character.getSprite(), enemy.getSprite(), this.handlePlayerOnEnemyHead, null, this);
            this.physics.add.collider(this.character.getSprite(), enemy.getSprite(), this.handleEnemyTouchingPlayer, null, this);
        }
    }

    /* ------ COLLIDERS ------ */
    setupColliders() {
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(this.character.getSprite(), enemy.getSprite(), this.handlePlayerOnEnemyHead, null, this);
            this.physics.add.collider(this.character.getSprite(), enemy.getSprite(), this.handleEnemyTouchingPlayer, null, this);
        });

        this.structureGroup.getChildren().forEach(structure => {
            this.physics.add.collider(this.character.getSprite(), structure);
            this.enemies.forEach(enemy => {
                this.physics.add.collider(enemy.getSprite(), structure);
            });
            this.physics.add.collider(this.npc.getSprite(), structure);
        });

        this.physics.add.collider(this.npc.getSprite(), this.character.getSprite());

        this.physics.add.collider(this.character.getSprite(), this.platform, this.handleTouchOnPlatform, null, this);
        this.physics.add.collider(this.npc.getSprite(), this.platform, this.handleTouchOnPlatform, null, this);
    }

    /* ------ PLAYER-NPC interaction ------ */
    checkPlayerNPC() {
        const player = this.character;
        const npc = this.npc;

        const distance = Phaser.Math.Distance.Between(player.sprite.x, player.sprite.y, npc.sprite.x, npc.sprite.y);
    
        this.npcOverText?.destroy();

        if (distance < 150 && this.canInteractNPC) {
            this.npcOverText = this.add.text(npc.sprite.x, npc.sprite.y - 65, 'Clica no [E] para interagir.', { color: '#f7780c', fontSize: '16px', fontFamily: 'Arial' }).setOrigin(0.5);
            this.npcOverText.setScrollFactor(0);

            this.input.keyboard.on('keydown-E', this.interactWithNPC, this);
        }
    }
    
    interactWithNPC() {
        if(this.canInteractNPC) {
            this.canInteractNPC = false;
            this.npcOverText?.destroy();
            this.npc.startDialogList();

            setTimeout(() => {
                this.canInteractNPC = true;
            }, 5000);
        }
    }

    /* ------ Collision handling ------ */
    handlePlayerOnEnemyHead(playerSprite, enemySprite) {
        const player = this.character;
        const enemy = this.enemies.find(en => en.getSprite() === enemySprite);
    
        if (player.sprite.body.velocity.y > 0 && player.sprite.y < enemy.sprite.y) {
            enemy.damage(1);
            player.sprite.setVelocityY(-200);
        }
    } 

    handleEnemyTouchingPlayer(playerSprite, enemySprite) {
        const player = this.character;
        const enemy = this.enemies.find(en => en.getSprite() === enemySprite);
    
        if (player.sprite.y == enemy.sprite.y) {
            if (player.canTakeDamage) {
                player.damage();
                player.canTakeDamage = false;
                player.sprite.setVelocityY(-200);
    
                setTimeout(() => {
                    player.canTakeDamage = true;
                }, player.damageCooldown);
            }
        }

        if (player.sprite.y < enemy.sprite.y) {
            if (player.canTakeDamage) {
                player.damage();
                player.canTakeDamage = false;
                player.sprite.setVelocityY(-200);
    
                setTimeout(() => {
                    player.canTakeDamage = true;
                }, player.damageCooldown);
            }
        }
    }

    handleTouchOnPlatform(sprite, platform) {  
        if (sprite === this.character.getSprite()) {
            this.character.kill();
        }

        const enemy = this.enemies.find(en => en.getSprite() === sprite);

        if (enemy) {
            enemy.kill();
        }

        if (sprite === this.npc.getSprite()) {
            this.npc.kill();
        }
    }

    /* ------ MAP EVENTS ------ */
    removeBarricade() {
        this.structures.forEach(_structure => {
            this.structureGroup.getChildren().forEach(structure => {
                if(_structure.id == 203 || _structure.id == 204 || _structure.id == 205 || _structure.id == 206) {
                    if (structure.x == _structure.x && structure.y == _structure.y) {
                        structure.destroy();
                    }
                }
           });
        });
    }

    tryWinGame() {
        this.structures.forEach(_structure => {
            this.structureGroup.getChildren().forEach(structure => {
                if(_structure.id == 182 && structure.x == _structure.x && structure.y == _structure.y) {
                    if(this.isWinnable) {
                        const playerDistance = Phaser.Math.Distance.Between(this.character.sprite.x, this.character.sprite.y, structure.x, structure.y);
                        if (playerDistance < 70) {
                            this.winGame();
                        }
                    }
                }
           });
        });
    }

    winGame() {
        this.scene.start('EndGameScene', { time: this.timeElapsed });
    }

    /* ------ TIME EVENTS ------ */
    createTimeEvents() {
        // this.time.addEvent({
        //     delay: 20000, // 20s
        //     callback: this.spawnEnemy,
        //     callbackScope: this,
        //     loop: true
        // });
    }

    /* ------ PAUSE SCREEN ------ */
    buildPauseScreen() {
        this.veil = this.add.graphics({ x: 0, y: 0 });
        this.veil.fillStyle(0x000000, 0.3);
        this.veil.fillRect(0, 0, 800, 600);
        this.veil.setDepth(1);
        this.veil.setScrollFactor(0);

        this.pauseBackground = this.add.image(400, 300, 'large_background').setScale(0.25).setDepth(2).setScrollFactor(0);
        this.pauseLogo = this.add.image(400, 100, 'logo').setScale(0.45).setDepth(2).setScrollFactor(0);

        this.buttons = {
            resume: this.add.rectangle(400, 225, 200, 50, 0x000000, 0.5).setDepth(2).setScrollFactor(0),
            restart: this.add.rectangle(400, 295, 200, 50, 0x000000, 0.5).setDepth(2).setScrollFactor(0),
            quit: this.add.rectangle(400, 367, 200, 50, 0x000000, 0.5).setDepth(2).setScrollFactor(0),
        }

        this.buttons.resume.setInteractive();
        this.buttons.restart.setInteractive();
        this.buttons.quit.setInteractive();

        this.buttons.resume.on('pointerdown', this.clickResume, this);
        this.buttons.restart.on('pointerdown', this.clickRestart, this);
        this.buttons.quit.on('pointerdown', this.clickQuit, this);

        this.menu_text = {
            resume: this.add.text(400, 225, 'Continuar', { color: '#ffffff', fontSize: '24px', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(3).setScrollFactor(0),
            restart: this.add.text(400, 295, 'Reiniciar', { color: '#ffffff', fontSize: '24px', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(3).setScrollFactor(0),
            quit: this.add.text(400, 367, 'Menu Principal', { color: '#ffffff', fontSize: '24px', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(3).setScrollFactor(0),
        }

        this.togglePauseScreen(false);
    }

    clickResume() {
        this.isPaused = false;
        this.togglePauseScreen(false);

        this.sfx.ambient.resume();
        this.sfx.music_1.resume();

        this.menu_text.resume.setVisible(false);
        this.menu_text.restart.setVisible(false);
        this.menu_text.quit.setVisible(false);
    }

    clickRestart() {
        this.scene.restart();
    }

    clickQuit() {
        this.scene.start('MainMenuScene');
    }

    togglePauseScreen(isVisible) {
        this.veil.setVisible(isVisible);

        this.pauseBackground.setVisible(isVisible);
        this.pauseLogo.setVisible(isVisible);

        this.buttons.resume.setVisible(isVisible);
        this.buttons.restart.setVisible(isVisible);
        this.buttons.quit.setVisible(isVisible);

        this.menu_text.resume.setVisible(isVisible);
        this.menu_text.restart.setVisible(isVisible);
        this.menu_text.quit.setVisible(isVisible);

        if (isVisible) {
            this.physics.pause();
        } else {
            this.physics.resume();
        }
    }

    clickPause() {
        this.isPaused = !this.isPaused;
        this.togglePauseScreen(this.isPaused);

        if(this.isPaused) {
            this.sfx.ambient.pause();
            this.sfx.music_1.pause();
        } else {
            this.sfx.ambient.resume();
            this.sfx.music_1.resume();
        }
    }

    /* ------ SCREEN ------ */
    updateTimer() {
        if(!this.isPaused) {
            this.timeElapsed = this.timeElapsed || 0;
            this.timeElapsed += 1;
    
            this.timeText?.destroy();
            this.timeText = this.add.text(700, 10, `Tempo: ${Math.floor(this.timeElapsed / 60)}s`, { color: '#ffffff', fontSize: '16px', fontFamily: 'Arial' });
            this.timeText.setScrollFactor(0);
        }
    }

    /* ------ UPDATE ------ */
    update() {
        this.character.update();

        this.enemies.forEach(enemy => enemy.update());

        this.npc.update();
        this.checkPlayerNPC();

        this.input.keyboard.on('keydown-ESC', this.clickPause, this);

        this.updateTimer();

        this.tryWinGame();
    }

    preload() {

    }
}
