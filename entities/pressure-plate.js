class PressurePlate extends Entity {
  constructor(handler, scene, spriteName, entityName) {
    super(handler, scene, spriteName, entityName);

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setImmovable();
    this.sprite.scale = gameScale / 16;

  }

  update() {
    super.update();
  }

}