// definition Phaser
var myPhaserConfig = {
	type: Phaser.AUTO,
	parent: 'amyourphaser',
	physics: {
		default: 'arcade',
		// pixelArt: true, // do nothing ??
		// antialias: true, // do nothing ??
	},
	// backgroundColor: '#EAEAEA',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
		// width: window.innerWidth,
		// height: window.innerHeight,
	},
	scene: [],
};
