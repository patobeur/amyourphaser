class Tools extends Phaser.Scene {
	constructor() {
		super()
		this.BackGroundGroup
		this.GroundGroup
		this.ItemGroup
		this.BlockGroup
		this.PlayerGroup
		this.PlayerOne
		//
		this.allImages = [
			{ immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			{ immat: false, uname: 'wall_32x64', path: THEMEPATHIMG + 'wall_32x64.png' },
			{ immat: false, uname: 'wall_64x64', path: THEMEPATHIMG + 'wall_64x64.png' },
			{ immat: false, uname: 'worldmap_1920x1080', path: THEMEPATHIMG + 'worldmap_1920x1080.png' },
			{ immat: false, uname: 'worldmap_1920x1080v2', path: THEMEPATHIMG + 'worldmap_1920x1080v2.png' },
		]
		this.loadedImages = []
		//
		this.centerX
		this.centerY
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
		// --
		this.PlayerOne = this.add.image(this.centerX, this.centerY, 'player').setOrigin(0)//.setScale(10)
		// this.PlayerGroup.add(this.PlayerOne)
	}
	// ADD PLAYER
	addplayer() {
		// PLAYERFACTORY.playerPhaser = this.physics.add.image(
		// 	this.allRooms[this.actualRoomImmat].x + this.allRooms[this.actualRoomImmat].startpos.x + (PLAYERFACTORY.player.w / 2),
		// 	this.allRooms[this.actualRoomImmat].y + this.allRooms[this.actualRoomImmat].startpos.y + (PLAYERFACTORY.player.h / 2),
		// 	PLAYERFACTORY.player.uname
		// ).setOrigin(.5, .5).setCollideWorldBounds(true);
	}
	setWorldBoundsByActualRoom() {
		// if (LOGON) console.log('setWorldBoundsByActualRoom(',
		// 	this.allRooms[this.actualRoomImmat].x,
		// 	this.allRooms[this.actualRoomImmat].y,
		// 	this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].width,
		// 	this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].height,
		// 	')'
		// )
		// this.physics.world.setBounds(
		// 	this.allRooms[this.actualRoomImmat].x,
		// 	this.allRooms[this.actualRoomImmat].y,
		// 	this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].width,
		// 	this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].height
		// );
	}
	// ________________________
	// TESTS ______________/__/

}
