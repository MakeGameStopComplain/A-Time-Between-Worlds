class Scene1 extends Phaser.Scene {

    handler;

    constructor() {
        super("scene-1");
        this.handler = new Handler();
        this.timeState = "normal"; // "apocalyptic"
    }

    preload() {
        this.load.tilemapCSV('testmap', 'tilemaps/testlvl.csv');
        this.load.image('world1tiles', 'image/world1tileset.png');
    }

    create() {
        var map = this.make.tilemap({ key: "testmap", tileWidth: 32, tileHeight: 32 });
        var world1tiles = map.addTilesetImage("world1tileset", "world1tiles");
        var layer1 = map.createLayer(0, world1tiles, 0, 0);
        layer1.scale = gameScale / 16;

        var mainChar = new Player(this.handler, this, "", "mainChar");
        this.handler.addEntity(mainChar);

        this.physics.add.collider(mainChar.sprite, layer1)
        layer1.setCollisionBetween(1, 4);
    }

    update() {
        this.handler.update();
    }
    
    onTimeStateChange() {
        console.log(this.timeState);
    }

}