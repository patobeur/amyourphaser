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
			cursor: Object,
		}
		// PHASER groups
		this.allGroups = {}
		this.camera2 = Object
	}
	// _________________________________________
	// GAMESCENE PRELOADS _librarie+__//_______/
	preloadAll() {
		IMAGESFACTORY.preloadAllImages()
		this.allGroups = {
			background: this.add.group(),
			floor: this.add.group(),
			player: this.add.group(),
			// mob: this.add.group(),
			ui: this.add.group(),
		}
	}
	createAll() {

		FLOORSFACTORY.addFloorToScene()
		INTERACTIVEFACTORY.setFloorClickable()
		UIFACTORY.addcursortoscene()
		PLAYERFACTORY.addplayertoscene()
		this.addUi() // burger
		INTERACTIVEFACTORY.resizeApp()

		this.consoleconfig()
		this.camerasmainfollow() // cameras.main follow player
		this.addcamera2()


		// keydown, keyup, wheel, resize and other interactions
		INTERACTIVEFACTORY.set_interactivity(0)
		// setInteractive && make clickable
		this.setWorldBounds()

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
	setWorldBounds() {
		let floor = GAME.scene.scenes[SCENEIMMAT].allGroups.floor[FLOORSFACTORY.currentFloorUname]
		let coords = {
			x: floor.x -= (PLAYERFACTORY.playerPhaser.width / 2) - 1,
			y: floor.y -= (PLAYERFACTORY.playerPhaser.height / 2) - 1,
			w: floor.width += (PLAYERFACTORY.playerPhaser.width) + 1,
			h: floor.height += (PLAYERFACTORY.playerPhaser.height) + 1
		}
		// set bounds
		this.physics.world.setBounds(coords.x, coords.y, coords.w, coords.h);
		if (LOGON) console.log('this.physics.world.setBounds', coords.x, coords.y, coords.w, coords.h)
	}
	// camera follow
	camerasmainfollow = () => {
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);
		// this.cameras.main.setSize(x, y);
	}
	// ________________________
	// TESTS ______________/__/
	// ADD UI
	addUi() { // useless
		this.allSingles.uiburger = this.add.image(128, 0, 'burger_off').setOrigin(1, 0).setScale(1)
		this.allGroups.ui.add(this.allSingles.uiburger)
	}
	addcamera2 = () => {
		this.camera2 = this.cameras.add(20, 20, 160, 100)
		// this.camera2.rotation = Math.sin(45);
		this.camera2.startFollow(PLAYERFACTORY.playerPhaser);
		this.camera2.zoom = .5
		this.camera2.setBackgroundColor(0x222222)
		this.updatecameras()
	}
	updatecameras() { // better in scene update()
		// this.camera2.scrollX = Math.cos(50) * 100;
		// this.camera2.scrollY = Math.sin(50) * 100;
		// this.camera2.shake(100, 0.01);
		// this.camera2.flash(2000);
		// this.camera2.fade(2000);
		// this.camera2.zoom = 0.5 + Math.abs(Math.sin(45));
		// if (this.camera2._fadeAlpha >= 1.0) {
		// 	this.camera2._fadeAlpha = 0.0;
		// 	this.camera2.fade(1000);
		// }
	}
}
