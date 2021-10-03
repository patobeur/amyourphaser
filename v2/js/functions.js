class Tools extends Phaser.Scene {
	constructor() {
		super()
		// this.uikeys = uikeys;
		// this.input.keyboard.on('keyup', this.onKeyUp, this);
		//
		// PHASER Singles
		this.allSingles = {
			background: [],
			uiburger: [],
		}
		// PHASER groups
		this.allGroups = {
			background: [],
			floor: [],
			player: [],
			ui: [],
		}
		this.camera2 = Object
		this.camera2Rotation = 0;
	}
	// _________________________________________
	// GAMESCENE PRELOADS _librarie+__//_______/
	preloadAll(){
		IMAGESFACTORY.preloadAllImages()
	}
	createAll() {
		// console.log()
		this.allGroups = {
			background: this.add.group(),
			floor: this.add.group(FLOORSFACTORY.floors),
			player: this.add.group(),
			// mob: this.add.group(),
			ui: this.add.group(),
		}

		this.addBackgroundToScene()
		PLAYERFACTORY.addplayertoscene()
		this.addUi()

		
		this.consoleconfig()
		this.setWorldBounds(PLAYERFACTORY.playerDatas.setbounds)
		this.camerasmainfollow() // cameras.main follow player
		this.addcamera2()

		this.resizeApp()
		// keyboard event 
		this.input.keyboard.on('keydown', (event) => { PLAYERFACTORY.checkPlayerOnKeyDown(event) }, this);
		this.input.keyboard.on('keyup', (event) => { PLAYERFACTORY.checkPlayerOnKeyUp(event) }, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		window.addEventListener('resize', () => { this.resizeApp() }, false);
	}
	updateAll(){		
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
	// add to scene
	addBackgroundToScene() { // grounds are clickable
		this.allSingles.Background = this.physics.add.image(0, 0, 'worldmap_1920x1080').setOrigin(0)//.setScale(10)
		// setInteractive && make clickable
		this.allSingles.Background.setInteractive()
		this.allGroups.background.add(this.allSingles.Background)
		this.allSingles.Background.on('pointerdown', (go) => {
			// console.log(go)
			PLAYERFACTORY.PlayerMoveByPointer(
				this.allSingles.Background,
				this)
		}, this)
	}
	// updateplayerpos() {
	// 	var distance = Phaser.Math.Distance.Between(
	// 		PLAYERFACTORY.playerPhaser.x,
	// 		PLAYERFACTORY.playerPhaser.y,
	// 		PLAYERFACTORY.playerDatas.clickpos.x,
	// 		PLAYERFACTORY.playerDatas.clickpos.y
	// 	);

	// 	// if body player mooving
	// 	if (PLAYERFACTORY.playerPhaser.body.speed > 0) {
	// 		if (distance < PLAYERFACTORY.playerDatas.speed) {
	// 			CHATFACTORY.add_message('I reach pos x:' + parseInt(PLAYERFACTORY.playerPhaser.x) + ',y:' + parseInt(PLAYERFACTORY.playerPhaser.y), 'text', 'me')
	// 			PLAYERFACTORY.playerPhaser.body.reset(PLAYERFACTORY.playerDatas.clickpos.x, PLAYERFACTORY.playerDatas.clickpos.y);
	// 		}
	// 	}
	// }

	// camera follow
	setWorldBounds(obj) {
		console.log('this.physics.world.setBounds', obj.x, obj.y, obj.w, obj.h)
		this.physics.world.setBounds(obj.x, obj.y, obj.w, obj.h,);
	}
	resizeApp = () => {
		GAME.scale.resize(window.innerWidth, window.innerHeight);
		if (LOGON) console.log('canvasSize:', 'w:' + GAME.canvas.width, 'h:' + GAME.canvas.height)
	}
	camerasmainfollow = () => {
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);
		// this.cameras.main.setSize(400, 300);
	}
	onKeyDown(event) {
		PLAYERFACTORY.checkPlayerOnKeyDown(event)
	}
	// ________________________
	// TESTS ______________/__/
	// ADD UI
	addUi() { // useless
		this.allSingles.uiburger = this.add.image(128, 0, 'burger_off').setOrigin(1, 0).setScale(2)
		this.allGroups.ui.add(this.allSingles.uiburger)
	}
	onKeyUp(event) {
		PLAYERFACTORY.checkPlayerOnKeyUp(event)
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
	onWheelScroll(event) {
		event.deltaY > 0
			? this.cameras.main.zoom > configDefault.zoom.min ? this.cameras.main.zoom -= configDefault.zoom.step : ''
			: this.cameras.main.zoom < configDefault.zoom.max ? this.cameras.main.zoom += configDefault.zoom.step : '';
	}
}
