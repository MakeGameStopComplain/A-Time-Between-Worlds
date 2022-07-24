class Scene1 extends Phaser.Scene {

    handler;

    constructor() {
        super("scene-1");
        this.handler = new Handler()
    }

    preload() {}

    create() {}

    update() {
        this.handler.update();
    }

}