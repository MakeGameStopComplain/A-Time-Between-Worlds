class Portal extends Collectable {
    constructor(handler, scene, spriteName, entityName, thisLevel, nextLevel) {
        super(handler, scene, spriteName, entityName);

        this.thisLevel = thisLevel;
        this.nextLevel = nextLevel;

        this.sprite.scale = gameScale / 16;
    }

    update() {
        this.sprite.play("portal-animation", true);
    }

    onPickup() {
        // This triggers when the player beats the level
        this.scene.scene.start(this.nextLevel);
        this.scene.scene.stop(this.thisLevel);
        this.scene.stopMusic();
    }
}