class cutscene extends Phaser.Scene {
    
    constructor() { super("cutscene"); }
    
    preload() {
        this.load.spritesheet("anim", "image/New Piskel (7).png", { frameWidth: 640, frameHeight: 480 });
        this.load.audio("song", "muzak/nice_song.mp3");
    }
    
    create() {
        this.internalClock = -1;
        
        this.song = this.sound.add("song");
        this.song.play();
        
        this.anims.create({
            key: "custne",
            frames: this.anims.generateFrameNumbers("anim", { start: 0, end: 14 }),
            frameRate: 2,
            repeat: 0
        });

        this.kevinArt = this.add.sprite(gameWidth / 2, gameHeight / 2, "anim");
        this.kevinArt.play("custne");
        // this.kevinArt.setScale(gameWidth / 128);

        setTimeout(function() {
            this.scene.start("level1");
            this.song.pause();
        }.bind(this), 10000);
    }
    
    update() {
        
    }
    
}