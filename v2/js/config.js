// definition Phaser
var myPhaserConfig = {
	type: Phaser.AUTO,
	parent: 'amyourphaser',
	physics: {
		default: 'arcade',
	},
	// backgroundColor: '#EAEAEA',
	scale: {
		mode: Phaser.Scale.NONE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [],
};
// set scenes
myPhaserConfig.scene = [SceneMain]
// creation GAME Instance
let GAME = new Phaser.Game(myPhaserConfig);
let MATHSFACTORY = new MathFactory();
let KEYSFACTORY = new KeyboardFactory();
let FLOORSFACTORY = new FloorsFactory();
let IMAGESFACTORY = new ImagesFactory();
let PLAYERFACTORY = new PlayerFactory();
