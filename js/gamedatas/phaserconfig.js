// definition Phaser
// var myPhaserConfig = {
// 	type: Phaser.AUTO,
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// 	parent: 'amyourphaser',
// 	physics: {
// 		default: 'arcade',
// 		pixelArt: true, // do nothing ??
// 		antialias: true, // do nothing ??
// 		arcade: {
// 			// gravity: { y: 0 },
// 			// debug: false
// 		},
// 		scale: {
// 			mode: Phaser.Scale.FIT,
// 			parent: 'amyourphaser',
// 			autoCenter: Phaser.Scale.CENTER_BOTH,
// 			width: window.innerWidth,
// 			height: window.innerHeight
// 		},
// 	},
// 	scene: [],
// 	mydata: { mess: 'patobeur mess', lovely: 'great' }
// };

// var myPhaserConfig = {
// 	type: Phaser.AUTO,
// 	physics: {
// 		default: 'arcade',
// 	},
// 	backgroundColor: '#000',
// 	scale: {
// 		mode: Phaser.Scale.FIT,
// 		parent: 'amyourphaser',
// 		autoCenter: Phaser.Scale.CENTER_BOTH,
// 		width: 800,
// 		height: 600
// 		// width: window.innerWidth,
// 		// height: window.innerHeight,
// 	},
// 	scene: [],
// 	mydata: { mess: 'patobeur mess', lovely: 'great' }
// };
// definition Phaser
var myPhaserConfig = {
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
	},
	backgroundColor: '#000',
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'amyourphaser',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: window.screen.width,
		height: window.screen.height
	},
	scene: [],
	mydata: { mess: 'patobeur mess', lovely: 'great' }
};
