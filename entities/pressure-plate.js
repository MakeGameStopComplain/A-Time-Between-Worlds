class PressurePlate extends Entity {
  constructor(handler, scene, spriteName, entityName, player, box) {

    let isPressed = false;

    super(handler, scene, spriteName, entityName);

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setImmovable();
    this.sprite.setGravityY(2000);

    this.sprite.scale = gameScale / 16;

    // Lets the box or player press the pressure plate
    this.box = box;
    this.player = player;
  }

  update() {
    super.update();

    let boxOnPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), this.box.sprite.getBounds());
    let playerPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(this.sprite.getBounds(), this.player.sprite.getBounds());

    if (boxOnPressurePlate || playerPressurePlate) {
      console.log("on")
    }
  }

}