export default class Enemy {
    constructor(scene, x, y, player, sprite) {
        this.scene = scene;

        /* ------ PLAYER & SPRITE ------ */
        this.player = player;
        this.sprite = scene.physics.add.sprite(x, y, sprite).setScale(1.5);
        this.createAnimations(sprite);

        /* ------ GAME MECHANICS ------ */
        this.health = 4;
        this.maxHealth = 4;

        /* ------ PHYSICS ------ */
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.gravity.y = 1000;

        /* ------ HEALTH BAR ------ */
        this.healthBar = scene.add.graphics();
        this.updateHealthBar();

        /* ------ INITIAL SETUP ------ */
        this.destroyed = false;

        /* ------ SOUND ------ */
        this.sfx = {
            damage: scene.sound.add('enemy_damage', { volume: 0.1, loop: false }),
            death: scene.sound.add('enemy_death', { volume: 0.1, loop: false })
        };
    }

    /* ------ ANIMATIONS ------ */
    createAnimations(sprite) {
        if (!this.scene.anims.exists(`${sprite}_left`)) {
            this.scene.anims.create({
                key: `${sprite}_left`,
                frames: this.scene.anims.generateFrameNumbers(sprite, { start: 3, end: 5 }),
                frameRate: 20,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists(`${sprite}_turn`)) {
            this.scene.anims.create({
                key: `${sprite}_turn`,
                frames: [{ key: sprite, frame: 1 }],
                frameRate: 20
            });
        }

        if (!this.scene.anims.exists(`${sprite}_right`)) {
            this.scene.anims.create({
                key: `${sprite}_right`,
                frames: this.scene.anims.generateFrameNumbers(sprite, { start: 6, end: 8 }),
                frameRate: 20,
                repeat: -1
            });
        }
    }

    playAnimation(anim) {
        if (this.sprite) {
            this.sprite.anims.play(anim, true);
        }
    }

    /* ------ HEALTH RELATED ------ */
    updateHealthBar() {
        if (this.healthBar) {
            this.healthBar.clear();
            
            const barWidth = 50;
            const barHeight = 10;
            const x = this.sprite.x - barWidth / 2;
            const y = this.sprite.y - this.sprite.height * 1.5;
            
            this.healthBar.fillStyle(0x000000, 1);
            this.healthBar.fillRect(x, y, barWidth, barHeight);
            
            const healthPercentage = this.health / this.maxHealth;
            
            this.healthBar.fillStyle(0xff0000, 1);
            this.healthBar.fillRect(x, y, barWidth * healthPercentage, barHeight);
        }
    }

    isDead() {
        return this.health <= 0;
    }

    /* ------ PVP ------ */
    damage(hp) {
        this.sfx.damage.play();
        this.health -= hp;

        if (this.health < 0) 
            this.health = 0;

        this.updateHealthBar();

        if (this.isDead()) {
            this.sfx.death.play();
            this.destroy();
        }
    }

    /* ------ UPDATE ------ */
    update() {
        if (this.destroyed) return;
        if (!this.sprite.active) return;
        if (this.isDead()) {
            this.destroy();
            return;
        }
        
        const playerX = this.player.x;
        const directionX = playerX - this.sprite.x;
        const magnitude = Math.abs(directionX);
        const normalizedDirectionX = directionX / magnitude;
        const speed = 65;
        
        this.sprite.setVelocityX(normalizedDirectionX * speed);
        
        const jumpHeight = 400;
        const obstacleCheckDistance = 50;

        if (this.sprite.body.onFloor() && this.sprite.body.velocity.x !== 0) {
            const obstacleCheckX = this.sprite.x + (normalizedDirectionX * obstacleCheckDistance);
            const obstacleCheckY = this.sprite.y + (this.sprite.height / 2);
            const obstacle = this.scene.physics.overlapRect(obstacleCheckX, obstacleCheckY, 10, 10);

            if (obstacle.length > 0) {
                this.sprite.setVelocityY(-jumpHeight);
            }
        }

        if (directionX < 0) {
            this.playAnimation(`${this.sprite.texture.key}_left`);
        } else if (directionX > 0) {
            this.playAnimation(`${this.sprite.texture.key}_right`);
        } else {
            this.playAnimation(`${this.sprite.texture.key}_turn`);
        }

        this.updateHealthBar();
    }

    destroy() {
        if (!this.destroyed) {
            this.destroyed = true;
            if (this.sprite) {
                this.sprite.destroy();
            }
            if (this.healthBar) {
                this.healthBar.clear();
                this.healthBar.destroy();
            }
            this.scene.enemies = this.scene.enemies.filter(enemy => enemy !== this);
        }
    }

    kill() {
        this.damage(4);
    }

    /* ------ GETS ------ */
    getSprite() {
        return this.sprite;
    }

    get x() {
        return this.sprite ? this.sprite.x : 0;
    }

    get y() {
        return this.sprite ? this.sprite.y : 0;
    }
}
