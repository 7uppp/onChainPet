import * as Phaser from "phaser"

export default class DinoSprite extends Phaser.Scene {
	constructor() {
		super('Dino-Sprite')

		this.Dino = null
		this.dinoDirection = 'right'
		this.lastFireTime = 0
		this.fireInterval = 500
	}

	preload () {

		this.load.spritesheet("Dino", 'assets/DinoSprites.png', { frameWidth: 24, frameHeight: 24 })
		this.load.spritesheet('buff', 'assets/buff.png', { frameWidth: 90, frameHeight: 180 })
	}

	create () {

		this.Dino = this.createDino()
		this.cursors = this.input.keyboard.createCursorKeys()

		this.Wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

	}


	update () {
		if (this.cursors.left.isDown) {
			this.Dino.setVelocityX(-160)
			this.Dino.anims.play('left', true)
			this.Dino.setScale(-4, 4)
			this.dinoDirection = 'left'
		} else if (this.cursors.right.isDown) {
			this.Dino.setVelocityX(160)
			this.Dino.anims.play('right', true)
			this.Dino.setScale(4, 4)
			this.dinoDirection = 'right'
		} else {
			this.Dino.setVelocityX(0)
		}

		// if (this.cursors.up.isDown) {
		// 	this.Dino.setVelocityY(-160)
		// 	this.Dino.anims.play('up', true)
		// } else if (this.cursors.down.isDown) {
		// 	this.Dino.setVelocityY(160)
		// 	this.Dino.anims.play('down', true)
		// } else {
		// 	this.Dino.setVelocityY(0) // 停止垂直移动
		// }

		if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
			this.Dino.anims.play('turn')
		}

		//这里正常情况下不应该是！this,应该是在接触地面后才允许继续跳跃。需要修改
		if (this.cursors.up.isDown && !this.Dino.body.touching.down) {
			console.log("Jump")
			this.Dino.setVelocityY(-330)
		}

		if (this.Wkey.isDown) {
			this.fireBall()
		}


	}
	createDino () {
		const centerX = window.innerWidth / 2
		const centerY = window.innerHeight / 2
		let Dino = this.physics.add.sprite(centerX, centerY, 'Dino')
		Dino.setBounce(0.5)
		Dino.setCollideWorldBounds(true)

		Dino.setInteractive()
		this.input.setDraggable(Dino)
		Dino.setScale(4)


		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("Dino", { start: 3, end: 9 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers("Dino", { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'turn',
			frames: [{ key: "Dino", frame: 1 }],
			frameRate: 20
		})

		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers("Dino", { start: 3, end: 7 }),
			frameRate: 20,
			repeat: -1
		})

		// this.anims.create({
		// 	key: 'down',
		// 	frames: this.anims.generateFrameNumbers("Dino", { start: 2, end: 7 }),
		// 	frameRate: 20,
		// 	repeat: -1
		// })



		Dino.on('pointerover', () => {
			console.log('hello') // 播放新动画
		})

		Dino.on('pointerout', () => {
			console.log('bye') // 切换回原始动画
		})
		Dino.on('pointerdown', () => {
			console.log('oh no') // 切换回原始动画
		})


		Dino.on('pointerup', () => {
			console.log('oh yes') // 切换回原始动画
		})

		Dino.on('drag', (pointer, dragX, dragY) => {
			Dino.x = dragX
			Dino.y = dragY
		})

		return Dino
	}

	fireBall () {
		const currentTime = new Date().getTime()
		if (currentTime - this.lastFireTime < this.fireInterval) return
		this.lastFireTime = currentTime
		const offsetX = this.dinoDirection === 'right' ? 24 * 4 / 2 + 10 : -24 * 4 / 2 - 10
		let fireBall = this.physics.add.sprite(this.Dino.x + offsetX, this.Dino.y, 'buff')
		fireBall.setScale(0.3)
		const fireBallSpeed = 320
		if (this.dinoDirection === 'right') {
			fireBall.setVelocityX(fireBallSpeed) // 向右发射
			fireBall.setAngle(-90) // 火球头朝右
		} else {
			fireBall.setVelocityX(-fireBallSpeed) // 向左发射
			fireBall.setAngle(90) // 火球头朝左
		}
	}
}

