class UiFactory extends Phaser.Scene {
	constructor() {
		super()
		this.zoom = {
			origin: configDefault.zoom.origin,
			step: configDefault.zoom.step,
			max: configDefault.zoom.max,
			min: configDefault.zoom.min,
		}
		// chat message box
		this.msgbox = document.getElementById('messages-box')
	}
	// addmsg(string) {
	// 	let newmsg = document.createElement('div')
	// 	newmsg.textContent = (typeof string == 'string')
	// 		? string
	// 		: 'not a string !!';
	// 	this.msgbox.prepend(newmsg)
	// }
	addcursortoscene() {
		if (LOGON) console.log('addcursortoscene() to ', FLOORSFACTORY.uname)
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor = GAME.scene.scenes[SCENEIMMAT].physics.add.sprite(
			0, 0,
			'cursor_left'
		).setOrigin(.5, .5)//.setScale(10)
	}
}
let UIFACTORY = new UiFactory();
