class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = []
		this.sprites = []
		this.spritessheet = []
		this.bulletssprite = []

		this.loadedimages = []
		this.loadedsprites = []
		this.loadedspritesSheet = []
		this.loadedbulletssprite = []

		this.stacks = ['images', 'sprites', 'spritessheet', 'bulletssprite']

		this.stackedcounter = 0
		this.loadedcounter = 0
	}
	// basics 
	get_basicsimagetopreload = () => {
		return [
			{ immat: -1, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: -1, uname: 'wall_64x64', path: THEMEPATHASSETS + 'img/wall_64x64.png' },
			{ immat: -1, uname: 'worldmap_1920x1080', path: THEMEPATHASSETS + 'img/worldmap_1920x1080.png' },
			{ immat: -1, uname: 'worldmap_1920x1080v2', path: THEMEPATHASSETS + 'img/worldmap_1920x1080v2.png' },
			{ immat: -1, uname: 'burger_off', path: THEMEPATHASSETS + 'img/burger_off.png' },
			{ immat: -1, uname: 'burger_on', path: THEMEPATHASSETS + 'img/burger_on.png' },
			{ immat: -1, uname: 'thisisnottobeseen', path: THEMEPATHASSETS + 'img/thisisnottobeseen.png' },
			{ immat: -1, uname: 'cursor', path: THEMEPATHASSETS + 'img/cursor.png' },
		]
	}
	get_basicsspritetopreload = () => {
		return [
			{ immat: -1, uname: 'cursor_left', path: THEMEPATHASSETS + 'sprites/cursor_left.png', frames: { frameWidth: 32, frameHeight: 32 } },
			{ immat: -1, uname: 'cursor_right', path: THEMEPATHASSETS + 'sprites/cursor_right.png', frames: { frameWidth: 32, frameHeight: 32 } },
		]
	}
	// mixed
	load_mixed(itemname) {
		for (let Immat = 0; Immat < this[itemname].length; Immat++) {
			let current = this[itemname][Immat]
			if (itemname === 'images') {
				if (typeof current === 'object' && current.uname && current.path && current.immat > -1) {//.isArray
					this['loaded' + itemname] = GAME.scene.scenes[SCENEIMMAT].load.image(current.uname, current.path)
				}
			}
			else {
				if (typeof current === 'object' && current.uname && current.path && current.immat > -1 && current.frames) {
					this['loaded' + itemname] = GAME.scene.scenes[SCENEIMMAT].load.spritesheet(current.uname, current.path, current.frames)
				}
			}
			// console.log('loaded' + itemname, current.uname, current.path, current.frames)
			this.loadedcounter++
		}
	}
	add_imagesToLoadList(arraylist, type) {
		if (!arraylist.length || !arraylist.length > 0 || !type) { console.log('bad'); return }
		arraylist.forEach(item => {
			item.immat = this[type].length
			this[type].push(item)
			this.stackedcounter++
		});
	}

	// -------------------------------------
	preloadAllImages() { // called by sceneMain.js
		// add to loadlist
		this.add_imagesToLoadList(this.get_basicsimagetopreload(), 'images')
		this.add_imagesToLoadList(this.get_basicsspritetopreload(), 'sprites')
		this.add_imagesToLoadList(PLAYERFACTORY.images, 'images')
		this.add_imagesToLoadList(PLAYERFACTORY.sprites, 'sprites')
		this.add_imagesToLoadList(PLAYERFACTORY.spritessheet, 'spritessheet')
		this.add_imagesToLoadList(PLAYERFACTORY.bulletssprite, 'bulletssprite')
		this.add_imagesToLoadList(FLOORSFACTORY.get_imagetopreload(), 'images')


		// load images
		this.stacks.forEach(itemname => {
			// this['load_' + item](item)
			this.load_mixed(itemname)
		});


		if (LOGON) {
			console.log('images', this.images)
			console.log('spritessheet', this.spritessheet)
			console.log('bulletssprite', this.bulletssprite)
			console.log('sprites', this.sprites)
		}
	}
}
let IMAGESFACTORY = new ImagesFactory();
