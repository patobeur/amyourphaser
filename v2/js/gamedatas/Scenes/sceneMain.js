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
