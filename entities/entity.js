class Entity {
    constructor(handler, scene, spriteName, entityName, x, y, xVel, yVel) { 
        // Setup settings
        this.scene = scene;
        this.entityName = entityName; // No spaces in entity name
        this.entityID = handler.entityIDCounter;
        this.handler = handler;
        this.handler.entityIDCounter++;
        this.active = true;
        this.hash = `${this.entityName}${this.entityID}`;
        // Heritage
        this.parent = null;
        this.children = {};
        // Sprite
        this.spriteName = spriteName; // Hard coded per entity
        this.sprite = this.scene.physics.add.sprite(0, 0, this.spriteName);
        // Bounding box
        this.boxWidth = this.sprite.width;
        this.boxHeight = this.sprite.height;
        // Position
        this.sprite.setPosition(x, y);
        this.sprite.setVelocity(xVel, yVel)
    };

    /*
    Heritage
    */
    setParent(parent) {
        this.parent = parent;
        parent.children[this.hash] = this;
    }

    clearParent() {
        if (!this.parent) return;
        delete this.parent.children[this.hash];
    }

    /*
    Bounding Box
    */
    getBoundingBox() {
        let box = [
            this.sprite.x - (this.boxWidth / 2),
            this.sprite.y - (this.boxHeight / 2),
            this.sprite.x + (this.boxWidth / 2),
            this.sprite.y + (this.boxHeight / 2),
        ]; // bottom left x, bottom left y, top right x, top right y, 
        return box;
    }
    
    getCollision(collisionEntity) {
        let bbox1 = this.getBoundingBox();
        let bbox2 = collisionEntity.getBoundingBox();

        if (bbox1[0] > bbox2[2] || bbox2[0] > bbox1[2]) return false;
        if (bbox1[1] > bbox2[3] || bbox2[1] > bbox1[3]) return false;

        return true;
    }

    /*
    Generic
    */
    update() {
        // Update children
        for (const k in this.children) {
            this.children[k].update();
        }
    }

    destroy() {
        // this.clearParent();
        this.handler.removeEntity(this);
        this.sprite.destroy();
    }
}