class SceneMain extends Tools {
	constructor() {
		super(SceneMain)
	}
	preload() {
		this.preloadAllImages()
	}
	create() {
		this.createAll()
		this.consoleconfig()

		this.camerasmainfollow()
		// cameras.main follow player

		this.input.keyboard.on('keydown', this.onKeyDown, this);
		// this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);
		this.resizeApp()
		window.addEventListener('resize', () => { this.resizeApp() }, false);
	}
	update() {
		// this.game.config.width = window.innerWidth;
		// this.game.config.height = window.innerHeight;
		// this.centerX = (this.game.config.width / 2);
		// this.centerY = (this.game.config.height / 2);
		// console.log('refresh:', 'x:' + this.centerX, 'y:' + this.centerY)
	}
	consoleconfig() {
		if (LOGON) {
			console.log('GAME', GAME)
			console.log('GAME.config', GAME.config)
			console.log('myPhaserConfig', myPhaserConfig)
			myPhaserConfig
		}
		console.log('Ready to go !')
	}
}
