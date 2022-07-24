class Handler {

    // Values
    entityIDCounter = 0;
    // Entity Dictionaries
    entities = {};
    entitiesToAdd = [];
    entitiesToRemove = [];
    
    update() {
        // Updates every active entity
        for (let key in this.entities) {
            let entity = this.entities[key];
            entity.update();
        }

        // Adds new entities
        for (let entity of this.entitiesToAdd) {
            this.entities[entity.hash] = entity;
        }
        this.entitiesToAdd = [];

        // Removes entities
        for (let entity of this.entitiesToRemove) {
            delete this.entities[entity.hash];
        }
        this.entitiesToRemove = [];
    }
    
    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    }

    removeEntity(entity) {
        this.entitiesToRemove.push(entity);
    }

}