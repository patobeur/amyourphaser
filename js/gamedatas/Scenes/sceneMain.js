class SceneMain extends Tools {
	constructor() {
		super(SceneMain)
		// this.camera
		this.test = 'SceneMain test ok'
		this.myconsole
	}
	preload() {
		this.preloadAllRoomsImages()

		// testing collider
		this.loadPandaImagetest()
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

		// add ITEMSHOP
		// let itemsOfthisRoom = ITEMSHOP.get_article('pandabagsmall')
		this.addActualRoomItems()
		this.addActualRoomBlocks()

		// testing collider
		// this'll be remove
		this.addPandatest()
		this.addBlocktest()

		// event
		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		// cameras.main follow player
		this.cameras.main.startFollow(this.playerOne);


		console.log('A_CurrentLibrarie', this.A_CurrentLibrarie)

	}
	update() {
	}
}
