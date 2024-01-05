export default class Button {
  constructor(x, y, label, scene, callback) {
    this.button = scene.add.text(x, y, label)
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: 'blue' })
      .setInteractive()
      .on('pointerdown', () => callback())
      .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }))

    this.setText = (newLabel) => {
      this.button.setText(newLabel)
    }
  }


}


