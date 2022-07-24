const gameWidth = 640 * 1.5;
const gameHeight = 360 * 1.5;

window.onload = function() {
    var config = {
        width: gameWidth,
        height: gameHeight,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 555, x: 0 },
                debug: false,
                fps: 60
            }
        },
        scene: [/*MainMenu, */Scene1],
        pixelArt: true
    };
    
    var game = new Phaser.Game(config);
};