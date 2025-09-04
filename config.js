const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1a252f',
    parent: 'game-container',
    scene: Game
};

const game = new Phaser.Game(config);