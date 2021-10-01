class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = this.get_images()
		this.sprites = this.get_sprites()
	}
	get_images = () => {
		return [
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHASSETS + 'img/wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHASSETS + 'img/worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHASSETS + 'img/worldmap_1920x1080v2.png' },
			{ immat: false, uname: 'burger_off', path: THEMEPATHASSETS + 'img/burger_off.png' },
			{ immat: false, uname: 'burger_on', path: THEMEPATHASSETS + 'img/burger_on.png' },
			{ immat: false, uname: 'thisisnottobeseen', path: THEMEPATHASSETS + 'img/thisisnottobeseen.png' },
		]
	}
	get_sprites = () => {
		return []
	}
}
