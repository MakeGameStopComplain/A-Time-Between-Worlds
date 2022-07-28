class HUD extends Phaser.Scene {

  constructor() {
    super("hud");
  }

  // Used to pass data between scenes
  init (data) {
    this.player = data.player;
  }

  preload() {
    this.load.spritesheet("heart", "image/heart.png", {frameWidth: 32, frameHeight: 32});
  }

  create() {
    this.hearts = [];
    for (let i = 0; i < this.player.health; i++) {
      let heart = this.add.sprite(i * 64 + 32, 32, "heart", 0);
      heart.scale = gameScale / 16;
      this.hearts.push(heart);
    }
  }

  update() {
    if (this.player.iFrames > 0) {
      let heart = this.hearts[this.player.health];
      if (this.player.iFrames % 10 > 6) {
        heart.setTexture("heart", 1);
      } else {
        heart.setTexture("heart", 2);
      }
    }
  }

}