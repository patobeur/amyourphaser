class GameFunctions extends Phaser.Scene {
	constructor() {
		super('SceneMain')
		// this.uikeys = uikeys;
		// this.input.keyboard.on('keyup', this.onKeyUp, this);
		//
		// PHASER Singles
		this.allSingles = {
			background: [],
			uiburger: [],
		}
		// PHASER groups
		this.allGroups = {}
		this.camera2 = Object
		this.camera2Rotation = 0;
	}
	// _________________________________________
	// GAMESCENE PRELOADS _librarie+__//_______/
	preloadAll() {
		IMAGESFACTORY.preloadAllImages()
	}
	createAll() {
		this.allGroups = {
			background: this.add.group(),
			floor: this.add.group(FLOORSFACTORY.floors),
			player: this.add.group(),
			// mob: this.add.group(),
			ui: this.add.group(),
		}

		IMAGESFACTORY.addBackgroundToScene()
		PLAYERFACTORY.addplayertoscene()
		this.addUi()
		INTERACTIVEFACTORY.resizeApp()

		this.consoleconfig()
		this.setWorldBounds(PLAYERFACTORY.playerDatas.setbounds)
		this.camerasmainfollow() // cameras.main follow player
		this.addcamera2()

		// keydown, keyup, wheel, resize and other interactions
		INTERACTIVEFACTORY.set_interactivity(0)
	}
	updateAll() {
		PLAYERFACTORY.updateplayerpos()
	}
	consoleconfig() {
		if (LOGON) {
			console.log('GAME', GAME)
			console.log('GAME.config', GAME.config)
			console.log('myPhaserConfig', myPhaserConfig)
		}
		console.log('Ready to go !')
	}
	// worl limit
	setWorldBounds(obj) {
		if (LOGON) console.log('this.physics.world.setBounds', obj.x, obj.y, obj.w, obj.h)
		this.physics.world.setBounds(obj.x, obj.y, obj.w, obj.h,);
	}
	// camera follow
	camerasmainfollow = () => {
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);
		// this.cameras.main.setSize(400, 300);
	}
	// ________________________
	// TESTS ______________/__/
	// ADD UI
	addUi() { // useless
		this.allSingles.uiburger = this.add.image(128, 0, 'burger_off').setOrigin(1, 0).setScale(2)
		this.allGroups.ui.add(this.allSingles.uiburger)
	}
	addcamera2 = () => {
		this.camera2 = this.cameras.add(0, 0, 320, 200)
		this.camera2.rotation = Math.sin(45);
		this.camera2.startFollow(PLAYERFACTORY.playerPhaser);
		this.updatecameras()
	}
	updatecameras() { // better in scene update()
		// this.camera2.scrollX = Math.cos(50) * 100;
		// this.camera2.scrollY = Math.sin(50) * 100;
		// this.camera2.shake(100, 0.01);
		// this.camera2.flash(2000);
		// this.camera2.fade(2000);
		// this.camera2.zoom = 0.5 + Math.abs(Math.sin(this.camera2Rotation));
		// if (this.camera2._fadeAlpha >= 1.0) {
		// 	this.camera2._fadeAlpha = 0.0;
		// 	this.camera2.fade(1000);
		// }
	}
}
