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
        this.load.image("background", "image/background.png");
    }

    create() {
        this.baseTilemap = this.make.tilemap({ key: "testmap", tileWidth: 32, tileHeight: 32 });
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles");
        this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.layer1.scale = gameScale / 16;

        this.player = new Player(this.handler, this, "", "player");
        this.handler.addEntity(this.player);

        this.tileCollider = this.physics.add.collider(this.player.sprite, this.layer1)
        this.layer1.setCollisionBetween(1, 4);

        this.physics.world.setBounds(0, 0, gameWidth * this.levelLength / 16, gameHeight);
        this.cameras.main.setBounds(0, 0, gameWidth * this.levelLength / 16, gameHeight);
        this.cameras.main.startFollow(this.player.sprite);
    }

    update() {
        this.handler.update();
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