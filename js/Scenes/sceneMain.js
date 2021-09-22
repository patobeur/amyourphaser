class SceneMain extends Tools {
	constructor() {
		super(SceneMain)
		// this.camera
		this.test = 'SceneMain test ok'
		this.myconsole
	}
	preload() {
		// !localStorage.getItem('phaser-data') ? localStorage.setItem('phaser-data', 0) : '';
		this.preloadRoomsImages()
		this.preloadPlayerImages()
		this.preloadPortalsImages()

		// testing collider
		this.loadPandaImage()
	}
	create() {
		// re set physics.world.setBounds with actual room size
		if (GAME.myPhaserConfig && GAME.myPhaserConfig.physics.arcade.debug) {
			this.physics.world.debugGraphic.defaultStrokeWidth = 10;
		}

		this.addRooms()
		this.setWorldBoundsByActualRoom()
		this.addplayer()
		this.addActualRoomPortals() // need addplayer
		this.addconsole()

		// testing collider
		this.addPanda()
		this.addBlock()

		// event
		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		// cameras.main follow player
		this.cameras.main.startFollow(this.playerOne);
	}
	update() {
	}
}
