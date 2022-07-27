class Player extends Entity {
    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);

        this.Button1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.Button2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.Button3 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.sprite.setCollideWorldBounds(true);
        this.sprite.setDragX(5000);
        this.sprite.setGravityY(2000);
        this.sprite.scale = gameScale / 16;

        this.sprite.body.setSize(16, 16).setOffset(0, 16);

        this.lastVelocityX = 0
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
            const speed = Math.abs(this.sprite.body.velocity.y) / 10000;
            if (this.sprite.flipX) {
                this.sprite.rotation += speed;
            } else  {
                this.sprite.rotation -= speed;
            }
        }
        
        const clamp = (x, a, b) => {
            return Math.max(Math.min(x, a), b);
        }

        if (this.cursors.left.isDown) {
            velocityX -= speed;
            this.sprite.flipX = false;
            accelerating = true;
        }
        if (this.cursors.right.isDown) {
            velocityX += speed;
            this.sprite.flipX = true;
            accelerating = true;
        }
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.Button2)) && 
            this.sprite.body.blocked.down) 
        {
            velocityY = -1000;
        }

        this.sprite.setVelocity(clamp(velocityX, velocityCapX, -velocityCapX), clamp(velocityY, velocityCapY, -velocityCapY));

        if (Math.abs(velocityX) > 5) {
            this.sprite.play("normal-player-run", true);
        } else {
            this.sprite.play("normal-player-idle", true);
        }

        if (!accelerating && velocityX != 0) {
            this.sprite.play("normal-player-stopping", true);
        }

        // Switching between worlds
        if (Phaser.Input.Keyboard.JustDown(this.Button3)) {
            switch (this.scene.timeState) {
                case "apocalyptic":
                    this.scene.timeState = "normal";
                    this.sprite.setGravityY(2000);
                    break;
                case "normal":
                    this.scene.timeState = "apocalyptic";
                    this.sprite.setGravityY(1000);
                    break;
            }
            this.scene.onTimeStateChange();
        }

        super.update();
    }
}