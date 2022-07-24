class Scene1 extends Phaser.Scene {

    handler;

    constructor() {
        super("scene-1");
        this.handler = new Handler()
    }

    preload() {
        this.load.tilemapCSV('testmap', 'tilemaps/testlvl.csv');
    }

    create() {
        var map = this.make.tilemap({ key: "testmap", tileWidth: 60, tileHeight: 60 });
        var world1tiles = map.addTilesetImage("world1tileset", "world1tiles");
        var examplayer = map.createLayer(0, world1tiles, 0, 0);
    }

    update() {
        this.handler.update();
    }

}