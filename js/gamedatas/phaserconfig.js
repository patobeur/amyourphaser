// definition Phaser
var myPhaserConfig = {
	type: Phaser.CANVAS,
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
		}
	},
	scene: [],
	mydata: { mess: 'patobeur mess', lovely: 'great' }
};
