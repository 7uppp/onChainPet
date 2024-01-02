import Phaser from 'phaser'


import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},
	transparent: true,
	scene: [GameScene],
}

export default new Phaser.Game(config)
