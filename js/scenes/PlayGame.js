class PlayGame extends Phaser.Scene {
    constructor() {
        super({key: 'PlayGame'});
    }

    create() {
        this.gameWidth = this.cameras.main.width;
        this.gameHeight = this.cameras.main.height;
    
        //background image
        let image = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'bg')
        let scaleX = this.gameWidth / image.width
        let scaleY = this.gameHeight / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    
        //player object
        this.player = this.matter.add.image((this.gameWidth / 2), 715, 'player');
    
        this.player.setFixedRotation();
        this.player.setAngle(0);
        this.player.setFrictionAir(.05);
        this.player.setMass(50);

        //obstacle objects
        let cat1 = this.matter.world.nextCategory();
        this.player.setCollisionCategory(cat1).setCollidesWith([cat1]);
    
        let cat2 = this.matter.world.nextCategory();
        let obstacleNames = ['morty', 'ayu2', 'poo', 'saw'];
        for(let i = 0; i < obstacleNames.length; i++) {
            let randX = Math.floor((Math.random() * this.gameWidth) - 50);
            let obstacle = this.matter.add.image(randX, (this.gameHeight - 300) - (i * 100), obstacleNames[i], null, { isStatic: true });
            
            obstacle.setCollisionCategory(cat1).setCollisionGroup(-1);
        }
    
        //goal object
        this.goal = this.matter.add.image(this.gameWidth / 2, 50, 'blueParticle', null, { isStatic: true });
        this.goal.setCollisionCategory(cat1);
    
        //energy bar
        this.energyBar = this.add.sprite(15, (this.gameHeight / 2), 'energyBar').setScale(.5);
        this.energyBar.angle = 90;
        this.energyBar.displayWidth = 150;
        this.energyMask = this.add.sprite(this.energyBar.x, this.energyBar.y, "energyBar").setScale(.5);
        this.energyMask.angle = 90;
        this.energyMask.displayWidth = 150;
        this.energyMask.visible = false;
    
        this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);
    
        //collision handling
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            console.log(`bodyA: ${bodyA.id}`);
            console.log(`bodyB: ${bodyB.id}`);
            if (bodyB === this.goal.body) {
                this.win();
            }
            else {
                this.loss();
            }
        })
    
        //input keys
        this.cursors = this.input.keyboard.createCursorKeys();    
    }
    
    update() {
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
                    this.player.thrustBack(0.1);
                }
            }
            else if (this.cursors.right.isDown) {
                this.player.thrust(0.1);
            }
        
            if (this.cursors.up.isDown) {
                if (!this.cursors.down.isDown) {
                    this.player.thrustLeft(0.1);
                }
            }
            else if (this.cursors.down.isDown) {
                this.player.thrustRight(0.1);
            }
        }
    }
    
    noclip() {    
        if (this.energyMask.y < ((this.gameHeight / 2) + this.energyBar.displayWidth)) {
            //player becomes transparent and can noclip through anything
            this.player.alpha = 0.5;
            this.player.setCollisionGroup(-1);
    
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
        this.player.setCollisionGroup(0);
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