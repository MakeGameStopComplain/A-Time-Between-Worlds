class Level5 extends Phaser.Scene {
  // This level shows the player how to use doors and buttons

  levelLength = 64;
  levelHeight = 16;

  constructor() {
    super("level5");
    this.handler = new Handler();
    this.timeState = "normal"; // "apocalyptic"
  }

  preload() {
    this.load.spritesheet("normal-player", "image/normal-player.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("apocalyptic-player", "image/apocalyptic-player.png",
        {frameWidth: 32, frameHeight: 32});
    this.load.tilemapCSV("normalmap5", "tilemaps/level5-normal.csv");
    this.load.tilemapCSV("purplemap5", "tilemaps/level5-purple.csv");
    this.load.image("world1tiles", "image/blocksnormal.png");
    this.load.spritesheet("world1tiles-sprite", "image/blocksnormal.png", {frameWidth: 32, frameHeight: 32});
    this.load.image("world1tiles-purple", "image/blockspurple.png");
    this.load.spritesheet("world1tiles-purple-sprite", "image/blockspurple.png", {frameWidth: 32, frameHeight: 32});
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
    this.load.spritesheet("pressure plate", "image/button.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("pressure plate purple", "image/button purple.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("door", "image/door normal.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("door purple", "image/door purple.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("box", "image/pushbox.png");
    this.load.image("box purple", "image/pushbox-purple.png");
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
        {key: "normalmap5", tileWidth: 32, tileHeight: 32});
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
    this.player.velocityCapX = 500;
    // Spawns the player on the ground
    this.player.sprite.y = ((this.levelHeight - 4) * 32) * (gameScale / 16);

    // Boxes
    // Has the box sprites and colliders
    this.boxes = [];
    for (let i = 0; i < 3; i++) {
      let box = new Box(this.handler, this, "box", "box");
      box.sprite.depth = 3;
      box.sprite.y = ((this.levelHeight - 4) * 32) * (gameScale / 16);
      this.handler.addEntity(box);
      let boxCollider1 = this.physics.add.collider(box.sprite, this.tiles);
      let boxCollider2 = this.physics.add.collider(box.sprite, this.player.sprite);
      let boxAndColliders = [box, [boxCollider1, boxCollider2]];
      this.boxes.push(boxAndColliders);
    }

    // Adds Colliders between boxes
    let boxAndCollider1 = this.boxes[0];
    let boxAndCollider2 = this.boxes[1];
    let boxAndCollider3 = this.boxes[2];
    boxAndCollider1[1].push(this.physics.add.collider(boxAndCollider1[0].sprite, boxAndCollider2[0].sprite))
    boxAndCollider2[1].push(this.physics.add.collider(boxAndCollider2[0].sprite, boxAndCollider3[0].sprite))
    boxAndCollider3[1].push(this.physics.add.collider(boxAndCollider3[0].sprite, boxAndCollider1[0].sprite))

    this.boxes[0][0].sprite.x = 200;
    this.boxes[1][0].sprite.x = 1300;
    this.boxes[2][0].sprite.x = 1400;

    // HUD
    this.scene.launch("hud", {player: this.player});

    // Camera
    this.physics.world.setBounds(0, 0, gameWidth * this.levelLength / 16,
        gameHeight * this.levelHeight / 9);
    this.cameras.main.setBounds(0, 0, gameWidth * this.levelLength / 16,
        gameHeight * this.levelHeight / 9);
    this.cameras.main.startFollow(this.player.sprite);

    // Makes entities for each special tile
    this.doors = [];
    this.pressurePlates = [];
    this.backgroundWalls = [];
    this.tiles.forEachTile((tile) => {
      if (tile.index === 24) {
        let pressurePlate = new PressurePlate(this.handler, this, "pressure plate", "pressure plate", this.boxes, this.player);
        pressurePlate.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
        pressurePlate.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
        this.handler.addEntity(pressurePlate);
        this.pressurePlates.push(pressurePlate);
        pressurePlate.sprite.depth = 1;
        let wall = this.add.sprite((tile.x + 0.5) * tileSize * (gameScale / 16) , (tile.y + 0.5) * tileSize * (gameScale / 16), "world1tiles-sprite", 12);
        wall.scale = gameScale / 16;
        wall.depth = 0;
        this.backgroundWalls.push(wall);
      } else if (tile.index === 23) {
        let door = new Door(this.handler, this, "door", "door", this.player);
        door.sprite.x = (tile.x + 0.5) * tileSize * (gameScale / 16);
        door.sprite.y = (tile.y + 0.5) * tileSize * (gameScale / 16);
        this.handler.addEntity(door);
        let doorAndCollider = [door, [this.physics.add.collider(door.sprite, this.player.sprite)]];
        this.doors.push(doorAndCollider);
        door.sprite.depth = 1;
        let wall = this.add.sprite((tile.x + 0.5) * tileSize * (gameScale / 16) , (tile.y + 0.5) * tileSize * (gameScale / 16), "world1tiles-sprite", 12);
        wall.scale = gameScale / 16;
        wall.depth = 0;
        this.backgroundWalls.push(wall);
      } else if (tile.index === 69) {
        let endPortal = new Portal(this.handler, this, "portal", "portal", "level5","level6");
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

    this.anims.create({
        key: "wizard-idle",
        frames: this.anims.generateFrameNumbers("wizard", { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });

    // Mad scientist
    this.wizard = this.physics.add.sprite(200, 750, "wizard");
    this.wizard.setScale(gameScale / 16);
    this.wizard.play("wizard-idle", true);

    // Music
    this.music1 = this.sound.add("normalmusic");
    this.music1.loop = true;
    this.music1.play();
    this.music2 = this.sound.add("apocmusic");
    this.music2.loop = true;
    this.music2.play();
    this.music2.setVolume(0);

    for (let doorAndColliders of this.doors) {
      let door = doorAndColliders[0];
      let colliders = doorAndColliders[1];
      for (let boxAndColliders of this.boxes) {
        let box = boxAndColliders[0];
        colliders.push(this.physics.add.collider(box.sprite, door.sprite));
      }
    }

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

    // Connects pressure plates and doors
    if (this.pressurePlates[0].isPressed) {
      this.doors[0][0].openDoor();
    } else {
      this.doors[0][0].closeDoor();
    }

    if (this.pressurePlates[1].isPressed) {
      this.doors[1][0].openDoor();
    } else {
      this.doors[1][0].closeDoor();
    }

    if (this.pressurePlates[2].isPressed) {
      this.doors[2][0].openDoor();
    } else {
      this.doors[2][0].closeDoor();
    }

    // Opens and closes doors collision
    for (let doorAndColliders of this.doors) {
      let door = doorAndColliders[0];
      let colliders = doorAndColliders[1];
      for (let collider of colliders) {
        collider.active = !door.isOpen;
      }
    }

    if (Math.pow(this.player.sprite.x - 200, 2) + Math.pow(this.player.sprite.y - 750, 2) <= 69 ** 2) console.log("hi");
  }

  onTimeStateChange() {
    this.baseTilemap.destroy();
    this.physics.world.removeCollider(this.playerCollider);

    // Removes box colliders
    for (let boxAndColliders of this.boxes) {
      let colliders = boxAndColliders[1];
      for (let collider of colliders) {
        this.physics.world.removeCollider(collider);
      }
    }

    // Remove door colliders
    for (let doorAndColliders of this.doors) {
      let colliders = doorAndColliders[1];
      for (let collider of colliders) {
        this.physics.world.removeCollider(collider);
      }
    }

    let boxAndCollider1 = this.boxes[0];
    let boxAndCollider2 = this.boxes[1];
    let boxAndCollider3 = this.boxes[2];

    switch (this.timeState) {
      case "normal":
        this.baseTilemap = this.make.tilemap(
            {key: "normalmap5", tileWidth: 32, tileHeight: 32});
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset",
            "world1tiles");
        this.tiles = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.tiles.scale = gameScale / 16;
        this.playerCollider = this.physics.add.collider(this.player.sprite,
            this.tiles);

        for (let i = 0; i < this.boxes.length; i++) {
          let box = this.boxes[i][0];
          box.sprite.setTexture("box");
          this.boxes[i][1][0] = this.physics.add.collider(box.sprite, this.tiles);
          this.boxes[i][1][1] = this.physics.add.collider(box.sprite, this.player.sprite);
        }

        boxAndCollider1[1].push(this.physics.add.collider(boxAndCollider1[0].sprite, boxAndCollider2[0].sprite))
        boxAndCollider2[1].push(this.physics.add.collider(boxAndCollider2[0].sprite, boxAndCollider3[0].sprite))
        boxAndCollider3[1].push(this.physics.add.collider(boxAndCollider3[0].sprite, boxAndCollider1[0].sprite))

        // Adds door colliders
        for (let doorAndColliders of this.doors) {
          let door = doorAndColliders[0];
          let colliders = doorAndColliders[1];
          colliders.push(this.physics.add.collider(door.sprite, this.player.sprite));
          for (let boxAndColliders of this.boxes) {
            let box = boxAndColliders[0];
            colliders.push(this.physics.add.collider(box.sprite, door.sprite));
          }
        }

        this.tiles.setCollisionBetween(1, 10);

        this.background1.setTexture("bg1", 4);
        this.background2.setTexture("bg1", 3);
        this.background3.setTexture("bg1", 2);
        this.background4.setTexture("bg1", 1);
        this.background5.setTexture("background5-normal");

        for (let wall of this.backgroundWalls) {
          wall.setTexture("world1tiles-sprite", 12);
        }

        this.player.sprite.tint = 0xffffff;

        this.music1.setVolume(1);
        this.music2.setVolume(0);
        break;
      case "apocalyptic":
        this.baseTilemap = this.make.tilemap(
            {key: "purplemap5", tileWidth: 32, tileHeight: 32});
        var world1tiles = this.baseTilemap.addTilesetImage("world1tileset",
            "world1tiles-purple");
        this.tiles = this.baseTilemap.createLayer(0, world1tiles, 0, 0);
        this.tiles.scale = gameScale / 16;
        this.playerCollider = this.physics.add.collider(this.player.sprite,
            this.tiles);

        for (let i = 0; i < this.boxes.length; i++) {
          let box = this.boxes[i][0];
          box.sprite.setTexture("box purple");
          this.boxes[i][1][0] = this.physics.add.collider(box.sprite, this.tiles);
          this.boxes[i][1][1] = this.physics.add.collider(box.sprite, this.player.sprite);
        }

        boxAndCollider1[1].push(this.physics.add.collider(boxAndCollider1[0].sprite, boxAndCollider2[0].sprite))
        boxAndCollider2[1].push(this.physics.add.collider(boxAndCollider2[0].sprite, boxAndCollider3[0].sprite))
        boxAndCollider3[1].push(this.physics.add.collider(boxAndCollider3[0].sprite, boxAndCollider1[0].sprite))

        // Adds door colliders
        for (let doorAndColliders of this.doors) {
          let door = doorAndColliders[0];
          let colliders = doorAndColliders[1];
          colliders.push(this.physics.add.collider(door.sprite, this.player.sprite));
          for (let boxAndColliders of this.boxes) {
            let box = boxAndColliders[0];
            colliders.push(this.physics.add.collider(box.sprite, door.sprite));
          }
        }

        this.tiles.setCollisionBetween(1, 10);

        this.background1.setTexture("bg2", 4);
        this.background2.setTexture("bg2", 3);
        this.background3.setTexture("bg2", 2);
        this.background4.setTexture("bg2", 1);
        this.background5.setTexture("background5-apocalyptic");

        for (let wall of this.backgroundWalls) {
          wall.setTexture("world1tiles-purple-sprite", 12);
        }

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