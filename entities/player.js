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
    }  

    update() {
        const speed = 100;
        const velocityCap = 1000;
        let velocityX = this.sprite.body.velocity.x;
        let velocityY = this.sprite.body.velocity.y;

        const clamp = (x, a, b) => {
            return Math.max(Math.min(x, a), b);
        }

        if (this.cursors.left.isDown) {
            velocityX -= speed;
        }
        if (this.cursors.right.isDown) {
            velocityX += speed;
        }
        if ((this.cursors.up.isDown || this.Button2.isDown) && 
            this.sprite.body.blocked.down) 
        {
            velocityY = -1000;
        }

        this.sprite.setVelocity(clamp(velocityX, velocityCap, -velocityCap), clamp(velocityY, velocityCap, -velocityCap));
        
        if (Phaser.Input.Keyboard.JustDown(this.Button3)) {
            switch (this.scene.timeState) {
                case "apocalyptic":
                    this.scene.timeState = "normal";
                    break;
                case "normal":
                    this.scene.timeState = "apocalyptic";
                    break;
            }
            this.scene.onTimeStateChange();
        }

        super.update();
    }
}