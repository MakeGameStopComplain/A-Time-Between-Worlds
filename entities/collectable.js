class Collectable extends Entity {
    constructor(handler, scene, spriteName, entityName) {
        super(handler, scene, spriteName, entityName);
        this.collector = null;
    }

    setCollector(collector) {
        if (collector.sprite) {
            this.collector = collector;
            this.physics.add.overlap(this.sprite, collector.sprite);
        }
    }

    onPickup() {
        this.active = false;
        if (this.collector) {
            this.collector.body.velocity.y = -1000;
        }
    }
}