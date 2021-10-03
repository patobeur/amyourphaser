class FloorsFactory extends Phaser.Scene {
	constructor() {
		super()
		this.currentFloorImmat = new Number('0')
		this.images = this.get_images()
		// this.sprites = this.get_sprites()
	}
	set_CurrentFloorImmat(floorImmat) {
		this.floors[floorImmat] ? this.currentFloorImmat = floorImmat : ''
	}
	get_images() {
		return [
			{ immat: -1, uname: 'floor_0', path: THEMEPATHASSETS + 'floors/floor_256-2.png' },
		]
	}
	// get_sprites() {
	// 	return []
	// }
	get_imagetopreload() {
		return this.images
	}
}
let FLOORSFACTORY = new FloorsFactory();
