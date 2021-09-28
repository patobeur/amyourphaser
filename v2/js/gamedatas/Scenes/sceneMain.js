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

		// cameras.main follow player
		this.cameras.main.startFollow(this.all.PhaserPlayer);

		this.input.keyboard.on('keydown', this.onKeyDown, this);
		// this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);
		// window.addEventListener('resize', () => { this.resizeApp() })
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
