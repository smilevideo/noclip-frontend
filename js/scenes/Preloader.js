class Preloader extends Phaser.Scene {
    constructor() {
        super({key: 'Preloader'});
    }

    preload() {
        this.load.image('player', 'assets/images/ilkke.png');
        this.load.image('bg', 'assets/images/space.jpg');
        this.load.image('brain', 'assets/images/brain.png');
        this.load.image('morty','assets/images/morty.png');
        this.load.image('ayu2', 'assets/images/ayu2.png');
        this.load.image('poo', 'assets/images/poo.png');
        this.load.image('saw', 'assets/images/saw.png');
        this.load.image('energyBar', 'assets/images/rastercarpet32.png');
        this.load.image('blueParticle', 'assets/images/blue.png');
        this.load.image('taiko', 'assets/images/taikodrummaster.jpg');
    
        this.load.audio('beat', 'assets/audio/8bit_williamtell.mp3');
    }

    create() {
        console.log('Preload Complete');
        this.scene.start('PlayGame');
    }
}