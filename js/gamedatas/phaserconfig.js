// definition Phaser
var myPhaserConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	parent: 'amyourphaser',
	physics: {
		default: 'arcade',
		pixelArt: true, // do nothing ??
		antialias: true, // do nothing ??
		arcade: {
			// gravity: { y: 0 },
			// debug: false
		},
		scale: {
			mode: Phaser.Scale.FIT,
			parent: 'phaser-example',
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: 800,
			height: 600
		},
	},
	scene: [],
	mydata: { mess: 'patobeur mess', lovely: 'great' }
};
