class SceneMain extends Tools {
	constructor() {
		super(SceneMain)
		// this.camera
		this.myconsole
	}
	preload() {
		// !localStorage.getItem('phaser-data') ? localStorage.setItem('phaser-data', 0) : '';
		this.preloadRoomsImages()
		this.preloadPlayerImages()
		this.preloadPortalsImages()
	}
	create() {
		// re set physics.world.setBounds with actual room size
		this.physics.world.debugGraphic.defaultStrokeWidth = 2;


		this.addRooms()
		this.physics.world.setBounds(
			this.Rooms[this.actualroom].x,
			this.Rooms[this.actualroom].y,
			this.Rooms[this.actualroom].w,
			this.Rooms[this.actualroom].h
		);
		this.addplayer()
		this.addconsole()

		// event
		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		// cameras.main follow player
		this.cameras.main.startFollow(this.playerOne);
	}
	update() {
	}

}
