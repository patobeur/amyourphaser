class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = []
		this.sprites = []
		this.spritessheet = []
		this.loadedImages = []
		this.loadedSprites = []
		this.loadedSpritesSheet = []
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
	get_spritetopreload = () => {
		return []
	}
	// --
	add_images(arraylist) {
		if (!arraylist.length) return;
		arraylist.forEach(image => {
			image.immat = '' + this.images.length
			this.images.push(image)
			// console.log('image:', image)
		});
		// console.log('add_images:', arraylist)
	}
	add_sprites(arraylist) {
		if (!arraylist) return;
		arraylist.forEach(sprite => {
			sprite.immat = '' + this.sprites.length
			this.sprites.push(sprite)
			// console.log('sprite:', sprite)
		});
		// console.log('add_sprites:', arraylist)
	}
	load_images(thisgame) {
		for (let imageImmat = 0; imageImmat < this.images.length; imageImmat++) {
			let currentimage = this.images[imageImmat]
			if (typeof currentimage === 'object' && currentimage.uname && currentimage.path && currentimage.immat > -1) {//.isArray
				// ADD IMAGE to scene
				this.loadedImages = thisgame.load.image(currentimage.uname, currentimage.path)
				// console.log('load: (', currentimage.uname, ')', currentimage.path)
			}
		}
	}
	load_sprites(thisgame) {
		for (let spriteImmat = 0; spriteImmat < this.sprites.length; spriteImmat++) {
			let currentsprite = this.sprites[spriteImmat]
			if (typeof currentsprite === 'object' &&
				currentsprite.uname && currentsprite.path &&
				currentsprite.frames && currentsprite.immat > -1) {
				// ADD SPRITE to scene
				this.loadedSprites = thisgame.load.spritesheet(currentsprite.uname, currentsprite.path, currentsprite.frames)
				// console.log('load: (', currentsprite.uname, ')', currentsprite.path)
			}
		}
	}

	preloadAllImages(thisgame) { // called by sceneMain.js
		// this is all going to ImagesFactory Class
		this.add_images(this.get_imagetopreload())
		this.add_images(PLAYERFACTORY.get_imagetopreload())
		this.add_images(FLOORSFACTORY.images)

		this.add_sprites(this.get_spritetopreload())
		this.add_sprites([PLAYERFACTORY.playerDatas.sprites])
		this.add_sprites(FLOORSFACTORY.sprites)
		// load images
		this.load_images(thisgame)
		this.load_sprites(thisgame)
		console.log(this.images)
		console.log(this.sprites)
		console.log(this.spritessheet)
	}

}
let IMAGESFACTORY = new ImagesFactory();
