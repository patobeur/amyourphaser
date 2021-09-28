class Tools extends Phaser.Scene {
	constructor() {
		super()
		this.allkeys = allkeys;
		//
		this.centerX
		this.centerY
		// IMAGES
		this.allImages = [
			{ immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHIMG + 'wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHIMG + 'wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHIMG + 'worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHIMG + 'worldmap_1920x1080v2.png' },
			{ immat: false, uname: 'burger_off', path: THEMEPATHIMG + 'burger_off.png' },
			{ immat: false, uname: 'burger_on', path: THEMEPATHIMG + 'burger_on.png' },
			{ immat: false, uname: 'thisisnottobeseen', path: THEMEPATHIMG + 'thisisnottobeseen.png' },
		]
		this.loadedImages = []
		// PLAYER
		this.PlayerDatas = {
			deg: -90,
			speed: 5,
			dest: { on: false, x: 0, y: 0 },
			up_player: false,
			down_player: false,
			left_player: false,
			right_player: false,
		}
		// GROUPS
		this.BackgroundGroup
		this.GroundGroup
		this.ItemGroup
		this.BlockGroup
		this.PlayerGroup
		this.UiGroup
		// ALL
		this.all = {
			PhaserPlayer: '',
			Background: '',
			Ground: '',
			UiBurger: ''
		}
	}
	// ______________________________________________________
	// GAMESCENE PRELOADS ______________librarie+__//_______/
	preloadAllImages() {
		// use imagesloaded[] to avoid loading twice the same
		// load player image
		// this.load.image(PLAYERFACTORY.player.uname, PLAYERFACTORY.player['basic'].image)
		// load rooms image
		for (let imageImmat = 0; imageImmat < this.allImages.length; imageImmat++) {

			let CurrentImage = this.allImages[imageImmat]

			if (typeof CurrentImage === 'object' && CurrentImage.uname && CurrentImage.path) {//.isArray
				// set Uniquename
				let imageUname = 'image_' + imageImmat
				// insert Uname to image set
				this.allImages[imageImmat].immat = imageUname
				// ADD IMAGE
				this.load.image(CurrentImage.uname, CurrentImage.path)
			}
		}
	}
	createAll() {
		// console.log(this)
		this.centerX = this.game.config.width / 2
		this.centerY = this.game.config.height / 2

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
	// ADD Background
	addBackground() {
		this.all.Background = this.physics.add.image(0, 0, 'worldmap_1920x1080').setOrigin(0)//.setScale(10)
		// setInteractive && make clickable
		this.all.Background.setInteractive()
		this.BackgroundGroup.add(this.all.Background)
		this.all.Background.on('pointerdown', () => { this.ClickedOn(this.all.Background) }, this)

	}
	ClickedOn = (obj) => {
		var tx = obj.input.localX
		var ty = obj.input.localY

		// if (LOGON) 
		this.PlayerDatas.dest = { on: true, x: tx, y: ty, range: this.all.PhaserPlayer.width }


		this.PlayerDatas.deg = this.get_DegreeWithTwoPos(
			this.all.PhaserPlayer.x,
			this.all.PhaserPlayer.y,
			tx,
			ty
		)
		console.log('d:' + this.PlayerDatas.deg + ' player.x:' + this.all.PhaserPlayer.x + ',y:' + this.all.PhaserPlayer.y, ' click.x:' + parseInt(tx) + ',y:' + parseInt(ty))

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





	}
	// ADD PLAYER
	addPlayer() {
		this.all.PhaserPlayer = this.physics.add.image(1, 1, 'player').setOrigin(0)//.setScale(10)
		this.PlayerGroup.add(this.all.PhaserPlayer)
	}
	// ADD UI
	addUi() {
		this.all.UiBurger = this.add.image(this.game.config.width, 0, 'burger_off').setOrigin(1, 0).setScale(2)
		this.UiGroup.add(this.all.UiBurger)
	}
	// camera follow
	camerafollowplayer() {
		// // cameras.main follow player
		console.log(this.all.PhaserPlayer)
		// console.log()
		this.cameras.main.startFollow(this.all.PhaserPlayer);
	}
	setWorldBoundsByActualRoom() {
		// this.physics.world.setBounds(
		// 	x,
		// 	y,
		// 	width,
		// 	height
		// );
	}
	// ________________________
	// TESTS ______________/__/
	resizeApp = () => {
		GAME.scale.resize(window.innerWidth, window.innerHeight);
	}

	onKeyDown(event) {
		// if (LOGON) console.log(event.keyCode)

		if (this.allkeys.keyUp.indexOf(event.keyCode) > -1) {
			this.all.PhaserPlayer.y -= this.PlayerDatas.speed;
			this.PlayerDatas.up_player = true;
		}
		else if (this.allkeys.keyDown.indexOf(event.keyCode) > -1) {
			this.all.PhaserPlayer.y += this.PlayerDatas.speed;
			this.PlayerDatas.down_player = true;
		}
		else if (this.allkeys.keyLeft.indexOf(event.keyCode) > -1) {
			this.all.PhaserPlayer.x -= this.PlayerDatas.speed;
			this.PlayerDatas.left_player = true;
		}
		else if (this.allkeys.keyRight.indexOf(event.keyCode) > -1) {
			this.all.PhaserPlayer.x += this.PlayerDatas.speed;
			this.PlayerDatas.right_player = true;
		}
	}

}
