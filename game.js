class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.atlas('flares', 'https://labs.phaser.io/assets/particles/flares.png' , 'https://labs.phaser.io/assets/particles/flares.json');
    }

    create() {

        const spellEmitter = this.add.particles(400, 250, 'flares', {
            frame: [ 'blue', 'white'],
            lifespan: 4000,
            speed: { min: 50, max: 100 },
            scale: { start: 0.2, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        });

        const fireEmitter = this.add.particles(400, 250, 'flares', {
            frame: 'white',
            color: [ 0xfacc22, 0xf89800, 0xf83600, 0x9f0404 ],
            colorEase: 'quad.out',
            lifespan: 2400,
            speed: { min: 80, max: 120 },
            scale: { start: 0.7, end: 0, ease: 'sine.out' },
            blendMode: 'ADD',
            emitting: false,
        });

        const poisonEmitter = this.add.particles(400, 250, 'flares', {
            frame: 'blue',
            color: [ 0x32cd32, 0x228b22, 0x006400, 0x2f4f2f ],
            colorEase: 'sine.inOut',
            lifespan: 3500,
            speed: { min: 30, max: 60 },
            scale: { start: 0.2, end: 0.9, ease: 'quad.out' },
            gravityY: -10,
            blendMode: 'ADD',
            emitting: false,
            alpha: { start: 0.8, end: 0 },
            angle: { min: -150, max: 0 }
        });

        // Lightning emitter
        const lightningEmitter = this.add.particles(400, 100, 'flares', {
            frame: ['yellow', 'white'],
            lifespan: { min: 100, max: 2000 },
            speed: { min: 200, max: 400 },
            scale: { start: 0.3, end: 0 },
            angle: { min: 80, max: 100 },
            blendMode: 'SCREEN',
            emitting: false,
            gravityY: 20,
            frequency: -1,
            alpha: { start: 0.9, end: 0 },
        });

        this.createButton(spellEmitter, fireEmitter, poisonEmitter, lightningEmitter);
    }


    createButton(spellEmitter, fireEmitter, poisonEmitter, lightningEmitter) {

        const buttonY = 500;
        const buttonWidth = 100;
        const buttonHeight = 40;
        const gap = 20; // Gap between buttons
        
        // Calculate total width needed for all buttons with gaps
        const totalButtonsWidth = 4 * buttonWidth + 3 * gap;
        
        // Calculate starting X position to center the group
        const startX = 400 - (totalButtonsWidth / 2) + (buttonWidth / 2);

        // spell button
        this.spellButton = this.add.rectangle(startX + buttonWidth + gap, buttonY, buttonWidth, buttonHeight, 0x77BEF0)
            .setInteractive()
            .setOrigin(0.5);
        
        this.add.text(startX + buttonWidth + gap, buttonY, 'Spell', {
            fontFamily: 'dogicaPixel',
            fontSize: '18px',
            fill: '#F5EFE6'
        }).setOrigin(0.5);

        this.spellButton.on('pointerdown', () => {
            spellEmitter.explode(16);
        });

        // explosion button
        this.fireButton = this.add.rectangle(startX + 2 * (buttonWidth + gap), buttonY, buttonWidth, buttonHeight, 0xEA5B6F)
            .setInteractive()
            .setOrigin(0.5);
        
        this.add.text(startX + 2 * (buttonWidth + gap), buttonY, 'Fire', {
            fontFamily: 'dogicaPixel',
            fontSize: '18px',
            fill: '#F5EFE6'
        }).setOrigin(0.5);

        this.fireButton.on('pointerdown', () => {
            fireEmitter.explode(20);
        });

        // poison button
        this.poisonButton = this.add.rectangle(startX + 3 * (buttonWidth + gap), buttonY, buttonWidth, buttonHeight, 0x8ABB6C)
        .setInteractive()
        .setOrigin(0.5);

        this.add.text(startX + 3 * (buttonWidth + gap), buttonY, 'Poison', {
            fontFamily: 'dogicaPixel',
            fontSize: '18px',
            fill: '#F5EFE6'
        }).setOrigin(0.5);

        this.poisonButton.on('pointerdown', () => {
            poisonEmitter.explode(25);
        });

         // Lightning button
         this.lightningButton = this.add.rectangle(startX, buttonY, buttonWidth, buttonHeight, 0xFFCB61)
         .setInteractive()
         .setOrigin(0.5);

         this.add.text(startX, buttonY, 'Storm', {
            fontFamily: 'dogicaPixel',
            fontSize: '18px',
            fill: '#F5EFE6'
        }).setOrigin(0.5);

        this.lightningButton.on('pointerdown', () => {
            // Create multiple lightning strikes in sequence
            const strikes = 2;
            const delayBetweenStrikes = 150;
            
            for (let i = 0; i < strikes; i++) {
                this.time.delayedCall(i * delayBetweenStrikes, () => {
                    // Random position for each strike
                    const xPos = Phaser.Math.Between(200, 600);
                    lightningEmitter.setPosition(xPos, 30);
                    
                    // Flash effect for each strike
                    this.cameras.main.flash(100, 255, 255, 255, false);
                    
                    // Create main lightning bolt
                    lightningEmitter.explode(Phaser.Math.Between(8, 12));
                    
                    // Add branching particles for more realistic lightning
                    this.time.delayedCall(50, () => {
                        for (let j = 0; j < 2; j++) {
                            const branchX = xPos + Phaser.Math.Between(-100, 100);
                            lightningEmitter.setPosition(branchX, 70);
                            lightningEmitter.explode(Phaser.Math.Between(3, 6));
                        }
                    });
                });
            }
            
            // Add screen shake
            this.cameras.main.shake(200, 0.01);
        });
    }
}