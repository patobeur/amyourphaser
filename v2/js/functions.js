class Tools extends Phaser.Scene {
	constructor() {
		super()
		// this.uikeys = uikeys;
		// this.input.keyboard.on('keyup', this.onKeyUp, this);
		//
		// IMAGES & SPRITES
		this.allImages = {
			images: this.getAllImagesToLoad(),
			sprites: this.getAllImagesSpritesToLoad()
		}

		this.loadedImages = []
		this.loadedSprites = []

		// PHASER Singles
		this.allSingles = {
			background: [],
			uiburger: [],
		}
		// PHASER groups
		this.allGroups = {
			background: [],
			floor: [],
			player: [],
			ui: [],
		}
		this.camera2
		this.camera2Rotation = 0;
	}
	// ______________________________________________________
	// GAMESCENE PRELOADS ______________librarie+__//_______/
	createAll() {
		// console.log(this)
		this.allGroups = {
			background: this.add.group(),
			floor: this.add.group(),
			player: this.add.group(),
			// mob: this.add.group(),
			ui: this.add.group(),
		}
		this.allGroups.floor = FLOORSFACTORY.floors

		this.addBackgroundToScene()
		this.addPlayerToScene()
		this.addUi()
	}
	// get lists of images to load
	getAllImagesToLoad() {
		let allimages = [
			{ immat: -1, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: -1, uname: 'wall_32x64', path: THEMEPATHASSETS + 'img/wall_32x64.png' },
			{ immat: -1, uname: 'wall_64x64', path: THEMEPATHASSETS + 'img/wall_64x64.png' },
			{ immat: -1, uname: 'worldmap_1920x1080', path: THEMEPATHASSETS + 'img/worldmap_1920x1080.png' },
			{ immat: -1, uname: 'worldmap_1920x1080v2', path: THEMEPATHASSETS + 'img/worldmap_1920x1080v2.png' },
			{ immat: -1, uname: 'burger_off', path: THEMEPATHASSETS + 'img/burger_off.png' },
			{ immat: -1, uname: 'burger_on', path: THEMEPATHASSETS + 'img/burger_on.png' },
			{ immat: -1, uname: 'thisisnottobeseen', path: THEMEPATHASSETS + 'img/thisisnottobeseen.png' },
		]
		allimages = PLAYERFACTORY.get_imagetoload(allimages)
		if (FLOORSFACTORY.floors) {
			FLOORSFACTORY.floors.forEach(floor => {
				allimages.push(floor)
			});
		}
		if (IMAGESFACTORY.images) {
			IMAGESFACTORY.images.forEach(image => {
				allimages.push(image)
			});
		}
		return allimages
	}
	getAllImagesSpritesToLoad() {
		let allsprites = [
			PLAYERFACTORY.playerDatas.sprites,
		]
		if (FLOORSFACTORY.sprites) {
			FLOORSFACTORY.sprites.forEach(sprite => {
				allsprites.push(sprite)
			});
		}
		return allsprites
	}
	// preload them'all
	preloadAllImages() {
		// load images
		for (let imageImmat = 0; imageImmat < this.allImages.images.length; imageImmat++) {
			let CurrentImage = this.allImages.images[imageImmat]
			if (typeof CurrentImage === 'object' && CurrentImage.uname && CurrentImage.path) {//.isArray
				// set Uniquename
				let imageUname = 'image_' + imageImmat
				// insert Uname to this image
				this.allImages.images[imageImmat].immat = imageUname
				// ADD IMAGE to scene
				// console.log('load: (', CurrentImage.uname, ')', CurrentImage.path)
				this.loadedImages[imageImmat] = this.load.image(CurrentImage.uname, CurrentImage.path)
			}
		}
		// PLAYER SPRITES animations
		for (let spriteImmat = 0; spriteImmat < this.allImages.sprites.length; spriteImmat++) {
			let CurrentSprite = this.allImages.sprites[spriteImmat]
			if (typeof CurrentSprite === 'object' && CurrentSprite.uname && CurrentSprite.path) {//.isArray
				// set Uniquename
				let scriptUname = 'image_' + spriteImmat
				// insert Uname to this sprites
				this.allImages.sprites[spriteImmat].immat = scriptUname
				// ADD IMAGE to scene
				this.loadedSprites[spriteImmat] = this.load.spritesheet(CurrentSprite.uname, CurrentSprite.path, CurrentSprite.frames)
			}
		}
	}
	// add to scene
	addBackgroundToScene() { // grounds are clickable
		this.allSingles.Background = this.physics.add.image(0, 0, 'worldmap_1920x1080').setOrigin(0)//.setScale(10)
		// setInteractive && make clickable
		this.allSingles.Background.setInteractive()
		this.allGroups.background.add(this.allSingles.Background)
		this.allSingles.Background.on('pointerdown', () => { PLAYERFACTORY.PlayerMoveByPointer(this.allSingles.Background, this) }, this)
	}
	addPlayerToScene() {
		// console.log(PLAYERFACTORY.playerDatas)
		// console.log(PLAYERFACTORY.playerDatas.image.immat)
		console.log(this.allImages.images)

		PLAYERFACTORY.playerPhaser = this.physics.add.sprite(
			1, 1,
			PLAYERFACTORY.playerDatas.image.uname
		).setOrigin(0).setCollideWorldBounds(true);
		// add to group
		this.allGroups.player.add(PLAYERFACTORY.playerPhaser)

		PLAYERFACTORY.createPlayerGAMEAnims(this)
		CHATFACTORY.add_message('New around ? ', 'text')
		CHATFACTORY.add_message('Here you are x:' + parseInt(PLAYERFACTORY.playerPhaser.x) + ',y:' + parseInt(PLAYERFACTORY.playerPhaser.y), 'text')

	}
	updateplayerpos() {
		var distance = Phaser.Math.Distance.Between(
			PLAYERFACTORY.playerPhaser.x,
			PLAYERFACTORY.playerPhaser.y,
			PLAYERFACTORY.playerDatas.clickpos.x,
			PLAYERFACTORY.playerDatas.clickpos.y
		);

		// if body player mooving
		if (PLAYERFACTORY.playerPhaser.body.speed > 0) {
			if (distance < PLAYERFACTORY.playerDatas.speed) {
				CHATFACTORY.add_message('I reach pos x:' + parseInt(PLAYERFACTORY.playerPhaser.x) + ',y:' + parseInt(PLAYERFACTORY.playerPhaser.y), 'text', 'me')
				PLAYERFACTORY.playerPhaser.body.reset(PLAYERFACTORY.playerDatas.clickpos.x, PLAYERFACTORY.playerDatas.clickpos.y);
			}
		}
	}

	// camera follow
	setWorldBounds(obj) {
		console.log('this.physics.world.setBounds', obj.x, obj.y, obj.w, obj.h)
		this.physics.world.setBounds(obj.x, obj.y, obj.w, obj.h,);
	}
	resizeApp = () => {
		GAME.scale.resize(window.innerWidth, window.innerHeight);
		if (LOGON) console.log('canvasSize:', 'w:' + GAME.canvas.width, 'h:' + GAME.canvas.height)
	}
	camerasmainfollow = () => {
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);
		// this.cameras.main.setSize(400, 300);
	}
	onKeyDown(event) {
		PLAYERFACTORY.checkPlayerOnKeyDown(event)
	}
	// ________________________
	// TESTS ______________/__/
	// ADD UI
	addUi() { // useless
		this.allSingles.uiburger = this.add.image(128, 0, 'burger_off').setOrigin(1, 0).setScale(2)
		this.allGroups.ui.add(this.allSingles.uiburger)
	}
	onKeyUp(event) {
		PLAYERFACTORY.checkPlayerOnKeyUp(event)
	}
	addcamera2 = () => {
		this.camera2 = this.cameras.add(0, 0, 320, 200)
		this.camera2.rotation = Math.sin(45);
		this.camera2.startFollow(PLAYERFACTORY.playerPhaser);
		this.updatecameras()
	}
	updatecameras() { // better in scene update()
		// this.camera2.scrollX = Math.cos(50) * 100;
		// this.camera2.scrollY = Math.sin(50) * 100;
		// this.camera2.shake(100, 0.01);
		// this.camera2.flash(2000);
		// this.camera2.fade(2000);
		// this.camera2.zoom = 0.5 + Math.abs(Math.sin(this.camera2Rotation));
		// if (this.camera2._fadeAlpha >= 1.0) {
		// 	this.camera2._fadeAlpha = 0.0;
		// 	this.camera2.fade(1000);
		// }
	}
}
