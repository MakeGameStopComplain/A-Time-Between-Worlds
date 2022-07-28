class MainMenu extends Phaser.Scene {
    constructor() {
        super("main-menu");
    }

    preload() {
        this.load.image("coverart", "image/title image-4.png.png");
    }

    create() {
        this.coverart = this.add.image(gameWidth / 2, gameHeight / 2, "coverart");
        this.coverart.setScale(gameWidth / 128);
        
        this.playbutton = this.add.sprite(gameWidth / 2, gameHeight / 2 + 123, "playbutton", 0);
        this.playbutton.setScale(0.69);
        this.playbutton.setInteractive();
        this.playbutton.on("pointerover", function() {
            this.playbutton.setTexture("playbutton", 1);
        }.bind(this));  
        this.playbutton.on("pointerout", function() {
            this.playbutton.setTexture("playbutton", 0);
        }.bind(this));
        this.playbutton.on("pointerdown", function() {
            this.scene.start("scene-1");
        }.bind(this));
    }

    update() {}

}