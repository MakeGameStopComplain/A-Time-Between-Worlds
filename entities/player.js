class Player extends Entity {

    health = 3;

    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);

        this.handler = handler;
        this.scene = scene;

        // Input
        this.Button1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.Button2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.Button3 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Sprite Setup
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setDragX(4300);
        this.sprite.setGravityY(1700);
        this.sprite.scale = gameScale / 16;
        this.sprite.body.setSize(16, 16).setOffset(8, 16);
        this.sprite.flipX = true;

        // Taking Damage
        this.iFrames = 0;
    }

    update() {
        const speed = 100;
        const velocityCapX = 1000;
        const velocityCapY = 850;
        let velocityX = this.sprite.body.velocity.x;
        let velocityY = this.sprite.body.velocity.y;
        let accelerating = false;

        if (this.sprite.body.blocked.down) {
            this.sprite.rotation = 0;
        } else  {
            const rotation = (Math.abs(this.sprite.body.velocity.y) / 4000) + (Math.abs(this.sprite.body.velocity.x) / 7000);
            if (this.sprite.flipX) {
                this.sprite.rotation += rotation;
            } else  {
                this.sprite.rotation -= rotation;
            }
        }
        
        const clamp = (x, a, b) => {
            return Math.max(Math.min(x, a), b);
        }

        console.log(velocityX);

        if (this.cursors.left.isDown) {
            // Caps the speed in the purple world
            if (this.scene.timeState !== "apocalyptic" || this.sprite.body.velocity.x > -600) {
                velocityX -= speed;
            } else {
                velocityX -= speed * 9 / 10;
            }
            this.sprite.flipX = false;
            accelerating = true;
        }
        if (this.cursors.right.isDown) {
            if (this.scene.timeState !== "apocalyptic" || this.sprite.body.velocity.x < 600) {
                velocityX += speed;
            } else {
                velocityX += speed * 9 / 10;
            }
            this.sprite.flipX = true;
            accelerating = true;
        }
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.Button2)) && 
            this.sprite.body.blocked.down) 
        {
            velocityY = -1000;
            this.scene.sound.add("jumpsound").play();
        }

        this.sprite.setVelocity(clamp(velocityX, velocityCapX, -velocityCapX), clamp(velocityY, velocityCapY, -velocityCapY));

        if (Math.abs(velocityX) > 5) {
            this.sprite.play("normal-player-run", true);
        } else {
            this.sprite.play("normal-player-idle", true);
        }

        if (!accelerating && velocityX !== 0) {
            this.sprite.play("normal-player-stopping", true);
        }

        // Switching between worlds, gravity is less in purple, running is faster
        if (Phaser.Input.Keyboard.JustDown(this.Button3)) {
            switch (this.scene.timeState) {
                case "apocalyptic":
                    this.scene.timeState = "normal";
                    this.sprite.setGravityY(1700);
                    this.sprite.setDragX(4300);
                    break;
                case "normal":
                    this.scene.timeState = "apocalyptic";
                    this.sprite.setGravityY(1000);
                    this.sprite.setDragX(5500);
                    break;
            }
            this.scene.onTimeStateChange();
        }

        // Damage Handling
        if (this.iFrames > 0) {
            this.iFrames--;
            if (this.iFrames % 10 > 6) {
                this.sprite.tint = 0xeb3434;
            } else {
                this.sprite.tint = 0xffffff;
            }
        }

        super.update();
    }

    takeDamage() {
        if (this.iFrames === 0) {
            this.health--;
            this.iFrames = 40;
        }

        if (this.health === 0) {
            this.scene.scene.stop("hud");
            this.scene.scene.start("main-menu");
            this.handler.clearEntities();
        }

        this.scene.sound.add("damagesound").play();
    }

}