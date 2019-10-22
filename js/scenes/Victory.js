class Victory extends Phaser.Scene {
    constructor() {
        super({key: 'Victory'});
    }

    create() {
        let taiko = this.add.image((game.config.width / 2), (game.config.height / 2), 'taiko');
        let text = this.add.text((game.config.width / 2) - 200, game.config.height - 60, 'YOU\'RE WINNER!', 
            { font: '48px Arial', fill: '#00ff00' });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        if (this.cursors.space.isDown) {
            this.scene.start('PlayGame');
        }
    }
}