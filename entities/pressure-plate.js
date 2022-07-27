class PressurePlate extends Entity {
  constructor(handler, scene, spriteName, entityName, player, box) {
    super(handler, scene, spriteName, entityName);

    this.sprite.setImmovable();
    this.sprite.scale = gameScale / 16;

    this.box = box;
    this.player = player;

    this.isPressed = false;
  }

  update() {
    super.update();

    // Lets the box or player press the pressure plate
    let boxOnPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), this.box.sprite.getBounds());
    let playerPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), this.player.sprite.getBounds());

    this.isPressed = boxOnPressurePlate || playerPressurePlate;
  }

}