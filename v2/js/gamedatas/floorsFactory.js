class FloorsFactory extends Phaser.Scene {
	constructor() {
		super()
		this.floors = this.get_floors()
		this.sprites = this.get_sprites()
	}
	set_Currentfloor = () => {

	}
	get_floors = () => {
		return [
			{ immat: 'floor_2', uname: 'floor_256-2', path: THEMEPATHASSETS + 'floors/floor_256-2.png' },
		]
	}
	get_sprites = () => {
		return [
			{ immat: false, uname: 'groundsprites', path: THEMEPATHASSETS + 'sprites/groundsprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
		]
	}


	// get_tiles = () => {
	// 	let tilesList = [31, 32, 33, 34, 35, 36, 37, 38]
	// 	let tilesarray = []
	// 	for (let b = 0; b < tilesList.length; b++) {
	// 		tilesarray.push(
	// 			{ immat: b, uname: 'ground_' + tilesList[b], path: THEMEPATHASSETS + 'grounds/ground_' + tilesList[b] + '.png' },
	// 		)
	// 	}
	// 	return tilesarray
	// }

	// addGroundsToScene() {
	// 	let col = parseInt(1920 / 32)
	// 	let row = parseInt(1080 / 32)
	// 	console.log('allGrounds.length', this.allGrounds.length)
	// 	let num = 0
	// 	let r = 0
	// 	for (let r = 0; r < row; r++) {
	// 		for (let c = 0; c < col; c++) {
	// 			let ground = this.allGrounds[this.get_aleaEntreBornes(0, this.allGrounds.length - 1)]
	// 			console.log(c + '/' + ground.uname)
	// 			console.log(ground.path)
	// 			// console.log(num)
	// 			this.GroundGroup.add(this.physics.add.image((32 * c), (32 * r), ground.uname).setOrigin(0))
	// 			num++
	// 		}
	// 	}
	// }
}
