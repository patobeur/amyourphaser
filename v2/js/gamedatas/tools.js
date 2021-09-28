class Tools extends Phaser.Scene {
	constructor() {
		super()
		this.BackGroundGroup
		this.GroundGroup
		this.ItemGroup
		this.BlockGroup
		this.PlayerGroup
		this.UiGroup
		//
		this.allImages = [
			{ immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHIMG + 'wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHIMG + 'wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHIMG + 'worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHIMG + 'worldmap_1920x1080v2.png' },
			{ immat: false, uname: 'burger_off', path: THEMEPATHIMG + 'burger_off.png' },
			{ immat: false, uname: 'burger_on', path: THEMEPATHIMG + 'burger_on.png' },
		]
		this.loadedImages = []
		//
		this.centerX
		this.centerY

		// 
		this.PlayerOne
		this.UiBurger
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

		// this.BackGroundGroup = this.add.group()
		// this.GroundGroup = this.add.group()
		// this.ItemGroup = this.add.group()
		// this.BlockGroup = this.add.group()
		this.PlayerGroup = this.add.group()
		this.UiGroup = this.add.group()
		this.addPlayer()
		this.addUi()
	}
	// ADD PLAYER
	addPlayer() {
		this.PlayerOne = this.add.image(this.centerX, this.centerY, 'player')//.setOrigin(1, 1)//.setScale(10)
		this.PlayerGroup.add(this.PlayerOne)
	}
	// ADD UI
	addUi() {
		this.UiBurger = this.add.image(this.game.config.width, 0, 'burger_off').setOrigin(1, 0).setScale(2)
		this.UiGroup.add(this.UiBurger)
	}
	setWorldBoundsByActualRoom() {
		// this.physics.world.setBounds(
		// 	this.allRooms[this.actualRoomImmat].x,
		// 	this.allRooms[this.actualRoomImmat].y,
		// 	this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].width,
		// 	this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].height
		// );
	}
	// ________________________
	// TESTS ______________/__/
	resizeApp() {
		// Width-height-ratio of game resolution
		let game_ratio = 800 / 600;

		// Make div full height of browser and keep the ratio of game resolution
		let div = document.getElementById('amyourphaser');
		div.style.width = (window.innerHeight * game_ratio) + 'px';
		div.style.height = window.innerHeight + 'px';

		// Check if device DPI messes up the width-height-ratio
		let canvas = document.getElementsByTagName('canvas')[0];

		let dpi_w = (parseInt(div.style.width) / canvas.width);
		let dpi_h = (parseInt(div.style.height) / canvas.height);

		let height = window.innerHeight * (dpi_w / dpi_h);
		let width = height * 0.6;

		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
	}

}
