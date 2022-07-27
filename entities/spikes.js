class Spikes extends Entity {
    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);
        this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.onHit, null, this);
    }

    onHit(playa, spika) {
        playa.body.velocity.y = -1000;
    }
}