const gameWidth = 960;
const gameHeight = 540;
const tileSize = 32;
const gameScale = gameWidth / tileSize;
let handler;

window.onload = function() {
    let config = {
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
        scene: [/*MainMenu, */NormalWorld, ApocalypticWorld],
        pixelArt: true
    };
    
    let game = new Phaser.Game(config);
    handler = new Handler()

};