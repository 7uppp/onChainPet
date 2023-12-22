import Phaser from 'phaser'


import DinoSprite from './DinoSprite'

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
	scene: [DinoSprite],
}

export default new Phaser.Game(config)
