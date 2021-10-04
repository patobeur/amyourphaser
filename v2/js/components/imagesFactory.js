class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = this.get_basicsimagetopreload()
		this.sprites = this.get_basicsspritetopreload()
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
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHASSETS + 'img/wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHASSETS + 'img/worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHASSETS + 'img/worldmap_1920x1080v2.png' },
			{ immat: false, uname: 'burger_off', path: THEMEPATHASSETS + 'img/burger_off.png' },
			{ immat: false, uname: 'burger_on', path: THEMEPATHASSETS + 'img/burger_on.png' },
			{ immat: false, uname: 'thisisnottobeseen', path: THEMEPATHASSETS + 'img/thisisnottobeseen.png' },
		]
	}
	get_basicsspritetopreload = () => {
		return []
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
			this.loadedcounter++
		}
	}
	add_imagesToLoadList(arraylist, type) {
		if (!arraylist.length || !type) return;
		arraylist.forEach(item => {
			item.immat = this.images.length
			this[type].push(item)
			this.stackedcounter++
		});
	}

	// -------------------------------------
	preloadAllImages() { // called by sceneMain.js
		// add to loadlist
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
			console.log('sprites', this.sprites)
			console.log('spritessheet', this.spritessheet)
			console.log('bulletssprite', this.bulletssprite)
		}
	}
	addBackgroundToScene() { // grounds are clickable
		// console.log(FLOORSFACTORY.currentFloorImmat)
		let currentfloor = FLOORSFACTORY.images[FLOORSFACTORY.currentFloorImmat].uname

		GAME.scene.scenes[SCENEIMMAT].allSingles.Background =
			GAME.scene.scenes[SCENEIMMAT].physics.add.image(
				0, 0,
				currentfloor
			).setOrigin(0)//.setScale(10)
		GAME.scene.scenes[SCENEIMMAT].allGroups.background.add(
			GAME.scene.scenes[SCENEIMMAT].allSingles.Background
		)
		// console.log(GAME.scene.scenes[SCENEIMMAT].allGroups)
	}
}
let IMAGESFACTORY = new ImagesFactory();
