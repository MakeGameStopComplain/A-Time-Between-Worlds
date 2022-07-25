class Scene1 extends Phaser.Scene {

    handler;

    constructor() {
        super("scene-1");
        this.handler = new Handler();
        this.timeState = "normal"; // "apocalyptic"
    }

    preload() {
        this.load.tilemapCSV('testmap', 'tilemaps/testlvl.csv');
        this.load.tilemapCSV('testmap2', 'tilemaps/testlvl apocalyptic.csv');
        this.load.image('world1tiles', 'image/world1tileset.png');
    }

    create() {
        this.baseTilemap = this.make.tilemap({ key: "testmap", tileWidth: 32, tileHeight: 32 });
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles");
        this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.layer1.scale = gameScale / 16;

        this.mainChar = new Player(this.handler, this, "", "mainChar");
        this.handler.addEntity(this.mainChar);

        this.tileCollider = this.physics.add.collider(this.mainChar.sprite, this.layer1)
        this.layer1.setCollisionBetween(1, 4);
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
                this.tileCollider = this.physics.add.collider(this.mainChar.sprite, this.layer1)
                this.layer1.setCollisionBetween(1, 4);
                break;
            case "apocalyptic":
                this.baseTilemap = this.make.tilemap({ key: "testmap2", tileWidth: 32, tileHeight: 32 });
                var world1tiles = this.baseTilemap.addTilesetImage("world1tileset", "world1tiles");
                this.layer1 = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
                this.layer1.scale = gameScale / 16;
                this.tileCollider = this.physics.add.collider(this.mainChar.sprite, this.layer1)
                this.layer1.setCollisionBetween(1, 4);
                break;
        }
    }

}