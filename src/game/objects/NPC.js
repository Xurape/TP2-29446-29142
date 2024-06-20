import dialogs from '../assets/npc/dialogs.js';

export default class NPC {
    constructor(scene, x, y, sprite, npc_name, npc_displayName) {
        this.scene = scene;

        /* ------ NPC META ------ */
        this.npc_name = npc_name;
        this.npc_displayName = npc_displayName;
        
        /* ------ PLAYER META ------ */
        this.playerName = "Random";
        
        /* ------ VARIABLES ------ */
        this.isDead = false;
        this.canInteract = true;
        this.globalDialogIndex = 0;

        /* ------ SPRITE ------ */
        this.sprite = scene.physics.add.sprite(x, y, sprite).setScale(1.5);

        /* ------ PHYSICS ------ */
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);

        /* ------ SOUND ------ */
        this.sfx = {
            talking: scene.sound.add('npc_talking', { volume: 0.05, loop: false }),
            hurt: scene.sound.add('character_hurt', { volume: 0.1, loop: false }),
        }

        /* ------ DIALOG ------ */
        this.dialog = null;
        this.dialogs = dialogs;

        this.setup();

        this.createNPCAnimations();
        this.playAnimation('stopped');
    }

    /* ------ NPC ANIMATIONS ------ */
    createNPCAnimations() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('angel_01', { start: 3, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'stopped',
            frames: [ { key: 'angel_01', frame: 1 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('angel_01', { start: 6, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
    }

    playAnimation(anim) {
        this.sprite.anims.play(anim, true);
    }

    /* ------ GRAPHICAL ------ */
    setup() {
        this.nameText = this.scene.add.text(this.sprite.x - 20, this.sprite.y - 30, this.npc_displayName, { fontSize: '16px', fill: '#000' }).setDepth(3).setScrollFactor(0);
    }

    update() {
        this.nameText.x = this.sprite.x - 20;
        this.nameText.y = this.sprite.y - 50;
    }

    /* ------ DIALOG ------ */
    startDialogList() {
        this.dialog = this.dialogs[this.npc_name];
        let dialogIndex = 0;

        if(this.globalDialogIndex != 0) {
            dialogIndex = this.globalDialogIndex - 1;
            console.log(dialogIndex);
        }

        this.sfx.talking.play();

        this.displayDialog(this.dialog[dialogIndex].text, this.dialog[dialogIndex].text_newline, this.dialog[dialogIndex].text_newline_2);

        if(this.dialog[dialogIndex].hasInput) {
            if(this.dialog[dialogIndex].inputType == "playerName") {
                setTimeout(() => {
                    this.playerName = prompt(this.dialog[dialogIndex].inputText);
                }, 1000);
            } else if (this.dialog[dialogIndex].inputType == "riddle") {
                setTimeout(() => {
                    const input = prompt(this.dialog[dialogIndex].inputText);

                    if(this.dialog[dialogIndex].inputAnswers.includes(input)) {
                        alert("Hmmm, seu chico esperto! Pode ser que não seja tão chato :)");
                        this.kill();
                        this.scene.removeBarricade();
                        this.scene.canInteractNPC = false;
                        this.scene.isWinnable = true;
                    } else {
                        alert("MEEEEEHHH, erraste nabo! Vou-te pôr aqui uns amiguinhos para te ajudar a pensar melhor na resposta!");
                        this.scene.spawnEnemies(10);
                    }
                }, 5000);
            }
        }

        const showNextDialog = () => {
            dialogIndex++;
            this.globalDialogIndex++;

            this.dialogBackground.destroy();
            this.dialogTitle.destroy();
            this.dialogText.destroy();
            this.dialogTextNewLine.destroy();
            this.dialogTextNewLine_2.destroy();

            if(dialogIndex < this.dialog.length) {
                this.displayDialog(this.dialog[dialogIndex].text, this.dialog[dialogIndex].text_newline, this.dialog[dialogIndex].text_newline_2);

                if(this.dialog[dialogIndex].hasInput) {
                    if(this.dialog[dialogIndex].inputType == "playerName") {
                        setTimeout(() => {
                            this.playerName = prompt(this.dialog[dialogIndex].inputText);
                        }, 1000);
                    } else if (this.dialog[dialogIndex].inputType == "riddle") {
                        setTimeout(() => {
                            const input = prompt(this.dialog[dialogIndex].inputText);

                            if(this.dialog[dialogIndex].inputAnswers.includes(input)) {
                                alert("Hmmm, seu chico esperto! Pode ser que não seja tão chato :)");
                                this.kill();
                                this.scene.removeBarricade();
                                this.scene.canInteractNPC = false;
                                this.scene.isWinnable = true;
                            } else {
                                alert("MEEEEEHHH, erraste nabo! Vou-te pôr aqui uns amiguinhos para te ajudar a pensar melhor na resposta!");
                                this.scene.spawnEnemies(10);
                            }
                        }, 5000);
                    }
                }
            }
        };

        this.scene.input.on('pointerdown', showNextDialog);

        if(dialogIndex == this.dialog.length - 1) {
            this.canInteract = true;
        }
    }

    closeDialog() {
        this.dialogBackground.destroy();
        this.dialogTitle.destroy();
        this.dialogText.destroy();
        this.dialogTextNewLine.destroy();
        this.dialogTextNewLine_2.destroy();
    }

    displayDialog(text, text_newline, text_newline_2) {
        this.dialogBackground = this.scene.add.image(400, 400, 'dialog_box').setScale(0.40).setDepth(2).setScrollFactor(0);
        this.dialogTitle = this.scene.add.text(235, 320, this.npc_displayName, { fontSize: '32px', fill: '#000' }).setDepth(3).setScrollFactor(0);
        this.dialogText = this.scene.add.text(225, 380, text, { fontSize: '16px', fill: '#000' }).setDepth(3).setScrollFactor(0);
        this.dialogTextNewLine = this.scene.add.text(225, 405, text_newline, { fontSize: '16px', fill: '#000' }).setDepth(3).setScrollFactor(0);
        this.dialogTextNewLine_2 = this.scene.add.text(225, 430, text_newline_2, { fontSize: '16px', fill: '#000' }).setDepth(3).setScrollFactor(0);

        this.dialogText.setText(this.dialogText.text.replace('{playerName}', this.playerName));
        this.dialogTextNewLine.setText(this.dialogTextNewLine.text.replace('{playerName}', this.playerName));
        this.dialogTextNewLine_2.setText(this.dialogTextNewLine_2.text.replace('{playerName}', this.playerName));
    }

    /* ------ MECHANICS ------ */
    kill() {
        if(!this.isDead) {
            this.sprite.setTint(0xff0000);
            this.sfx.hurt.play();
            this.isDead = true;

            setTimeout(() => { 
                this.sprite.destroy();
                this.nameText.destroy();
            }, 4000);
        }
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