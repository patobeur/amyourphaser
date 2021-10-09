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
	addcursortoscene() {
		if (LOGON) console.log('addcursortoscene() to ', FLOORSFACTORY.uname)
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor = GAME.scene.scenes[SCENEIMMAT].physics.add.sprite(
			0, 0,
			'cursor_left'
		).setOrigin(.5, .5).setVisible(true)//.setScale(10)

		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor.body.immovable = true
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor.body.moves = false
	}
	// ADD UI
	addUi() { // useless
		GAME.scene.scenes[SCENEIMMAT].allSingles.uiburger = this.add.image(128, 0, 'burger_off').setOrigin(1, 0).setScale(1)
		GAME.scene.scenes[SCENEIMMAT].allGroups.ui.add(GAME.scene.scenes[SCENEIMMAT].allSingles.uiburger)
	}
	get_images() {
		return [
			{ immat: -1, uname: 'cursor', path: THEMEPATHASSETS + 'img/cursor.png' },
		]
	}
}
let UIFACTORY = new UiFactory();
