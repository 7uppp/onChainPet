export default class Dino {
  constructor(scene) {
    this.scene = scene
    this.sprite = this.createDino()
    this.dinoDirection = 'right'
    this.isHealthTextVisible = false

    this.sprite.on('pointerover', this.showHealthText, this)
    this.sprite.on('pointerout', this.hideHealthText, this)

    //add attributes
    this.health = 100
    this.growth = 0
    this.decreaseHealthTimer = scene.time.addEvent({
      delay: 3600000, // 3600000 毫秒 = 1 小时
      callback: this.decreaseHealth,
      callbackScope: this,
      loop: true
    })
  }


  createDino () {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    let Dino = this.scene.physics.add.sprite(centerX, centerY, 'Dino')
    Dino.setBounce(0.5)
    Dino.setCollideWorldBounds(true)
    Dino.setInteractive()
    this.scene.input.setDraggable(Dino)

    // 当开始拖拽时
    Dino.on('dragstart', () => {
      Dino.body.setAllowGravity(false) // 暂停重力影响
      Dino.body.setVelocity(0) // 停止所有运动
    })

    // 在拖拽过程中
    this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })


    // 当拖拽结束时
    Dino.on('dragend', () => {
      Dino.body.setAllowGravity(true) // 恢复重力影响
    })
    Dino.setScale(4)
    // 创建动画
    this.createAnimations()
    // 创建血条
    this.createHealthText()
    return Dino
  }

  showHealthText () {
    // 当鼠标悬停在恐龙上时，显示健康文本
    this.isHealthTextVisible = true
    this.healthText.setVisible(true)
  }

  hideHealthText () {
    // 当鼠标移出恐龙时，隐藏健康文本
    this.isHealthTextVisible = false
    this.healthText.setVisible(false)
  }

  createAnimations () {
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("Dino", { start: 3, end: 9 }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers("Dino", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: "Dino", frame: 1 }],
      frameRate: 20
    })
  }

  update () {
    const cursors = this.scene.cursors
    if (cursors.left.isDown) {
      this.sprite.setVelocityX(-160)
      this.sprite.anims.play('left', true)
      this.sprite.setScale(-4, 4)
      this.dinoDirection = 'left'
    } else if (cursors.right.isDown) {
      this.sprite.setVelocityX(160)
      this.sprite.anims.play('right', true)
      this.sprite.setScale(4, 4)
      this.dinoDirection = 'right'
    } else {
      this.sprite.setVelocityX(0)
      if (!cursors.up.isDown && !cursors.down.isDown) {
        this.sprite.anims.play('turn')
      }
    }
    if (cursors.up.isDown) {
      this.sprite.setVelocityY(-330)
    }
  }

  createHealthText () {
    this.healthText = this.scene.add.text(500, 400, 'Health: 100', { fontSize: '16px', fill: 'white' })
    this.healthText.setScrollFactor(0)
  }

  updateHealthText () {
    this.healthText.setText('Health: ' + this.health)
  }

  decreaseHealth () {
    this.health -= 5
    this.updateHealthText()
    if (this.health <= 0) {
      this.decreaseHealthTimer.remove()
      console.log('oh no, dino died :(')
    }
    else {
      console.log('Dino health decreased by 5. Current health:', this.health)
    }
  }
}
