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
		this.addRooms()

		// re set physics.world.setBounds with actual room size
		// this.ObjectsBounds.world = {
		// 	w: this['room' + this.actualroom].width,
		// 	h: this['room' + this.actualroom].height,
		// }
		// this.physics.world.setBounds(0, 0, this.ObjectsBounds.world.w, this.ObjectsBounds.world.h);

		this.addplayer()

		this.addconsole()

		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', (event) => { this.onWheelScroll(event) }, this);

		this.cameras.main.startFollow(this.playerOne);
	}
	update() {
	}

}
