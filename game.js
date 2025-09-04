class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    create() {
        this.add.text(400, 300, 'Hello World', {
            fontSize: '48px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }
}