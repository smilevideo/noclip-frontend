class Victory extends Phaser.Scene {
    constructor() {
        super({key: 'Victory'});
    }

    preload() {
        this.load.image('brain', 'assets/brain.png');
    }

    create() {
        this.brain = this.add.image((this.game.config.height / 2), (this.game.config.width / 2), 'brain');
    }
    
}