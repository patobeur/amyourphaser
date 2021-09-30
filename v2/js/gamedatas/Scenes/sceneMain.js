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
		this.setWorldBounds()
		this.camerasmainfollow()
		this.addcamera2()
		// cameras.main follow player

		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.keyboard.on('keyup', this.onKeyUp, this);
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
