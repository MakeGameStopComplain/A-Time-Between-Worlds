class MainMenu extends Phaser.Scene {
    constructor() {
        super("main-menu");
    }

    preload() {
        this.load.image("coverart", "image/title image-4.png.png");
        this.load.image("credits", "image/about-popup.png");
        this.load.spritesheet("playbutton", "image/2worldbuttons.png", { frameWidth: 320, frameHeight: 640 / 4 });
        this.load.audio("titlesong", "muzak/dumbsong.wav");
        this.load.image("title", "image/title text.png");
    }

    create() {
        this.coverart = this.add.image(gameWidth / 2, gameHeight / 2, "coverart");
        this.coverart.setScale(gameWidth / 128);
        this.credits = this.add.image(gameWidth / 2, gameHeight / 2, "credits");
        this.credits.setScale(gameWidth / 2000);
        this.credits.visible = false;

        this.titleText = this.add.image(gameWidth / 2, gameHeight / 2, "title");

        this.playbutton = this.add.sprite(125, gameHeight - 70, "playbutton", 0);
        this.playbutton.setScale(0.69);
        this.playbutton.setInteractive();
        this.playbutton.on("pointerover", function() {
            this.playbutton.setTexture("playbutton", 1);
        }.bind(this));
        this.playbutton.on("pointerout", function() {
            this.playbutton.setTexture("playbutton", 0);
        }.bind(this));
        this.playbutton.on("pointerdown", function() {
            this.titleMusic.pause();
            this.scene.start("cutscene");
        }.bind(this));

        this.aboutButton = this.add.sprite(gameWidth - 125, gameHeight - 70, "playbutton", 2);
        this.aboutButton.setScale(0.69);
        this.aboutButton.setInteractive();
        this.aboutButton.on("pointerover", function() {
            this.aboutButton.setTexture("playbutton", 3);
        }.bind(this));
        this.aboutButton.on("pointerout", function() {
            this.aboutButton.setTexture("playbutton", 2);
        }.bind(this));
        this.aboutButton.on("pointerdown", function() {
            this.credits.visible = !this.credits.visible;
            this.titleText.visible = !this.credits.visible;
        }.bind(this));

        this.titleMusic = this.sound.add("titlesong");
        this.titleMusic.play();
    }

    update() {}

}