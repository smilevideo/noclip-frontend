class Initializer extends Phaser.Scene {
    constructor() {
        super({key: 'Initializer'});
    }

    preload() {
        this.load.spritesheet('ufo', 'assets/images/ufo/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('bg', 'assets/images/space.jpg');
        this.load.image('brain', 'assets/images/brain.png');
        this.load.image('morty','assets/images/morty.png');
        this.load.image('ayu2', 'assets/images/ayu2.png');
        this.load.image('poo', 'assets/images/poo.png');
        this.load.image('saw', 'assets/images/saw.png');
        this.load.image('energyBar', 'assets/images/rastercarpet32.png');
        this.load.image('blueParticle', 'assets/images/blue.png');
        this.load.image('taiko', 'assets/images/taikodrummaster.jpg');

        this.load.json('shapes', 'assets/images/shapes.json');
        this.load.json('test', 'assets/images/test.json');
    
        this.load.audio('beat', 'assets/audio/8bit_williamtell.mp3');
    }

    create() {
        console.log('Preload Complete');
        this.scene.start('PlayGame');

        //music
        this.music = this.sound.add('beat', { loop: true });
        this.music.play();

        this.pointer = this.input.activePointer;
        this.input.on('pointerdown', () => {
            if (this.music.isPlaying) {
                this.music.pause();
            }
            else {
                this.music.resume();
            }
        })
    }
}

export default Initializer;