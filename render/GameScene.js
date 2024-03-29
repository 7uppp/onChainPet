import Phaser from "phaser"
import Dino from "./Dino"
import Fireball from "./FireBall"
import Button from "./Button"
import WalletConnect from "./WalletConnect"


export default class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene')
		this.Dino = null
		this.Fireball = null
		this.address = null
		this.modal = null
		this.walletConnect = new WalletConnect()
		this.modal = this.walletConnect.web3Modal
		this.modal.subscribeProvider(({ provider, providerType, address, chainId, isConnected }) => {
			this.address = address
			this.button && this.setButtonText(address ? address.slice(0, 3) + '...' + address.slice(-2) : 'connect')
		})
	}

	preload () {
		this.load.spritesheet("Dino", 'assets/DinoSprites.png', { frameWidth: 24, frameHeight: 24 })
		this.load.spritesheet('buff', 'assets/buff.png', { frameWidth: 90, frameHeight: 180 })
		//load customer cursor
		this.load.image('cursor', 'assets/cursor.png')
	}

	create () {
		//hide default cursor
		this.input.setDefaultCursor('none')
		this.Dino = new Dino(this)
		this.Fireball = new Fireball(this)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.Wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		// eslint-disable-next-line no-unused-vars
		this.button = new Button(400, 300, 'connect', this, async () => {
			try {
				const isConnected = this.modal.getIsConnected()
				if (!isConnected) {
					this.modal.open()
				}
				else {
					this.modal.disconnect()
				}
			}
			catch (error) {
				console.log(error)
			}
		})




		const cursor = this.add.image(0, 0, 'cursor')
		cursor.setScale(0.3)
		this.input.on('pointermove', function (pointer) {
			cursor.x = pointer.x
			cursor.y = pointer.y
		}, this)
	}

	update () {
		this.Dino.update()
		if (this.Wkey.isDown) {
			// this.showGameOver()
			this.Fireball.fire(this.Dino)
		}
	}

	setButtonText (text) {
		this.button.setText(text)
	}
}
