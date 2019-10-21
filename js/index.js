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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let goal;
let cursors;
let music;
let pointer;

let game = new Phaser.Game(config);

function preload () {
    this.load.image('player', 'assets/ilkke.png');
    this.load.image('bg', 'assets/space.jpg');
    this.load.image('brain', 'assets/brain.png');
    this.load.image('morty','assets/morty.png');
    this.load.image('ayu', 'assets/ayu2.png');
    this.load.image('poo', 'assets/poo.png');
    this.load.image('saw', 'assets/saw.png');
    this.load.image('metalfaces', 'assets/metalface78x92.png');

    this.load.audio('beat', 'assets/drums.mp3');
}

function create () {
    //background image
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)

    //music
    music = this.sound.add('beat', { loop: true });

    //player object
    player = this.matter.add.image((this.cameras.main.width / 2), 715, 'player');

    player.setFixedRotation();
    player.setAngle(0);
    player.setFrictionAir(.05);
    player.setMass(40);

    //obstacle objects
    let cat1 = this.matter.world.nextCategory();
    player.setCollisionCategory(cat1).setCollidesWith([cat1]);
    

    let cat2 = this.matter.world.nextCategory();
    let obstacleNames = ['morty', 'ayu', 'poo', 'saw'];
    for(let i = 0; i < obstacleNames.length; i++) {
        randX = Math.floor((Math.random() * this.cameras.main.width) - 50);
        let obstacle = this.matter.add.image(randX, (this.cameras.main.height - 300) - (i * 100), obstacleNames[i], null, { isStatic: true });
        
        obstacle.setCollisionCategory(cat1).setCollisionGroup(-1);
    }

    //goal object
    goal = this.matter.add.image(this.cameras.main.width / 2, 50, 'metalfaces', null, { isStatic: true });
    goal.setCollisionCategory(cat1)

    //collision handling
    this.matter.world.on('collisionstart', function(event, bodyA, bodyB) {
        console.log(`bodyA: ${bodyA.id}`);
        console.log(`bodyB: ${bodyB.id}`);
        if (bodyB === goal.body) {
            win();
        }
        else {
            loss();
        }
    })

    //input keys
    cursors = this.input.keyboard.createCursorKeys();

    //mouse pointer - currently only used to play/stop music
    pointer = this.input.activePointer;
    this.input.on('pointerdown', function(pointer) {
        if (music.isPlaying) {
            music.stop();
        }
        else {
            music.play();
        }
    })
}

function update () {
    //mouse input handling

    //keyboard input handling
    if (cursors.space.isDown) {
        noclip();
    }
    else {
        clip();
    }

    if (cursors.shift.isDown) {
        player.setVelocity(0, 0);
    }
    else {
        if (cursors.left.isDown) {
            if (!cursors.right.isDown) {
                player.thrustBack(0.1);
            }
        }
        else if (cursors.right.isDown) {
            player.thrust(0.1);
        }
    
        if (cursors.up.isDown) {
            if (!cursors.down.isDown) {
                player.thrustLeft(0.1);
            }
        }
        else if (cursors.down.isDown) {
            player.thrustRight(0.1);
        }
    }
}

function noclip() {
    //player becomes transparent and can noclip through anything
    player.alpha = 0.5;
    player.setCollisionGroup(-1);
}

function clip() {
    //player is no longer transparent nor able to noclip
    player.alpha = 1;
    player.setCollisionGroup(0);
}

function loss() {
    console.log('game loss');
}

function win() {
    console.log('game win');
}