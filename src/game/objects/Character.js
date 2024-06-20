export default class Character {
    constructor(scene, input, x, y) {
        this.scene = scene;
        this.xPos = x;
        this.yPos = y;

        /* ------ MOVEMENT ------ */
        this.jumpCooldown = 1000; // 1 second
        this.canJump = true;
        this.keyboardInput = input;
        this.cursors = input.keyboard.createCursorKeys();
        this.aKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        input.on(Phaser.Input.Events.POINTER_DOWN, this.attack);
        
        /* ------ GAME MECHANICS ------ */
        this.lives = 5;
        this.canDie = true;
        this.hearts = [];
        this.heartsNumber = this.lives;
        this.canTakeDamage = true;
        this.damageCooldown = 3000;
        this.livesAnimations = {
            LOSE_ALL: 'LOSE_ALL',
            REGEN_ALL: 'REGEN_ALL',
            LOSE_FIRST_HALF: 'LOSE_FIRST_HALF',
            LOSE_SECOND_HALF: 'LOSE_SECOND_HALF',
        }

        /* ------ UI ------ */
        this.scene.anims.create({
            key: this.livesAnimations.LOSE_ALL,
            frames: this.scene.anims.generateFrameNumbers('lives', { start: 0, end: 4 }),
            frameRate: 10,
        })

        this.scene.anims.create({
            key: this.livesAnimations.REGEN_ALL,
            frames: this.scene.anims.generateFrameNumbers('lives', { start: 4, end: 0 }),
            frameRate: 10,
        })

        for(let i = 0; i < this.heartsNumber; i++) {
            this.hearts.push(this.renderLives(i));
        }

        /* ------ PVP RELATED ------ */
        this.isDead = false;

        /* ------ CHARACTER ANIMATIONS ------ */
        this.createPlayerAnimations();

        /* ------ CHARACTER SPRITE ------ */
        this.sprite = scene.physics.add.sprite(x, y, 'character').setScale(1.5);
        this.playAnimation('turn');

        /* ------ PHYSICS ------ */
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);

        /* ------ SOUND ------ */
        this.sfx = {
            jump: scene.sound.add('character_jump', { volume: 0.1, loop: false }),
            hurt: scene.sound.add('character_hurt', { volume: 0.1, loop: false }),
            death: scene.sound.add('character_death', { volume: 0.1, loop: false })
        };
    }

    /* ------ ACTIONS RELATED ------ */
    update() {
        if (this.aKey.isDown)
            this.moveLeft();
        
        if (this.dKey.isDown)
            this.moveRight();
        
        if (this.spaceKey.isDown) {
            if (!this.isFalling()) {
                this.jump();
            }
        }

        if(!this.aKey.isDown && !this.dKey.isDown) {
            this.stop();
        }
    }

    /* ------ CHARACTER ANIMATIONS ------ */
    createPlayerAnimations() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'character', frame: 1 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('character', { start: 6, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
    }

    playAnimation(anim) {
        this.sprite.anims.play(anim, true);
    }

    /* ------ UI ------ */
    renderLives(x) {
        return this.scene.add.sprite(20 + x * 50, 20, 'lives', 0).setScale(0.1).setOrigin(0);
    }

    /* ------ HEALTH RELATED ------ */
    damage() {
        if(this.lives == 1) {
            this.isDead = true;
            this.kill();
            return;
        }

        let heartIndex = this.lives - 1;
        this.hearts[heartIndex].play(this.livesAnimations.LOSE_ALL);
        this.lives--;
        this.sfx.hurt.play();
    }

    heal() {
        let heartIndex = this.lives;
        this.hearts[heartIndex].play(this.livesAnimations.REGEN_ALL);
        this.lives++;
    }
    
    /* ------ MOVEMENT ------ */
    moveLeft() {
        if(this.isDead) return;
        this.sprite.setVelocityX(-160);
        this.playAnimation('left');
    }

    moveRight() {
        if(this.isDead) return;

        this.sprite.setVelocityX(160);
        this.playAnimation('right');
    }

    jump() {
        if(!this.canJump) return;
        if(this.isDead) return;

        this.sprite.setVelocityY(-230);
        this.playAnimation('turn');
        this.sfx.jump.play();

        this.canJump = false;
        setTimeout(() => {
            this.canJump = true;
        }, this.jumpCooldown);
    }

    stop() {
        this.sprite.setVelocityX(0);
        this.playAnimation('turn');
    }

    /* ------ COMBAT ------ */
    attack() {
        console.log('%cDEBUG | %cPlayer has attacked!', 'color: red; font-weight: bold;', 'background-color: none; color: white; font-weight: bold;');
    }

    /* ------ CHECKS ------ */
    isMoving() {
        return this.sprite.body.velocity.x !== 0;
    }

    isFalling() {
        return this.sprite.body.velocity.y > 0;
    }

    isDead() {
        return this.sprite.y > 600;
    }

    kill() {
        if(this.canDie) {
            this.canDie = false;
            this.stop();

            this.damage();
            this.damage();
            this.damage();
            this.damage();
            this.damage();

            this.isDead = true;
    
            this.sfx.death.play();
            this.sprite.setTint(0xff0000);
            
            console.log('%cDEBUG | %cPlayer has died!', 'color: red; font-weight: bold;', 'background-color: none; color: white; font-weight: bold;');
    
            setTimeout(() => {
                this.respawn();
                this.canDie = true;
            }, 1000);
        }
    }

    respawn() {
        this.sprite.setTint(0xffffff);
        this.sprite.x = this.xPos;
        this.sprite.y = this.yPos;
        
        setTimeout(() => { this.heal(); }, 1000);
        setTimeout(() => { this.heal(); }, 1500);
        setTimeout(() => { this.heal(); }, 2000);
        setTimeout(() => { this.heal(); }, 2500);
        setTimeout(() => { this.heal(); }, 3000);

        this.isDead = false;
    }

    destroy() {
        this.sprite.destroy();
    }

    /* ------ GETS ------ */
    getSprite() {
        return this.sprite;
    }

    get x() {
        return this.sprite.x;
    }

    get y() {
        return this.sprite.y;
    }
}