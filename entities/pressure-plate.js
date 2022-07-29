class PressurePlate extends Entity {
  constructor(handler, scene, spriteName, entityName, boxes) {
    super(handler, scene, spriteName, entityName);

    this.sprite.setImmovable();
    this.sprite.scale = gameScale / 16;

    this.boxes = boxes;

    this.isPressed = false;
  }

  update() {
    super.update();

    this.isPressed = false;

    for (let boxAndColliders of this.boxes) {
      let box = boxAndColliders[0];
      // Lets the box or player press the pressure plate
      let boxOnPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(
          this.sprite.getBounds(), box.sprite.getBounds());
      let playerPressurePlate = Phaser.Geom.Intersects.RectangleToRectangle(
          this.sprite.getBounds(), this.scene.player.sprite.getBounds());
      this.isPressed = boxOnPressurePlate || playerPressurePlate;
      if (this.isPressed) break;
    }

    if (this.scene.timeState === "normal") {
      if (this.isPressed) {
        this.sprite.setTexture("pressure plate", 1);
      } else {
        this.sprite.setTexture("pressure plate", 0);
      }
    } else {
      if (this.isPressed) {
        this.sprite.setTexture("pressure plate purple", 1);
      } else {
        this.sprite.setTexture("pressure plate purple", 0);
      }
    }

  }

}