import Phaser from "phaser"
import Dino from "./Dino"
import Fireball from "./FireBall"
import Button from "./Button"

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene')
		this.Dino = null
		this.Fireball = null
	}

	preload () {
		this.load.spritesheet("Dino", 'assets/DinoSprites.png', { frameWidth: 24, frameHeight: 24 })
		this.load.spritesheet('buff', 'assets/buff.png', { frameWidth: 90, frameHeight: 180 })
	}

	create () {
		this.Dino = new Dino(this)
		this.Fireball = new Fireball(this)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.Wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		// eslint-disable-next-line no-unused-vars
		const button = new Button(400, 300, 'say hi', this, () => { window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ') })


	}




	update () {
		this.Dino.update()
		if (this.Wkey.isDown) {
			// this.showGameOver()
			this.Fireball.fire(this.Dino)
		}
	}
}
