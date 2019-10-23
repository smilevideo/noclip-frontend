class PlayGame extends Phaser.Scene {
    constructor() {
        super({key: 'PlayGame'});
    }

    create() {
        this.gameWidth = this.cameras.main.width;
        this.gameHeight = this.cameras.main.height;

        let shapes = this.cache.json.get('shapes');

        this.cat1 = this.matter.world.nextCategory();
        this.cat2 = this.matter.world.nextCategory();
        this.cat3 = this.matter.world.nextCategory();
    
        //background image
        let image = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'bg')
        let scaleX = this.gameWidth / image.width
        let scaleY = this.gameHeight / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    
        //player object
        this.player = this.matter.add.sprite((this.gameWidth / 2), 715, 'ufo', null, { 
            shape: shapes.alien10001
        });
        this.player.setCollisionCategory(this.cat1);
        
        this.anims.create({
            key: 'playerHover',
            frames: this.anims.generateFrameNumbers('ufo', { start: 0, end: 14 }),
            frameRate: 20,
            repeat: -1
        })
    
        this.player.angle = 270;
        this.player.setFixedRotation();
        this.player.setFrictionAir(.05);
        this.player.setMass(50);

        //particles for player object
        let playerParticles = this.add.particles('blueParticle');

        let playerEmitter = playerParticles.createEmitter({
            speed: 10,
            scale: { start: 0.15, end: 0 },
            blendMode: 'ADD' 
        });

        playerEmitter.startFollow(this.player);

        //obstacle objects    
        let obstacleNames = ['ayu2', 'morty', 'poo', 'saw'];
        for(let i = 0; i < obstacleNames.length; i++) {
            let spawnX = Math.floor((Math.random() * this.gameWidth) - 50);
            let obstacle = this.matter.add.image(spawnX, (this.gameHeight - 300) - (i * 100), obstacleNames[i], null,
                { shape: shapes[obstacleNames[i]] });

            obstacle.setCollisionCategory(this.cat2);

            let velocityX = Math.floor(Math.random() * 2) + 1;
            if (Math.random() >= .5) {
                velocityX *= -1;
            }
            let velocityY = 0;
            obstacle.setVelocity(velocityX, velocityY).setBounce(1).setFriction(0);
        }
    
        //goal object
        this.goal = this.matter.add.sprite(this.gameWidth / 2, 50, 'blueRing', null, { shape: shapes.blueRing });
        this.goal.setScale(0.5);
        this.goal.setCollisionCategory(this.cat3);
        this.goal.setCollidesWith(this.cat1);

        this.anims.create({
            key: 'goalPulse',
            frames: this.anims.generateFrameNumbers('blueRing', { start: 0, end: 14 }),
            frameRate: 15,
            repeat: -1
        })
    
        //energy bar
        this.energyBar = this.add.sprite(15, (this.gameHeight / 2), 'energyBar').setScale(.5);
        this.energyBar.alpha = 0.9;
        this.energyBar.angle = 90;
        this.energyBar.displayWidth = 150;

        this.energyMask = this.add.sprite(this.energyBar.x, this.energyBar.y, "energyBar").setScale(.5);
        this.energyMask.alpha = 0.9;
        this.energyMask.angle = 90;
        this.energyMask.displayWidth = 150;
        this.energyMask.visible = false;
    
        this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);
    
        //collision handling
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            console.log(`bodyA: ${bodyA.parent.label}`);
            console.log(`bodyB: ${bodyB.parent.label}`);
            if ((bodyA.parent.label === 'player') && (bodyB.parent.label === 'goal')) {
                this.win();
            }
            else if (bodyA.parent.label === 'player'){
                this.loss();
            }
        })
    
        //input keys
        this.cursors = this.input.keyboard.createCursorKeys();    
    }
    
    update() {
        this.player.anims.play('playerHover', true);
        this.goal.anims.play('goalPulse', true);

        //keyboard input handling
        if (this.cursors.space.isDown) {
            this.noclip();
        }
        else {
            this.clip();
        }
    
        if (this.cursors.shift.isDown) {
            this.player.setVelocity(0, 0);
        }
        else {
            if (this.cursors.left.isDown) {
                if (!this.cursors.right.isDown) {
                    this.player.thrustLeft(0.1);
                }
            }
            else if (this.cursors.right.isDown) {
                this.player.thrustRight(0.1);
            }
        
            if (this.cursors.up.isDown) {
                if (!this.cursors.down.isDown) {
                    this.player.thrust(0.1);
                }
            }
            else if (this.cursors.down.isDown) {
                this.player.thrustBack(0.1);
            }
        }
    }
    
    noclip() {    
        //check if player has energy left 
        if (this.energyMask.y < ((this.gameHeight / 2) + this.energyBar.displayWidth)) {
            //player becomes transparent and can noclip through anything
            this.player.alpha = 0.5;
            this.player.setCollidesWith(this.cat3);
            
            //drains energy
            this.energyMask.y += 1;
        }
        else {
            this.clip();
        }
    }
    
    clip() {
        //player is no longer transparent nor able to noclip
        this.player.alpha = 1;
        this.player.setCollidesWith([this.cat2, this.cat3]);
        
    }
    
    loss() {
        console.log('game loss');
        this.scene.start('PlayGame');
    }
    
    win() {
        console.log('game win');
        this.scene.start('Victory');
    }
}

export default PlayGame;