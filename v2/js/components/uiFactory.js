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
		this.images = this.get_images()
	}
	// addmsg(string) {
	// 	let newmsg = document.createElement('div')
	// 	newmsg.textContent = (typeof string == 'string')
	// 		? string
	// 		: 'not a string !!';
	// 	this.msgbox.prepend(newmsg)
	// }
	// ADD UI
	addUi() { // useless
		GAME.scene.scenes[SCENEIMMAT].allSingles.uiburger = GAME.scene.scenes[SCENEIMMAT].add.image(128, 0, 'burger_off').setOrigin(.5, .5).setScale(1)
		GAME.scene.scenes[SCENEIMMAT].allGroups.ui.add(GAME.scene.scenes[SCENEIMMAT].allSingles.uiburger)

	}
	get_images() {
		return [
			{ immat: -1, uname: 'cursor', path: THEMEPATHASSETS + 'img/cursor.png' },
		]
	}
}
let UIFACTORY = new UiFactory();
