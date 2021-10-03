class ImagesFactory extends Phaser.Scene {
	constructor() {
		super()
		this.images = []
		this.sprites = []
		this.spritessheet = []
		this.loadedImages = []
		this.loadedSprites = []
		this.loadedSpritesSheet = []
		this.stacks = ['images', 'sprites', 'spritessheet']
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
	load_images() {
		for (let imageImmat = 0; imageImmat < this.images.length; imageImmat++) {
			let currentimage = this.images[imageImmat]
			if (typeof currentimage === 'object' && currentimage.uname && currentimage.path && currentimage.immat > -1) {//.isArray
				// ADD IMAGE to scene
				this.loadedImages = GAME.scene.scenes[SCENEIMMAT].load.image(currentimage.uname, currentimage.path)
			}
		}
	}
	load_sprites() {
		for (let spriteImmat = 0; spriteImmat < this.sprites.length; spriteImmat++) {
			let currentsprite = this.sprites[spriteImmat]
			if (typeof currentsprite === 'object' &&
				currentsprite.uname && currentsprite.path &&
				currentsprite.frames && currentsprite.immat > -1) {
				// ADD SPRITE to scene
				this.loadedSprites = GAME.scene.scenes[SCENEIMMAT].load.spritesheet(currentsprite.uname, currentsprite.path, currentsprite.frames)
				console.log('load: (', currentsprite.uname, ')', currentsprite.path)
			}
		}
	}
	load_spritessheet() {
		for (let spriteImmat = 0; spriteImmat < this.spritessheet.length; spriteImmat++) {
			let currentspritesheet = this.spritessheet[spriteImmat]
			if (typeof currentspritesheet === 'object' &&
				currentspritesheet.uname && currentspritesheet.path &&
				currentspritesheet.frames && currentspritesheet.immat > -1) {
				// ADD SpritesSheet to scene
				this.loadedSpritesSheet = GAME.scene.scenes[SCENEIMMAT].load.spritesheet(currentspritesheet.uname, currentspritesheet.path, currentspritesheet.frames)
				// console.log('load: (', currentspritesheet.uname, ')', currentspritesheet.path)
			}
		}
	}
	add_images(arraylist) {
		if (!arraylist.length) return;
		arraylist.forEach(item => {
			item.immat = this.images.length
			this.images.push(item)
		});
	}
	add_sprites(arraylist) {
		if (!arraylist) return;
		arraylist.forEach(item => {
			item.immat = this.sprites.length
			this.sprites.push(item)
		});
	}
	add_spritessheet(arraylist) {
		if (!arraylist) return;
		arraylist.forEach(item => {
			item.immat = this.spritessheet.length
			this.spritessheet.push(item)
		});
	}


	// -------------------------------------
	preloadAllImages() { // called by sceneMain.jss

		this.add_images(this.get_imagetopreload())
		this.add_images(PLAYERFACTORY.images)
		this.add_images(FLOORSFACTORY.get_imagetopreload())


		this.add_sprites(PLAYERFACTORY.sprites)
		this.add_spritessheet(PLAYERFACTORY.spritessheet)
		this.add_sprites(this.get_spritetopreload())


		// load images
		this.stacks.forEach(item => {
			console.log('load_' + item)
			this['load_' + item]()
		});
		if (LOGON) {
		}
		console.log('images', this.images)
		console.log('sprites', this.sprites)
		console.log('spritessheet', this.spritessheet)
	}
	addBackgroundToScene() { // grounds are clickable
		GAME.scene.scenes[SCENEIMMAT].allSingles.Background = GAME.scene.scenes[SCENEIMMAT].physics.add.image(0, 0, 'worldmap_1920x1080').setOrigin(0)//.setScale(10)
		// setInteractive && make clickable
		GAME.scene.scenes[SCENEIMMAT].allGroups.background.add(GAME.scene.scenes[SCENEIMMAT].allSingles.Background)
		console.log(GAME.scene.scenes[SCENEIMMAT].allGroups)
	}
	setBackgroundClickable() {
		// add event clik on background
		GAME.scene.scenes[SCENEIMMAT].allSingles.Background.setInteractive()
		GAME.scene.scenes[SCENEIMMAT].allSingles.Background.on('pointerdown', (go) => {
			// console.log(go)
			PLAYERFACTORY.playerMoveByPointer(
				GAME.scene.scenes[SCENEIMMAT].allSingles.Background
			)
		})
	}
}
let IMAGESFACTORY = new ImagesFactory();
