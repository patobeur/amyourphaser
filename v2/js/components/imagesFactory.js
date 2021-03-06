class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = []
		this.sprites = []
		this.spritessheet = []
		this.bulletssprite = []
		this.ui = []

		this.loadedimages = []
		this.loadedsprites = []
		this.loadedspritesSheet = []
		this.loadedbulletssprite = []

		this.stacks = ['images', 'sprites', 'spritessheet', 'bulletssprite', 'ui']

		this.stackedcounter = 0
		this.loadedcounter = 0
	}
	// basics 
	get_basicsimagetopreload = () => {
		return [
			{ immat: -1, uname: 'worldmap_1920x1080', path: THEMEPATHIMG + 'worldmap_1920x1080.png' },
			{ immat: -1, uname: 'worldmap_1920x1080v2', path: THEMEPATHIMG + 'worldmap_1920x1080v2.png' },
			{ immat: -1, uname: 'burger_off', path: THEMEPATHIMG + 'burger_off.png' },
			{ immat: -1, uname: 'burger_on', path: THEMEPATHIMG + 'burger_on.png' },
			// { immat: -1, uname: 'thisisnottobeseen', path: THEMEPATHIMG + 'thisisnottobeseen.png' },
			// { immat: -1, uname: 'cursor', path: THEMEPATHIMG + 'cursor.png' },
		]
	}
	get_basicsspritetopreload = () => {
		return [
			{ immat: -1, uname: 'cursor_left', path: THEMEPATHSPRITE + 'cursor_left.png', frames: { frameWidth: 32, frameHeight: 32 } },
			{ immat: -1, uname: 'cursor_right', path: THEMEPATHSPRITE + 'cursor_right.png', frames: { frameWidth: 32, frameHeight: 32 } },
		]
	}
	add_imagesToLoadList(imageArray, type) {
		if (!imageArray.length || !imageArray.length > 0 || !type) { console.log('bad'); return }
		imageArray.forEach(item => {
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
		// player
		this.add_imagesToLoadList(PLAYERFACTORY.images, 'images')
		this.add_imagesToLoadList(PLAYERFACTORY.sprites, 'sprites')
		this.add_imagesToLoadList(PLAYERFACTORY.spritessheet, 'spritessheet')
		this.add_imagesToLoadList(PLAYERFACTORY.bulletssprite, 'bulletssprite')
		// floors
		this.add_imagesToLoadList(FLOORSFACTORY.images, 'images')
		// ui
		this.add_imagesToLoadList(UIFACTORY.images, 'ui')

		// load images
		this.stacks.forEach(itemname => {
			this.load_mixed(itemname)
		});
		if (LOGON) {
			console.log('spritessheet', this.spritessheet)
			console.log('bulletssprite', this.bulletssprite)
			console.log('sprites', this.sprites)
			console.log('images', this.images)
		}
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
}
let IMAGESFACTORY = new ImagesFactory();
