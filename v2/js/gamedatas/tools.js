class Tools extends Phaser.Scene {
	constructor() {
		super()
		this.uikeys = uikeys;
		// this.input.keyboard.on('keyup', this.onKeyUp, this);
		//
		this.centerX
		this.centerY
		// IMAGES
		this.allImages = [
			// { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			PLAYERFACTORY.playerDatas.image,
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHIMG + 'wall_32x64.png' },
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHIMG + 'wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHIMG + 'wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHIMG + 'worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHIMG + 'worldmap_1920x1080v2.png' },
			{ immat: false, uname: 'burger_off', path: THEMEPATHIMG + 'burger_off.png' },
			{ immat: false, uname: 'burger_on', path: THEMEPATHIMG + 'burger_on.png' },
			{ immat: false, uname: 'thisisnottobeseen', path: THEMEPATHIMG + 'thisisnottobeseen.png' },
		]
		//this.load.spritesheet('playersprites', THEMEPATHSPRITES + 'playersprites.png', { frameWidth: 32, frameHeight: 32 })
		this.allSprites = [
			PLAYERFACTORY.playerDatas.sprites,
			{ immat: false, uname: 'groundsprites', path: THEMEPATHSPRITES + 'groundsprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
		]
		this.loadedImages = []
		this.loadedSprites = []
		// GROUPS
		this.BackgroundGroup = Object
		this.GroundGroup
		this.ItemGroup
		this.BlockGroup
		this.PlayerGroup
		this.UiGroup
		// ALL
		this.all = {
			Background: '',
			Ground: '',
			UiBurger: ''
		}
		this.camera2
		this.camera3
		this.camera2Rotation = 0;
	}
	// ______________________________________________________
	// GAMESCENE PRELOADS ______________librarie+__//_______/
	preloadAllImages() {
		// use imagesloaded[] to avoid loading twice the same
		// load images
		for (let imageImmat = 0; imageImmat < this.allImages.length; imageImmat++) {
			let CurrentImage = this.allImages[imageImmat]
			if (typeof CurrentImage === 'object' && CurrentImage.uname && CurrentImage.path) {//.isArray
				// set Uniquename
				let imageUname = 'image_' + imageImmat
				// insert Uname to this image
				this.allImages[imageImmat].immat = imageUname
				// ADD IMAGE to scene
				console.log('load: (', CurrentImage.uname, ')', CurrentImage.path)
				this.loadedImages[imageImmat] = this.load.image(CurrentImage.uname, CurrentImage.path)
			}
		}


		for (let spriteImmat = 0; spriteImmat < this.allSprites.length; spriteImmat++) {
			let CurrentSprite = this.allSprites[spriteImmat]
			if (typeof CurrentSprite === 'object' && CurrentSprite.uname && CurrentSprite.path) {//.isArray
				// set Uniquename
				let scriptUname = 'image_' + spriteImmat
				// insert Uname to this sprites
				this.allSprites[spriteImmat].immat = scriptUname
				// ADD IMAGE to scene
				console.log('load: (', CurrentSprite.uname, ')', CurrentSprite.path)

				this.loadedSprites[spriteImmat] = this.load.spritesheet(CurrentSprite.uname, CurrentSprite.path, CurrentSprite.frames)

			}
		}


		this.loadedSprites.push(
			this.load.spritesheet('playersprites', THEMEPATHSPRITES + 'playersprites.png', { frameWidth: 32, frameHeight: 32 })
			// this.load.image('playersprites', THEMEPATHIMG + 'burger_on.png')//, { frameWidth: 32, frameHeight: 32 })
		)
		console.log('load: (', 'playersprites', ')', THEMEPATHIMG + 'burger_on.png')
	}
	createAll() {
		// console.log(this)

		this.BackgroundGroup = this.add.group()
		// this.GroundGroup = this.add.group()
		// this.ItemGroup = this.add.group()
		// this.BlockGroup = this.add.group()
		this.PlayerGroup = this.add.group()
		this.UiGroup = this.add.group()
		this.addBackground()
		this.addPlayer()
		this.addUi()
	}
	// ADD PLAYER
	addPlayer() {

		PLAYERFACTORY.playerPhaser = this.physics.add.sprite(
			1,
			1,
			PLAYERFACTORY.playerDatas.image.uname
		)
			.setOrigin(0)
			.setCollideWorldBounds(true);

		this.PlayerGroup.add(PLAYERFACTORY.playerPhaser)
		// console.log(PLAYERFACTORY.playerDatas)

		this.createPlayerAnim()
	}
	createPlayerAnim() {
		console.log('gggggg')

		// https://labs.phaser.io/edit.html?src=src/animation/create%20animation%20from%20sprite%20sheet.js&v=3.55.2
		// Animation set

		GAME.anims.create({
			key: 'idle_down', frameRate: 8, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_up', frameRate: 8, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_left', frameRate: 8, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_right', frameRate: 8, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'walk_up', frameRate: 4, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [1, 0, 2, 0] }),
		});
		GAME.anims.create({
			key: 'walk_down', frameRate: 4, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [7, 6, 8, 6] }),
		});
		GAME.anims.create({
			key: 'walk_left', frameRate: 4, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [14, 12, 13, 12] }),
		});
		GAME.anims.create({
			key: 'walk_right', frameRate: 4, repeat: -1,
			frames: this.anims.generateFrameNumbers('playersprites', { frames: [19, 18, 20, 18] }),
		});
		// PLAYERFACTORY.playerPhaser.play('idle_down');
	}
	// ADD Background
	addBackground() {
		this.all.Background = this.physics.add.image(0, 0, 'worldmap_1920x1080').setOrigin(0)//.setScale(10)
		// setInteractive && make clickable
		this.all.Background.setInteractive()
		this.BackgroundGroup.add(this.all.Background)
		this.all.Background.on('pointerdown', () => { this.ClickedOn(this.all.Background) }, this)




		// there BLOCKS


















	}
	ClickedOn = (obj) => {
		var tx = obj.input.localX
		var ty = obj.input.localY
		PLAYERFACTORY.playerDatas.dest = { on: true, x: tx, y: ty, range: PLAYERFACTORY.playerPhaser.width }
		PLAYERFACTORY.playerDatas.deg = this.get_DegreeWithTwoPos(
			PLAYERFACTORY.playerPhaser.x,
			PLAYERFACTORY.playerPhaser.y,
			tx,
			ty
		)
		console.log('d:' + PLAYERFACTORY.playerDatas.deg + ' player.x:' + PLAYERFACTORY.playerPhaser.x + ',y:' + PLAYERFACTORY.playerPhaser.y, ' click.x:' + parseInt(tx) + ',y:' + parseInt(ty))

	}
	get_DegreeWithTwoPos = (fromX, fromY, destX, destY,) => {
		var nextY = fromY - destY;
		var nextX = fromX - destX;
		var theta = Math.atan2(-nextY, -nextX); // 0° = east
		theta *= 180 / Math.PI; // radians to degrees
		if (theta < 0) theta += 360; // negative case
		return theta;
	}
	// REFRESH PLAYER
	refreshPlayer() {
		// what ?
	}
	// ADD UI
	addUi() {
		this.all.UiBurger = this.add.image(this.game.config.width, 0, 'burger_off').setOrigin(1, 0).setScale(2)
		this.UiGroup.add(this.all.UiBurger)
	}
	// camera follow
	setWorldBounds() {
		console.log('this.all.Background', this.all.Background)
		this.physics.world.setBounds(
			PLAYERFACTORY.playerDatas.setbounds.x,
			PLAYERFACTORY.playerDatas.setbounds.y,
			PLAYERFACTORY.playerDatas.setbounds.w,
			PLAYERFACTORY.playerDatas.setbounds.h,
		);
	}
	// ________________________
	// TESTS ______________/__/
	resizeApp = () => {
		GAME.scale.resize(window.innerWidth, window.innerHeight);
		this.centerX = (GAME.canvas.width / 2);
		this.centerY = (GAME.canvas.height / 2);
		console.log('canvasSize:', 'w:' + GAME.canvas.width, 'h:' + GAME.canvas.height)
	}
	onKeyDown(event) {
		PLAYERFACTORY.checkPlayerOnKeyDown(event)
	}
	onKeyUp(event) {
		PLAYERFACTORY.checkPlayerOnKeyUp(event)
	}
	camerasmainfollow = () => {
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);

		// this.cameras.main.setSize(400, 300);
		// this.cameras.main.y = 10
		this.camera2 = this.cameras.add(0, 0, 320, 200)
		this.camera2.startFollow(PLAYERFACTORY.playerPhaser);

		this.updatecameras()
	}
	updatecameras() {
		this.camera2.scrollX = Math.cos(this.camera2Rotation) * 100;
		this.camera2.scrollY = Math.sin(this.camera2Rotation) * 100;

		// this.camera2.shake(100, 0.01);
		// this.camera2.flash(2000);
		// this.camera2.fade(2000);
		this.camera2.rotation = Math.sin(45);
		// this.camera2.zoom = 0.5 + Math.abs(Math.sin(this.camera2Rotation));
		// if (this.camera2._fadeAlpha >= 1.0) {
		// 	this.camera2._fadeAlpha = 0.0;
		// 	this.camera2.fade(1000);
		// }
	}
}
