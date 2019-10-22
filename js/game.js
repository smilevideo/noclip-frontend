let config = {
    type: Phaser.WEBGL,
    width: 768,
    height: 768,
    // backgroundColor: '#1b1464',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: true,
            setBounds: true
        }
    },
    title: 'noclip',
    version: '.0001',
    scene: [
        GameScene,
        Victory
    ],
    parent: 'game'
};

let game = new Phaser.Game(config);