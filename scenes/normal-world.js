class NormalWorld extends Phaser.Scene {

    constructor() {
        super("normal-world");
        this.handler = handler;
    }

    preload() {
        this.load.tilemapCSV("normal-world", "tilemaps/normal-world.csv");
        this.load.image("world1tiles", "image/world1tileset.png");
    }

    create() {
        this.player = new Player(this.handler, this, "", "player", ...this.handler.playerData);
        handler.addEntity(this.player);

        var map = this.make.tilemap({ key: "normal-world", tileWidth: 32, tileHeight: 32 });
        var world1tiles = map.addTilesetImage("world1tileset", "world1tiles");
        var layer1 = map.createLayer(0, world1tiles, 0, 0);
        layer1.scale = gameScale / 16;

        this.physics.add.collider(this.player.sprite, layer1);
        layer1.setCollisionBetween(1, 4);
    }

    update() {
        this.handler.update();
    }

}