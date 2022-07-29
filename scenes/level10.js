class Level10 extends Phaser.Scene {
  // This level shows the player they need to switch worlds

  levelLength = 64;
  levelHeight = 24;

  constructor() {
    super("level10");
    this.handler = new Handler();
    this.timeState = "normal"; // "apocalyptic"
  }

  preload() {
    this.load.spritesheet("normal-player", "image/normal-player.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("apocalyptic-player", "image/apocalyptic-player.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.tilemapCSV("normalmap10", "tilemaps/level10-normal.csv");
    this.load.tilemapCSV("purplemap10", "tilemaps/level10-purple.csv");
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
    this.load.spritesheet("wizard", "image/mad scientist.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.audio("normalmusic", "muzak/nice_song.mp3");
    this.load.audio("apocmusic", "muzak/scary_song.mp3");
    this.load.audio("coinsound", "sound/coin.wav");
    this.load.audio("damagesound", "sound/damage.wav");
    this.load.audio("explosionsound", "sound/explosion.wav");
    this.load.audio("jumpsound", "sound/jump.wav");
    this.load.audio("selectsound", "sound/select.wav");
    this.load.spritesheet("fire", "image/fire.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("bounce", "image/jumppad.png", { frameWidth: 32, frameHeight: 32 });
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
        {key: "normalmap10", tileWidth: 32, tileHeight: 32});
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
    this.player.sprite.x = 0;
    this.player.velocityCapX = 1000;
    // Spawns the player on the ground
    this.player.sprite.y = ((this.levelHeight - 4) * 32) * (gameScale / 16);

    this.particles = this.add.particles('');
    this.particles.depth = 2;
    this.particles.visible = false;
    this.particles.createEmitter(
        {
            x: { min: 9 * 2 * gameScale, max: 12 * 2 * gameScale },
            y: { min: 1200, max: 1250 },
            speedX: 0,
            speedY: { min: -100, max: -5 },
            scale: { start: 0.4, end: 0 },
            rotate: { min: 0, max: 360, end: 0 },
            quantity: 5,
            frequency: 1,
            alpha: { end: 0, min: 0.2, max: 0.6 },
            blendMode: 'ADD'
        }
    );
    this.particles.createEmitter(
        {
            x: { min: 9 * 2 * gameScale, max: 12 * 2 * gameScale },
            y: { min: 0, max: 1200 },
            lifespan: 1000,
            speedX: 0,
            speedY: { min: -20, max: -5 },
            scale: { start: 0.4, end: 0 },
            rotate: { min: 0, max: 360, end: 0 },
            quantity: 5,
            frequency: 1,
            alpha: { end: 0, min: 0.2, max: 0.6 },
            blendMode: 'ADD'
        }
    );
    this.particles.createEmitter(
        {
            x: { min: 28 * 2 * gameScale, max: 35 * 2 * gameScale },
            y: { min: 1200, max: 1250 },
            speedX: 0,
            speedY: { min: -100, max: -5 },
            scale: { start: 0.4, end: 0 },
            rotate: { min: 0, max: 360, end: 0 },
            quantity: 5,
            frequency: 1,
            alpha: { end: 0, min: 0.2, max: 0.6 },
            blendMode: 'ADD'
        }
    );
    this.particles.createEmitter(
        {
            x: { min: 28 * 2 * gameScale, max: 35 * 2 * gameScale },
            y: { min: 0, max: 1250 },
            lifespan: 1000,
            speedX: 0,
            speedY: { min: -20, max: -5 },
            scale: { start: 0.4, end: 0 },
            rotate: { min: 0, max: 360, end: 0 },
            quantity: 5,
            frequency: 1,
            alpha: { end: 0, min: 0.2, max: 0.6 },
            blendMode: 'ADD'
        }
    );

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
        let endPortal = new Portal(this.handler, this, "portal", "portal", "level10","endlevel");
        endPortal.setCollector(this.player);
        endPortal.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
        endPortal.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
        this.handler.addEntity(endPortal);
      } else if (tile.index === 26) {
        this.anims.create({
            key: "bouncepad",
            frames: this.anims.generateFrameNumbers("bounce", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        let bouncePad = new BouncyPad(this.handler, this, "bounce", "bouncy");
        bouncePad.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
        bouncePad.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
        this.handler.addEntity(bouncePad);

        bouncePad.sprite.play("bouncepad");
      } else if (tile.index === 25) {
          // LOL!!!!
          this.anims.create({
              key: "flames",
              frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 11 }),
              frameRate: 8,
              repeat: -1
          });

          let flames = new Fire(this.handler, this, "fire", "fire");
          flames.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
          flames.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
          this.handler.addEntity(flames);
          flames.sprite.depth = 3;

          flames.sprite.play("flames", true);
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

    this.anims.create({
        key: "wizard-idle",
        frames: this.anims.generateFrameNumbers("wizard", { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
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
    this.background4.tilePositionY = cameraY / ((this.levelHeight / 16) * 7);
    this.background5.tilePositionY = cameraY / ((this.levelHeight / 16) * 13);

    try {
      // Adds in gravity zones
      if (this.player.sprite.x > 9 * 2 * gameScale && this.player.sprite.x < 13 * 2 * gameScale && this.timeState === "apocalyptic") {
        this.player.sprite.setGravityY(-200);
      } else if (this.player.sprite.x > 28 * 2 * gameScale && this.player.sprite.x < 35 * 2 * gameScale && this.timeState === "apocalyptic") {
        this.player.sprite.setGravityY(-300);
      } else if (this.timeState === "apocalyptic") {
        this.player.sprite.setGravityY(1000);
      } else {
        this.player.sprite.setGravityY(1700);
      }
    }
    catch (err) {}

  }

  onTimeStateChange() {
    this.baseTilemap.destroy();
    this.physics.world.removeCollider(this.playerCollider);

    switch (this.timeState) {
      case "normal":
        this.particles.visible = false;
        this.baseTilemap = this.make.tilemap(
            {key: "normalmap10", tileWidth: 32, tileHeight: 32});
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
        this.particles.visible = true;
        this.baseTilemap = this.make.tilemap(
            {key: "purplemap10", tileWidth: 32, tileHeight: 32});
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
