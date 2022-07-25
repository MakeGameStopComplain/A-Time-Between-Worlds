class Player extends Entity {

    inNormalWorld = true;
    xButtonReleased = false;

    constructor(handler, scene, spriteName, entityName, x, y, xVel, yVel, inNormalWorld) {
        super(handler, scene, spriteName, entityName, x, y, xVel, yVel);

        this.XKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.Wkey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.Akey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.sprite.setCollideWorldBounds(true);
        this.sprite.setDragX(5000);
        this.sprite.setGravityY(2000);
        this.sprite.scale = gameScale / 16;

        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.inNormalWorld = inNormalWorld;
    }  

    update() {
        // Movement
        const speed = 100;
        const velocityCap = 1000;

        const clamp = (x, a, b) => {
            return Math.max(Math.min(x, a), b);
        }

        if (this.Akey.isDown) {
            this.xVel -= speed;
        }
        if (this.Dkey.isDown) {
            this.xVel += speed;
        }
        if (this.Wkey.isDown && this.sprite.body.blocked.down) {
            this.yVel = -1000;
        }
        
        this.xVel = clamp(this.xVel, velocityCap, -velocityCap);
        this.yVel = clamp(this.yVel, velocityCap, -velocityCap);

        this.sprite.setVelocity(this.xVel, this.yVel);

        this.x = this.sprite.x;
        this.y = this.sprite.y;

        // World Switching
        if (this.XKey.isDown) {
            if (this.xButtonReleased) {
                this.destroy();
                if (this.inNormalWorld) {
                    this.scene.scene.start("apocalyptic-world");
                    this.handler.playerData = [this.x, this.y, this.xVel, this.yVel, false]
                } else {
                    this.scene.scene.start("normal-world");
                    this.handler.playerData = [this.x, this.y, this.xVel, this.yVel, true]
                }
            }
            this.xButtonReleased = false;
        } else {
            this.xButtonReleased = true;
        }

        super.update();
    }
}