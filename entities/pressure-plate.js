class PressurePlate extends Entity {
  constructor(handler, scene, spriteName, entityName, box) {
    super(handler, scene, spriteName, entityName);

    this.sprite.setImmovable();
    this.sprite.scale = gameScale / 16;

    this.box = box;

    this.isPressed = false;
  }

  update() {
    super.update();

    // Lets the box or player press the pressure plate
    let boxOnPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), this.box.sprite.getBounds());
    let playerPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), this.scene.player.sprite.getBounds());

    this.isPressed = boxOnPressurePlate || playerPressurePlate;

    if (this.isPressed) {
      this.sprite.setTexture("pressure plate", 1);
    } else {
      this.sprite.setTexture("pressure plate", 0);
    }

  }

}