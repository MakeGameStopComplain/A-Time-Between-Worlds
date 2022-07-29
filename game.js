const gameWidth = 960;
const gameHeight = 540;
const tileSize = 32;
const gameScale = gameWidth / tileSize;
const fps = 60;

window.onload = function() {
    var config = {
        type: Phaser.WEBGL,
        width: gameWidth,
        height: gameHeight,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0, x: 0 },
                debug: false,
                fps: fps
            }
        },
        fps: {
            target: fps,
            forceSetTimeOut: true
        },
        scene: [MainMenu, Level1, Level2, Scene1, HUD],
        pixelArt: true
    };
    
    var game = new Phaser.Game(config);
};