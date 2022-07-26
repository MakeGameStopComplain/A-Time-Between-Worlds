class Scene1 extends Phaser.Scene {

    // We could eventually get the length from the length of a csv row
    levelLength = 32;

    constructor() {
        super("scene-1");
        this.handler = new Handler();
        this.timeState = "normal"; // "apocalyptic"
    }

    preload() {
        this.load.tilemapCSV("testmap", "tilemaps/testlvl.csv");
        this.load.tilemapCSV("testmap2", "tilemaps/testlvl apocalyptic.csv");
        this.load.image("world1tiles", "image/world1tileset.png");
        this.load.image("background1", "image/background1.png");
        this.load.image("background2", "image/background2.png");
        this.load.image("background3", "image/background3.png");
        this.load.image("background4", "image/background4.png");
        this.load.image("background5", "image/background5.png");
    }

    create() {
        // Background
        this.background1 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "background1");
        this.background1.scale = 5.625;
        this.background1.setOrigin(0, 0);
        this.background1.setScrollFactor(0);
        this.background1.tilePositionX = this.cameras.scrollX * .3;  // I have no clue why, but without this line the sky has a weird artifact
        this.background2 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "background2");
        this.background2.scale = 5.625;
        this.background2.setOrigin(0, 0);
        this.background2.setScrollFactor(.1);
        this.background3 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "background3");
        this.background3.scale = 5.625;
        this.background3.setOrigin(0, 0);
        this.background3.setScrollFactor(.15);
        this.background4 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "background4");
        this.background4.scale = 5.625;
        this.background4.setOrigin(0, 0);
        this.background4.setScrollFactor(.185);
        this.background5 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "background5");
        this.background5.scale = 5.625;
        this.background5.setOrigin(0, 0);
        this.background5.setScrollFactor(.25);

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
        this.physics.world.setBounds(0, 0, gameWidth * this.levelLength / 16, gameHeight);
        this.cameras.main.setBounds(0, 0, gameWidth * this.levelLength / 16, gameHeight);
        this.cameras.main.startFollow(this.player.sprite);

    }

    update() {
        this.handler.update();
        // this.background2.tilePositionY = this.cameras.main.scrollY * .3;

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
                break;
            case "apocalyptic":
                this.baseTilemap = this.make.tilemap({ key: "testmap2", tileWidth: 32, tileHeight: 32 });
                var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles");
                this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
                this.layer1.scale = gameScale / 16;
                this.tileCollider = this.physics.add.collider(this.player.sprite, this.layer1)
                this.layer1.setCollisionBetween(1, 4);
                break;
        }
    }

}