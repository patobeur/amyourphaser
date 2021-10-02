class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = []
		this.sprites = []
		// this.add_images(this.get_images())
		// this.add_sprites(this.get_sprites())
	}
	get_imagetopreload = () => {
		return [
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHASSETS + 'img/wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHASSETS + 'img/worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHASSETS + 'img/worldmap_1920x1080v2.png' },
			{ immat: false, uname: 'burger_off', path: THEMEPATHASSETS + 'img/burger_off.png' },
			{ immat: false, uname: 'burger_on', path: THEMEPATHASSETS + 'img/burger_on.png' },
			{ immat: false, uname: 'thisisnottobeseen', path: THEMEPATHASSETS + 'img/thisisnottobeseen.png' },
		]
	}
	// get_sprites = () => {
	// 	return []
	// }
	// --
	add_images(arraylist) {
		if (!arraylist.length) return;
		console.log('add_images:')
		arraylist.forEach(image => {
			image.immat = '' + this.images.length
			this.images.push(image)
			// console.log('image:', image)
		});
	}
	add_sprites(arraylist) {
		if (!arraylist) return;
		console.log('add_sprites:', typeof arraylist, arraylist)
		arraylist.forEach(sprite => {
			sprite.immat = '' + this.sprites.length
			this.sprites.push(sprite)
			// console.log('sprite:', sprite)
		});
	}
	load_images(thisgame) {

	}
}
let IMAGESFACTORY = new ImagesFactory();
