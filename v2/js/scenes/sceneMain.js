class SceneMain extends Tools {
	constructor() {
		super({
			key: "SceneMain"
		})
	}
	preload() {
		this.preloadAllImages()
	}
	create() {
		this.createAll()
		this.consoleconfig()
		this.setWorldBounds(PLAYERFACTORY.playerDatas.setbounds)
		this.camerasmainfollow() // cameras.main follow player
		this.addcamera2()

		// keyboard event 
		this.input.keyboard.on('keydown', (event) => { PLAYERFACTORY.checkPlayerOnKeyDown(event) }, this);
		this.input.keyboard.on('keyup', (event) => { PLAYERFACTORY.checkPlayerOnKeyUp(event) }, this);
		// this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		this.resizeApp()
		window.addEventListener('resize', () => { this.resizeApp() }, false);

	}
	update() {
	}
	consoleconfig() {
		if (LOGON) {
			console.log('GAME', GAME)
			console.log('GAME.config', GAME.config)
			console.log('myPhaserConfig', myPhaserConfig)
		}
		console.log('Ready to go !')
	}
}
