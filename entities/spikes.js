class Spikes extends Entity {
    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);
        this.sprite.scale = gameScale / 16;
        this.overlapper = this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.onHit, null, this);

        this.sprite.setSize(this.sprite.width, 4).setOffset(0, 18);
    }

    onHit(player, spike) {
        player.body.velocity.y = -1000;
        this.remakeOverlapper();
        this.scene.player.takeDamage();
    }

    remakeOverlapper() {
        this.overlapper.destroy();
        this.overlapper = this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.onHit, null, this);
    }
}