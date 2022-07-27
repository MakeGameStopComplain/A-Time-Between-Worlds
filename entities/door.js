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

  }

  openDoor() {
    this.isOpen = true;
  }

  closeDoor() {
    this.isOpen = false;
  }

}