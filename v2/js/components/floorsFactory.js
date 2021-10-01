class FloorsFactory extends Phaser.Scene {
	constructor() {
		super()
		this.currentFloorImmat = new Number('0')
		this.floors = this.get_floors()
		// this.sprites = this.get_sprites()
	}
	set_CurrentFloorImmat = (floorImmat) => {
		this.floors[floorImmat] ? this.currentFloorImmat = floorImmat : ''
	}
	get_floors = () => {
		return [
			{
				immat: 'floor_2',
				uname: 'floor_256-2',
				path: THEMEPATHASSETS + 'floors/floor_256-2.png'
			},
		]
	}
}
let FLOORSFACTORY = new FloorsFactory();
