class SceneMain extends Tools {
	constructor() {
		super(SceneMain)
		this.myconsole
	}
	preload() {
		this.preloadAllRoomsImages()
	}
	create() {
		// re set physics.world.setBounds with actual room size
		// if (GAME.myPhaserConfig && GAME.myPhaserConfig.physics.arcade.debug) {
		// 	this.physics.world.debugGraphic.defaultStrokeWidth = 10;
		// }

		this.addRooms()
		this.setWorldBoundsByActualRoom()
		this.addplayer()

		// add ITEMSHOP
		this.addActualRoomPortals()
		this.addActualRoomItems()
		this.addActualRoomBlocks()

		// testing collider
		// this'll be remove
		this.addPandatest()
		this.addBlocktest()

		this.addStatsUI()
		this.addConsoleUI()

		this.add.text(600, 650, 'This is a beat off wall !!', { font: "12px Arial Black", fill: "#000" });
		this.add.text(290, 650, 'This is a', { font: "12px Arial Black", fill: "#000" });
		this.add.text(270, 670, 'game over wall !!', { font: "12px Arial Black", fill: "#000" });
		// event
		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		// cameras.main follow player
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);

		if (LOGON) console.log('A_CurrentLibrarie', this.A_CurrentLibrarie)

	}
	update() {
	}
}
