class Victory extends Phaser.Scene {
    constructor() {
        super({key: 'Victory'});
    }

    create() {
        this.van = this.sound.add('van', { loop: false });
        this.van.play();

        let taiko = this.add.image((this.game.config.width / 2), (this.game.config.height / 2), 'taiko');
        let text = this.add.text((this.game.config.width / 2) - 200, (this.game.config.height - 60), 'YOU\'RE WINNER!', 
            { font: '48px Arial', fill: '#00ff00' });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        if (this.cursors.space.isDown) {
            this.scene.start('PlayGame');
        }
    }
}

export default Victory;