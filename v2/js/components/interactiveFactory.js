class InteractiveFactory {
	constructor() {
		// super()
		this.keys = {
			player: {
				keyUp: configDefault.keys.player.keyUp,
				keyDown: configDefault.keys.player.keyDown,
				keyLeft: configDefault.keys.player.keyLeft,
				keyRight: configDefault.keys.player.keyRight,
			},
			ui: {
				keySpace: configDefault.keys.ui.keySpace,
				keyEnter: configDefault.keys.ui.keyEnter,
				keyEscape: configDefault.keys.ui.keyEscape,
				keyTilde: configDefault.keys.ui.keyTilde,
				keyPlus: configDefault.keys.ui.keyPlus,
				keyMinus: configDefault.keys.ui.keyMinus,
				keyShift: configDefault.keys.ui.keyShift,
				keyTalk: configDefault.keys.ui.keyTalk
			}
		}
	}
	set_interactivity(sceneNum = 0) {
		GAME.scene.scenes[sceneNum].input.keyboard.on('keydown', (event) => { PLAYERFACTORY.checkPlayerOnKeyDown(event) });
		GAME.scene.scenes[sceneNum].input.keyboard.on('keyup', (event) => { PLAYERFACTORY.checkPlayerOnKeyUp(event) });
		GAME.scene.scenes[sceneNum].input.on('wheel', (event) => { this.onWheelScroll(event) });
		window.addEventListener('resize', () => { this.resizeApp() }, false);
	}
	onWheelScroll(event) {
		event.deltaY > 0
			? GAME.scene.scenes[SCENEIMMAT].cameras.main.zoom > configDefault.zoom.min ? GAME.scene.scenes[SCENEIMMAT].cameras.main.zoom -= configDefault.zoom.step : ''
			: GAME.scene.scenes[SCENEIMMAT].cameras.main.zoom < configDefault.zoom.max ? GAME.scene.scenes[SCENEIMMAT].cameras.main.zoom += configDefault.zoom.step : '';
	}
	resizeApp = () => {
		GAME.scene.scenes[SCENEIMMAT].scale.resize(window.innerWidth, window.innerHeight);
		if (LOGON) console.log('canvasSize:', 'w:' + GAME.scene.scenes[SCENEIMMAT].canvas.width, 'h:' + GAME.scene.scenes[SCENEIMMAT].canvas.height)
	}
}
let INTERACTIVEFACTORY = new InteractiveFactory();
