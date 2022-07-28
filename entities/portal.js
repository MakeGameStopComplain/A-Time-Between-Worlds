class Portal extends Collectable {
    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);

        this.sprite.scale = gameScale / 16;
    }

    update() {
        this.sprite.play("portal-animation", true);
    }

    onPickup() {
        // level beaten I guess
        console.log("hooray.");
    }
}