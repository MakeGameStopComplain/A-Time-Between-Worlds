class Level2 extends Phaser.Scene {
  // This level shows the player about gravity zones

  levelLength = 32;
  levelHeight = 32;

  constructor() {
    super("level2");
    this.handler = new Handler();
    this.timeState = "normal";
  }

  preload() {
    this.load.spritesheet("normal-player", "image/normal-player.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("apocalyptic-player", "image/apocalyptic-player.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.tilemapCSV("normalmap2", "tilemaps/level2-normal.csv");
    this.load.tilemapCSV("purplemap2", "tilemaps/level2-purple.csv");
    this.load.image("world1tiles", "image/blocksnormal.png");
    this.load.image("world1tiles-purple", "image/blockspurple.png");
    this.load.spritesheet("bg1", "image/parallax back 1.png",
        {frameWidth: 128 * 6, frameHeight: 96 * 6});
    this.load.spritesheet("bg2", "image/parallax back 2.png",
        {frameWidth: 128 * 6, frameHeight: 96 * 6});
    this.load.image("background5-normal", "image/tree n road.png");
    this.load.image("background5-apocalyptic",
        "image/tree n road apocalyptic.png");
    this.load.spritesheet("portal", "image/portal.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.audio("normalmusic", "muzak/nice_song.mp3");
    this.load.audio("apocmusic", "muzak/scary_song.mp3");
    this.load.audio("coinsound", "sound/coin.wav");
    this.load.audio("damagesound", "sound/damage.wav");
    this.load.audio("explosionsound", "sound/explosion.wav");
    this.load.audio("jumpsound", "sound/jump.wav");
    this.load.audio("selectsound", "sound/select.wav");
  }

  create() {
    // Internal clock
    this.internalClock = -1;

    // Background
    this.background1 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1",
        4);
    this.background1.setOrigin(0, 0);
    this.background1.setScrollFactor(0);
    this.background2 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1",
        3);
    this.background2.setOrigin(0, 0);
    this.background2.setScrollFactor(0);  // .1
    this.background3 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1",
        2);
    this.background3.setOrigin(0, 0);
    this.background3.setScrollFactor(0);  // .15
    this.background4 = this.add.tileSprite(0, 0, gameWidth, gameHeight, "bg1",
        1);
    this.background4.setOrigin(0, 0);
    this.background4.setScrollFactor(0);  // .185
    this.background5 = this.add.tileSprite(0, 0, gameWidth, gameHeight,
        "background5-normal");
    this.background5.scale = 6;
    this.background5.setOrigin(0, 0);
    this.background5.setScrollFactor(0);  // .25

    // World Setup
    this.baseTilemap = this.make.tilemap(
        {key: "normalmap2", tileWidth: 32, tileHeight: 32});
    var world1tiles = this.baseTilemap.addTilesetImage("world1tileset",
        "world1tiles");
    this.tiles = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
    this.tiles.scale = gameScale / 16;
    this.tiles.setCollisionBetween(1, 10);

    // Player Setup
    this.player = new Player(this.handler, this, "", "player");
    this.handler.addEntity(this.player);
    this.playerCollider = this.physics.add.collider(this.player.sprite,
        this.tiles);
    this.player.sprite.depth = 2;
    this.player.sprite.y = ((this.levelHeight - 4) * 32) * (gameScale / 16);

    // HUD
    this.scene.launch("hud", {player: this.player});

    // Camera
    this.physics.world.setBounds(0, 0, gameWidth * this.levelLength / 16,
        gameHeight * this.levelHeight / 9);
    this.cameras.main.setBounds(0, 0, gameWidth * this.levelLength / 16,
        gameHeight * this.levelHeight / 9);
    this.cameras.main.startFollow(this.player.sprite);

    // Makes entities for each special tile
    this.tiles.forEachTile((tile) => {
      if (tile.index === 69) {
        let endPortal = new Portal(this.handler, this, "portal", "portal", "level2", "level3");
        endPortal.setCollector(this.player);
        endPortal.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
        endPortal.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
        this.handler.addEntity(endPortal);
      } else if (tile.index == 26) {
        let bouncePad = new BouncyPad(this.handler, this, "bounce", "bouncy");
        bouncePad.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
        bouncePad.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
        this.handler.addEntity(bouncePad);
      }
    });

    // Animations
    this.anims.create({
      key: "normal-player-idle",
      frames: this.anims.generateFrameNumbers("normal-player",
          {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "normal-player-run",
      frames: this.anims.generateFrameNumbers("normal-player",
          {start: 4, end: 10}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "normal-player-stopping",
      frames: this.anims.generateFrameNumbers("normal-player",
          {start: 14, end: 17}),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "portal-animation",
      frames: this.anims.generateFrameNumbers("portal", {start: 0, end: 3}),
      frameRate: 8,
      repeat: 0
    });
    // Music
    this.music1 = this.sound.add("normalmusic");
    this.music1.loop = true;
    this.music1.play();
    this.music2 = this.sound.add("apocmusic");
    this.music2.loop = true;
    this.music2.play();
    this.music2.setVolume(0);
  }

  update() {
    this.internalClock++;

    this.handler.update();

    // Makes the clouds move
    this.background2.tilePositionX += .2;

    // Does parallax scrolling
    let cameraX = this.cameras.main.scrollX;
    this.background3.tilePositionX = cameraX / 30;
    this.background4.tilePositionX = cameraX / 15;
    this.background5.tilePositionX = cameraX / 20;

    let cameraY = this.cameras.main.scrollY;
    this.background3.tilePositionY = cameraY / ((this.levelHeight / 16) * 15);
    this.background4.tilePositionY = cameraY / ((this.levelHeight / 16) *  7);
    this.background5.tilePositionY = cameraY / ((this.levelHeight / 16) * 13);

    // Adds in gravity zones
    if (this.player.sprite.x > 14 * 2 * gameScale && this.player.sprite.x < 18 * 2 * gameScale && this.timeState === "apocalyptic") {
      this.player.sprite.setGravityY(-200);
    } else if (this.timeState === "apocalyptic") {
      this.player.sprite.setGravityY(1000);
    } else {
      this.player.sprite.setGravityY(1700);
    }
  }

  onTimeStateChange() {
    this.baseTilemap.destroy();
    this.physics.world.removeCollider(this.playerCollider);

    switch (this.timeState) {
      case "normal":
        this.baseTilemap = this.make.tilemap(
            {key: "normalmap2", tileWidth: 32, tileHeight: 32});
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset",
            "world1tiles");
        this.tiles = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.tiles.scale = gameScale / 16;
        this.playerCollider = this.physics.add.collider(this.player.sprite,
            this.tiles);

        this.tiles.setCollisionBetween(1, 10);

        this.background1.setTexture("bg1", 4);
        this.background2.setTexture("bg1", 3);
        this.background3.setTexture("bg1", 2);
        this.background4.setTexture("bg1", 1);
        this.background5.setTexture("background5-normal");

        this.player.sprite.tint = 0xffffff;

        this.music1.setVolume(1);
        this.music2.setVolume(0);
        break;
      case "apocalyptic":
        this.baseTilemap = this.make.tilemap(
            {key: "purplemap2", tileWidth: 32, tileHeight: 32});
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset",
            "world1tiles-purple");
        this.tiles = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.tiles.scale = gameScale / 16;
        this.playerCollider = this.physics.add.collider(this.player.sprite,
            this.tiles);

        this.tiles.setCollisionBetween(1, 10);

        this.background1.setTexture("bg2", 4);
        this.background2.setTexture("bg2", 3);
        this.background3.setTexture("bg2", 2);
        this.background4.setTexture("bg2", 1);
        this.background5.setTexture("background5-apocalyptic");

        this.player.sprite.tint = 0xee66ff; // I couldn't think of a way to seamlessly switch spritesheets, so this is a temporary solution to that.

        this.music1.setVolume(0);
        this.music2.setVolume(1);
        break;
    }
  }

  stopMusic() {
    this.music1.pause();
    this.music2.pause();
  }

}