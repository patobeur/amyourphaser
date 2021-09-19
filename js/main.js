let GAME = Object
//                                     __
//    ________     ________      _____/\_\
//   /\       \   /\   __  \    /\   / / /
//  /  \       \ /  \  \_\  \__/_ \  \/_/ \
// /    \_______\ /\ \_______\___\ \_______\
// \    /       / \/ /  __   /___/ /  __   /
//  \  /       / \  /  /_/  /  \  /  /\ \ /
//   \/_______/   \/_______/    \/___\ \_\
//                                    \/_/
//   
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
				// debug: true
			}
		},
		scene: [SceneMain],// SceneTwo],
	};
	GAME = new Phaser.Game(config);
}
