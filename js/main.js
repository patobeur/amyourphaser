let GAME = Object
window.onload = () => {
	var config = {
		type: Phaser.CANVAS,
		width: window.innerWidth,
		height: window.innerHeight,
		parent: 'amyourphaser',
		physics: {
			default: 'arcade',
			arcade: {
				// gravity: { y: 0 },
				// debug: false
			}
		},
		scene: [SceneMain],// SceneTwo],
	};
	GAME = new Phaser.Game(config);
}