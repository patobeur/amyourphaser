class SceneMain extends Tools {
	constructor() {
		super()
		this.camera
		this.myconsole
	}
	preload() {
		!localStorage.getItem('phaser-bestscore') ? localStorage.setItem('phaser-bestscore', 0) : '';
		this.preloadRoomsImages()
		this.preloadPlayerImages()
		this.preloadPortalsImages()
	}
	create() {
		this.addRooms()

		// re set physics.world.setBounds 
		// this.ObjectsBounds.world = {
		// 	w: this['room' + this.actualroom].width,
		// 	h: this['room' + this.actualroom].height
		// }
		// this.physics.world.setBounds(0, 0, this.ObjectsBounds.world.w, this.ObjectsBounds.world.h);

		this.addplayer()

		this.addconsole()

		this.input.keyboard.on('keydown', this.onKeyDown, this);
		this.input.on('wheel', () => { this.onWheelScroll(event) }, this);

	}
	update() {
	}

}
