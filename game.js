class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.atlas('flares', 'https://labs.phaser.io/assets/particles/flares.png' , 'https://labs.phaser.io/assets/particles/flares.json');
    }

    create() {
        const emitter = this.add.particles(400, 250, 'flares', {
            frame: [ 'blue', 'white'],
            lifespan: 4000,
            speed: { min: 50, max: 100 },
            scale: { start: 0.2, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        });

        this.createButton(emitter);
    }

    createButton(emitter) {
        this.button = this.add.rectangle(400, 500, 200, 50, 0x3498db)
            .setInteractive()
            .setOrigin(0.5);
        
        this.add.text(400, 500, 'Cast Spell', {
            fontSize: '20px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.button.on('pointerdown', () => {
            emitter.explode(16);
        });
    }
}