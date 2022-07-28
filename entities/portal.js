class Portal extends Collectable {
    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);
    }

    onPickup() {
        // level beaten I guess
        console.log("hooray.");
    }
}