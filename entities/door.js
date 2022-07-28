class Door extends Entity {

  doorCollider;

  constructor(handler, scene, spriteName, entityName) {
    super(handler, scene, spriteName, entityName);

    this.sprite.setImmovable();
    this.sprite.scale = gameScale / 16;

    this.isOpen = false;
  }

  update() {
    super.update();

    if (this.scene.timeState === "normal") {
      if (this.isOpen) {
        this.sprite.setTexture("door", 0);
      } else {
        this.sprite.setTexture("door", 1);
      }
    } else {
      if (this.isOpen) {
        this.sprite.setTexture("door purple", 0);
      } else {
        this.sprite.setTexture("door purple", 1);
      }
    }
  }

  openDoor() {
    this.isOpen = true;
  }

  closeDoor() {
    this.isOpen = false;
  }

}