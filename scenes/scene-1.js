class Scene1 extends Phaser.Scene {

    // We could eventually get the length from the length of a csv row
    levelLength = 32;
    levelHeight = 16;

    constructor() {
        super("scene-1");
        this.handler = new Handler();
        this.timeState = "normal"; // "apocalyptic"
    }

    preload() {
        this.load.spritesheet("normal-player", "image/normal-player.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("apocalyptic-player", "image/apocalyptic-player.png", { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapCSV("testmap", "tilemaps/testlvl.csv");
        this.load.tilemapCSV("testmap2", "tilemaps/testlvl apocalyptic.csv");
        this.load.image("world1tiles", "image/blocksnormal.png");
        this.load.image("world1tiles-purple", "image/blockspurple.png");
        this.load.spritesheet("bg1", "image/parallax back 1.png", { frameWidth: 128 * 6, frameHeight: 96 * 6 });
        this.load.spritesheet("bg2", "image/parallax back 2.png", { frameWidth: 128 * 6, frameHeight: 96 * 6 });
        this.load.image("background5", "image/tree n road.png");
    }

    create() {
        // Background
        this.background1 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1", 4);
        this.background1.setOrigin(0, 0);
        this.background1.setScrollFactor(0);
        this.background1.tilePositionX = this.cameras.scrollX * .3;  // I have no clue why, but without this line the sky has a weird artifact
        this.background2 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1", 3);
        this.background2.setOrigin(0, 0);
        this.background2.setScrollFactor(0);  // .1
        this.background3 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1", 2);
        this.background3.setOrigin(0, 0);
        this.background3.setScrollFactor(0);  // .15
        this.background4 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1", 1);
        this.background4.setOrigin(0, 0);
        this.background4.setScrollFactor(0);  // .185
        this.background5 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "background5");
        this.background5.scale = 6;
        this.background5.setOrigin(0, 0);
        this.background5.setScrollFactor(0);  // .25

        // World Setup
        this.baseTilemap = this.make.tilemap({ key: "testmap", tileWidth: 32, tileHeight: 32 });
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles");
        this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.layer1.scale = gameScale / 16;

        // Player Setup
        this.player = new Player(this.handler, this, "", "player");
        this.handler.addEntity(this.player);
        this.tileCollider = this.physics.add.collider(this.player.sprite, this.layer1)
        this.layer1.setCollisionBetween(1, 4);

        // Camera
        this.physics.world.setBounds(0, 0, gameWidth * this.levelLength / 16, gameHeight * this.levelHeight / 9);
        this.cameras.main.setBounds(0, 0, gameWidth * this.levelLength / 16, gameHeight * this.levelHeight / 9);
        this.cameras.main.startFollow(this.player.sprite);

        // Animations
        this.anims.create({
            key: "normal-player-idle",
            frames: this.anims.generateFrameNumbers("normal-player", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "normal-player-run",
            frames: this.anims.generateFrameNumbers("normal-player", { start: 4, end: 10 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "normal-player-stopping",
            frames: this.anims.generateFrameNumbers("normal-player", { start: 14, end: 17 }),
            frameRate: 8,
            repeat: 0
        });
    }

    update() {
        this.handler.update();

        // Makes the clouds move
        this.background2.tilePositionX += .2;

        // Does parallax scrolling
        let cameraX = this.cameras.main.scrollX;
        this.background3.tilePositionX = cameraX / 30;
        this.background4.tilePositionX = cameraX / 15;
        this.background5.tilePositionX = cameraX / 20;

        let cameraY = this.cameras.main.scrollY;
        this.background3.tilePositionY = cameraY / 30;
        this.background4.tilePositionY = cameraY / 20;
        this.background5.tilePositionY = cameraY / 20;

        // Changes gravity
        // if (this.player.sprite.x > 300 && this.player.sprite.x < 300)
    }
    
    onTimeStateChange() {
        console.log(this.timeState);
        
        this.baseTilemap.destroy();
        this.physics.world.removeCollider(this.tileCollider);
        switch (this.timeState) {
            case "normal":
                this.baseTilemap = this.make.tilemap({ key: "testmap", tileWidth: 32, tileHeight: 32 });
                var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles");
                this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
                this.layer1.scale = gameScale / 16;
                this.tileCollider = this.physics.add.collider(this.player.sprite, this.layer1)
                this.layer1.setCollisionBetween(1, 4);

                this.background1.setTexture("bg1", 4);
                this.background2.setTexture("bg1", 3);
                this.background3.setTexture("bg1", 2);
                this.background4.setTexture("bg1", 1);
                this.background5.setTexture("bg1", 0);

                this.player.sprite.tint = 0xffffff;
                break;
            case "apocalyptic":
                this.baseTilemap = this.make.tilemap({ key: "testmap2", tileWidth: 32, tileHeight: 32 });
                var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles-purple");
                this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
                this.layer1.scale = gameScale / 16;
                this.tileCollider = this.physics.add.collider(this.player.sprite, this.layer1)
                this.layer1.setCollisionBetween(1, 4);

                this.background1.setTexture("bg2", 4);
                this.background2.setTexture("bg2", 3);
                this.background3.setTexture("bg2", 2);
                this.background4.setTexture("bg2", 1);
                this.background5.setTexture("bg2", 0);

                this.player.sprite.tint = 0xee66ff; // I couldn't think of a way to seamlessly switch spritesheets, so this is a temporary solution to that.
                break;
        }
    }

}