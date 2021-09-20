class SceneMain extends Tools {
	constructor() {
		super(SceneMain)
		// this.camera
		this.myconsole
		this.panda
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
		this.physics.world.debugGraphic.defaultStrokeWidth = 2;


		this.addRooms()
		this.setWorldBounds()
		this.addplayer()
		this.addconsole()






		// testing collider
		this.addPanda()










		// event
		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		// cameras.main follow player
		this.cameras.main.startFollow(this.playerOne);
	}
	update() {
	}
	loadPandaImage() {
		// testing collider
		this.load.image('panda', 'assets/panda.gif')
	}
	addPanda() {
		// testing collider
		this.panda = this.physics.add.image(
			this.Rooms[this.actualroom].x + 65,
			this.Rooms[this.actualroom].y + 1,
			'panda'
		).setOrigin(0)
		this.physics.add.overlap(this.panda, this.playerOne, this.collidingPanda, null, this);
	}
	collidingPanda() {
		console.log('your are collidingPanda()')

		this.panda.disableBody(true, true);
		this.panda.destroy()

		// create a new one at random room and pos
	}
}
