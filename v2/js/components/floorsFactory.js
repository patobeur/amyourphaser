class FloorsFactory extends Phaser.Scene {
	constructor() {
		super()
		this.currentFloorImmat = new Number('0')
		this.currentFloorUname = new String('floor_0')
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
	set_blocks(floorImmat) {
		let blocks = {
			0: { x: 0, y: 0, uname: 'block_0' },
			1: { x: 200, y: 200, uname: 'block_0' }
		}
		blocks.forEach(element => {

		});
	}
	addFloorToScene() { // grounds are clickable
		this.currentFloorUname = FLOORSFACTORY.images[FLOORSFACTORY.currentFloorImmat].uname
		console.log('addFloorToScene', FLOORSFACTORY.currentFloorImmat, this.currentFloorUname)

		GAME.scene.scenes[SCENEIMMAT].allGroups.floor[this.currentFloorUname] =
			GAME.scene.scenes[SCENEIMMAT].physics.add.image(
				0, 0,
				this.currentFloorUname
			).setOrigin(0)//.setScale(10)

		// GAME.scene.scenes[SCENEIMMAT].allGroups.floor.add(
		// 	GAME.scene.scenes[SCENEIMMAT].allSingles.background[currentfloor]
		// )
		// console.log(GAME.scene.scenes[SCENEIMMAT].allGroups)
	}
}
let FLOORSFACTORY = new FloorsFactory();
