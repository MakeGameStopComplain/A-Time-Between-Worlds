class Box extends Entity {
  constructor(handler, scene, spriteName, entityName) {
    super(handler, scene, spriteName, entityName);

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDragX(1000);
    this.sprite.setGravityY(2000);
    this.sprite.scale = gameScale / 16;
  }

  update() {
    super.update();
  }

}