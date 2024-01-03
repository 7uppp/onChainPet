export default class Fireball {
  constructor(scene) {
    this.scene = scene
    this.lastFireTime = 0
    this.fireInterval = 500
  }

  fire (dino) {
    const currentTime = new Date().getTime()
    if (currentTime - this.lastFireTime < this.fireInterval) return
    this.lastFireTime = currentTime

    // 计算火球发射的起始位置，根据恐龙的朝向和大小
    const offsetX = dino.dinoDirection === 'right' ? 24 * 4 / 2 + 10 : -24 * 4 / 2 - 10
    let fireBall = this.scene.physics.add.sprite(dino.sprite.x + offsetX, dino.sprite.y, 'buff')
    fireBall.setScale(0.3)
    fireBall.body.setGravityY(0)

    // 设置火球的速度和角度，根据恐龙的朝向
    const fireBallSpeed = 1000
    if (dino.dinoDirection === 'right') {
      fireBall.setVelocityX(fireBallSpeed)
      fireBall.setAngle(-90)
    } else {
      fireBall.setVelocityX(-fireBallSpeed)
      fireBall.setAngle(90)
    }
    if (fireBall.x > window.innerWidth || fireBall.x < 0) {
      fireBall.destroy()
    }

  }
}
