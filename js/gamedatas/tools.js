class Tools extends Phaser.Scene {
	constructor() {
		super()

		this.actualRoomImmat = 1 // (immat is like id)
		// this.centerX = GAME.config.width / 2
		// this.centerY = GAME.config.height / 2
		this.ObjectsBounds = {
			world: { w: 256, h: 256 },
			// camera: { w: 256, h: 256 }
		}
		this.myconsolestyle = {
			font: "bold 32px quikhand",
			fill: "#fff",
			boundsAlignH: "center",
			boundsAlignV: "middle"
		}
		this.allRooms = allRooms;
		this.A_CurrentLibrarie = {
			rooms: [],
			items: [],
			blocks: [],
			portals: [],
			loadedimages: []
		}

		this.stacksListeNames = ['portals', 'items', 'blocks']
	}
	// _____________________________________________
	// CURRENT IN-DEV FUNCTIONS ___________________/
	teleportationTo = (portalImmat) => {
		console.clear()
		// get target room & target portal immats 
		let targetRoomImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.room
		let targetPortalImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.portal

		// change player pos ?

		PLAYERFACTORY.playerPhaser.y = this.allRooms[targetRoomImmat].y + this.allRooms[targetRoomImmat].portals[targetPortalImmat].y + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].h / 2);
		PLAYERFACTORY.playerPhaser.x = this.allRooms[targetRoomImmat].x + this.allRooms[targetRoomImmat].portals[targetPortalImmat].x + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].w / 2);
		// this.playerOne.x = this.allRooms[targetRoomImmat].x + this.allRooms[targetRoomImmat].portals[targetPortalImmat].x + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].w / 2);
		// this.playerOne.y = this.allRooms[targetRoomImmat].y + this.allRooms[targetRoomImmat].portals[targetPortalImmat].y + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].h / 2);

		// clear ROOM portals
		this.clearActualRoomPortals()
		this.clearActualRoomItems()
		this.clearActualRoomBlocks()

		// set Visibility of last and new room
		this.setRoomVisibility('rooms', 'rooms' + this.actualRoomImmat, false)
		this.setRoomVisibility('rooms', 'rooms' + targetRoomImmat, true)

		// console.log('All datas was [erased/destroyed] by teleportation !!!!')
		// console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')


		// NEW ROUND 
		// SET NEW actualRoomImmat IMMAT
		this.actualRoomImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.room

		// refresh worlds bound
		this.setWorldBoundsByActualRoom()
		// refresh 
		this.refreshActualRoomPortals()
		this.refreshActualRoomItems()
		this.refreshActualRoomBlocks()

		console.log('Room:', this.actualRoomImmat, 'is smelling clean !')
		console.log('CurrentRoom', allRooms[this.actualRoomImmat])
		console.log('A_CurrentLibrarie', this.A_CurrentLibrarie)

	}
	// ______________________________________________________
	// SOMES LISTENERS ____________________________//_______/
	onKeyDown(event) {
		// console.log(event.keyCode)
		if (allkeys.keyUp.indexOf(event.keyCode) > -1) {
			this.myconsole.y -= allPlayer.speed;
			// this.playerOne.y -= allPlayer.speed;
			PLAYERFACTORY.playerPhaser.y -= allPlayer.speed;

		}
		else if (allkeys.keyDown.indexOf(event.keyCode) > -1) {
			this.myconsole.y += allPlayer.speed;
			// this.playerOne.y += allPlayer.speed;
			PLAYERFACTORY.playerPhaser.y += allPlayer.speed;
		}
		else if (allkeys.keyLeft.indexOf(event.keyCode) > -1) {
			this.myconsole.x -= allPlayer.speed;
			// this.playerOne.x -= allPlayer.speed;
			PLAYERFACTORY.playerPhaser.x -= allPlayer.speed;
		}
		else if (allkeys.keyRight.indexOf(event.keyCode) > -1) {
			this.myconsole.x += allPlayer.speed;
			// this.playerOne.x += allPlayer.speed;
			PLAYERFACTORY.playerPhaser.x += allPlayer.speed;
		}
		this.refreshconsole()
	}
	onWheelScroll(event) {
		event.deltaY > 0
			? this.cameras.main.zoom > configDefault.zooom.min ? this.cameras.main.zoom -= configDefault.zooom.step : ''
			: this.cameras.main.zoom < configDefault.zooom.max ? this.cameras.main.zoom += configDefault.zooom.step : '';
	}
	// ______________________________________________________
	// GAMESCENE PRELOADS ______________librarie+__//_______/
	preloadAllRoomsImages() {
		// use imagesloaded[] to avoid loading twice the same
		// load player image
		this.load.image(PLAYERFACTORY.player.uname, PLAYERFACTORY.player['basic'].image)
		// load rooms image
		for (let roomImmat = 0; roomImmat < this.allRooms.length; roomImmat++) {

			let CurrentRoom = this.allRooms[roomImmat]
			if (typeof CurrentRoom === 'object') {//.isArray

				// ADD ROOM IMAGE
				let RoomName = 'rooms' + roomImmat
				if (!this.A_CurrentLibrarie.loadedimages[RoomName]) {
					this.A_CurrentLibrarie.loadedimages[RoomName] = this.load.image(RoomName, CurrentRoom.image)
				}
				// ADD all others images by stack
				for (let stacksnum = 0; stacksnum < this.stacksListeNames.length; stacksnum++) {
					// CurrentStack is the new stack name to load
					let CurrentStack = this.stacksListeNames[stacksnum]
					if (typeof CurrentRoom[CurrentStack] === 'object') { // .isArray()
						if (CurrentRoom[CurrentStack].length > 0) {
							for (let immat = 0; immat < CurrentRoom[CurrentStack].length; immat++) {
								let imagename = CurrentRoom[CurrentStack][immat].uname
								if (!this.A_CurrentLibrarie.loadedimages[imagename]) {
									// ADD THIS IMAGE
									this.A_CurrentLibrarie.loadedimages[imagename] = this.load.image(
										imagename,
										ITEMFACTORY.get_itemFromShop(CurrentStack, imagename).image
									);
								}

							}
						}
					}
				}
			}
		}
	}
	// _____________________________________________
	// GAMESCENE ADDS Rooms ____________librarie+_./
	addRooms() {
		for (let roomImmat = 0; roomImmat < this.allRooms.length; roomImmat++) {
			// ADD TO GAMESCENE
			let roomUname = 'rooms' + roomImmat
			console.log('adding to CurrentLibrarie[rooms] : ' + '[' + roomUname + ']')
			this.A_CurrentLibrarie.rooms[roomUname] = this.add.image(
				this.allRooms[roomImmat].x,
				this.allRooms[roomImmat].y,
				roomUname
			).setOrigin(0)

			// add roomImmat to room (for futur use ??)
			this.A_CurrentLibrarie.rooms[roomUname].roomImmat = roomImmat

			// set to invisible if not current room
			if (roomImmat != this.actualRoomImmat) {
				this.A_CurrentLibrarie.rooms[roomUname].setVisible(false)
			}
		}
	}
	// GAMESCENE ADDS Stuff byRoom _____librarie+__/
	addActualRoomPortals() {
		if (typeof this.allRooms[this.actualRoomImmat].portals === 'object') {
			if (this.allRooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.allRooms[this.actualRoomImmat].portals.length; portalImmat++) {

					// add portal to game in no exist
					let PortalUName = 'portals' + this.actualRoomImmat + '_' + portalImmat
					if (typeof this.A_CurrentLibrarie.portals[PortalUName] == 'undefined') {

						console.log('(thisroomonly) adding to CurrentLibrarie[portal] : ' + '[' + PortalUName + ']')
						this.A_CurrentLibrarie.portals[PortalUName] = this.physics.add.image(
							this.allRooms[this.actualRoomImmat].portals[portalImmat].x + this.allRooms[this.actualRoomImmat].x,
							this.allRooms[this.actualRoomImmat].portals[portalImmat].y + this.allRooms[this.actualRoomImmat].y,
							this.allRooms[this.actualRoomImmat].portals[portalImmat].uname
						).setOrigin(0)

						// adding OVERLAP EVENT TELEPORTATION on IN PORTAL
						if (this.allRooms[this.actualRoomImmat].portals[portalImmat].action == 'in') {
							// if (typeof this.allRooms[this.actualRoomImmat].portals[portalImmat].dest == 'object') {
							this.physics.add.overlap(
								this.A_CurrentLibrarie.portals[PortalUName],
								PLAYERFACTORY.playerPhaser,
								() => this.teleportationTo(portalImmat), null, this);
							// }
						}

					}

				}
			}
			PLAYERFACTORY.playerPhaser.depth = 1000
		}
	}
	addActualRoomItems() {
		if (typeof this.allRooms[this.actualRoomImmat].items === 'object') {
			if (this.allRooms[this.actualRoomImmat].items.length > 0) {
				// items
				for (let itemImmat = 0; itemImmat < this.allRooms[this.actualRoomImmat].items.length; itemImmat++) {

					let ItemUName = 'items' + this.actualRoomImmat + '_' + itemImmat
					if (typeof this.A_CurrentLibrarie.items[ItemUName] == 'undefined') {
						console.log('(thisroomonly) adding to CurrentLibrarie[items] : ' + '[' + ItemUName + ']')
						this.A_CurrentLibrarie.items[ItemUName] = this.physics.add.image(
							this.allRooms[this.actualRoomImmat].items[itemImmat].x + this.allRooms[this.actualRoomImmat].x,
							this.allRooms[this.actualRoomImmat].items[itemImmat].y + this.allRooms[this.actualRoomImmat].y,
							this.allRooms[this.actualRoomImmat].items[itemImmat].uname
						)
					}
				}
			}
		}
	}
	addActualRoomBlocks() {
		if (typeof this.allRooms[this.actualRoomImmat].blocks === 'object') {
			if (this.allRooms[this.actualRoomImmat].blocks.length > 0) {
				for (let blocksImmat = 0; blocksImmat < this.allRooms[this.actualRoomImmat].blocks.length; blocksImmat++) {
					let BlockUName = 'blocks' + this.actualRoomImmat + '_' + blocksImmat
					if (typeof this.A_CurrentLibrarie.blocks[BlockUName] == 'undefined') {
						console.log('(thisroomonly) adding to CurrentLibrarie[blocks] : ' + '[' + BlockUName + ']')
						this.A_CurrentLibrarie.blocks[BlockUName] = this.physics.add.image(
							this.allRooms[this.actualRoomImmat].blocks[blocksImmat].x + this.allRooms[this.actualRoomImmat].x,
							this.allRooms[this.actualRoomImmat].blocks[blocksImmat].y + this.allRooms[this.actualRoomImmat].y,
							this.allRooms[this.actualRoomImmat].blocks[blocksImmat].uname
						)
					}
				}
			}
		}
	}
	// GAMESCENE ADDS Stuff byRoom _______________/
	// ADD PLAYER
	addplayer() {
		PLAYERFACTORY.playerPhaser = this.physics.add.image(
			this.allRooms[this.actualRoomImmat].x + this.allRooms[this.actualRoomImmat].startpos.x + (PLAYERFACTORY.player.w / 2),
			this.allRooms[this.actualRoomImmat].y + this.allRooms[this.actualRoomImmat].startpos.y + (PLAYERFACTORY.player.h / 2),
			PLAYERFACTORY.player.uname
		).setOrigin(.5, .5).setCollideWorldBounds(true);
	}
	// _____________________________________________
	// GAMESCENE REFRESH Stuff byRoom __librarie=__/
	refreshActualRoomPortals() {
		// check gamadate.js allRooms maps
		if (this.allRooms[this.actualRoomImmat].portals) {
			if (this.allRooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.allRooms[this.actualRoomImmat].portals.length; portalImmat++) {

					// set portal UniqueName Portal destination
					let PortalUName = 'portals' + this.actualRoomImmat + '_' + portalImmat
					// Refresh Portal
					this.A_CurrentLibrarie.portals[PortalUName] = this.physics.add.image(
						this.allRooms[this.actualRoomImmat].portals[portalImmat].x + this.allRooms[this.actualRoomImmat].x,
						this.allRooms[this.actualRoomImmat].portals[portalImmat].y + this.allRooms[this.actualRoomImmat].y,
						this.allRooms[this.actualRoomImmat].portals[portalImmat].uname
					).setOrigin(0)
					// adding OVERLAP EVENT TELEPORTATION on IN PORTAL
					// if dest portal exist and destdata is object
					if (this.allRooms[this.actualRoomImmat].portals[portalImmat].action == 'in' &&
						this.A_CurrentLibrarie.portals[PortalUName] &&
						typeof this.allRooms[this.actualRoomImmat].portals[portalImmat].dest == 'object'
					) {
						this.physics.add.overlap(
							this.A_CurrentLibrarie.portals[PortalUName],
							PLAYERFACTORY.playerPhaser,
							() => this.teleportationTo(portalImmat),
							null, this
						);
					}

				}
				PLAYERFACTORY.playerPhaser.depth = 1000
			}
			else {
				console.log('no portal to refresh in the list !')
			}
		}
		else {
			console.log('no portal list to refresh !')
		}
	}
	refreshActualRoomItems() {
		// check gamadate.js allRooms maps
		if (this.allRooms[this.actualRoomImmat].items) {
			if (this.allRooms[this.actualRoomImmat].items.length > 0) {
				for (let itemImmat = 0; itemImmat < this.allRooms[this.actualRoomImmat].items.length; itemImmat++) {

					// set item UniqueName ITEM destination
					let itemUName = 'items' + this.actualRoomImmat + '_' + itemImmat
					// Refresh ITEM
					this.A_CurrentLibrarie.items[itemUName] = this.physics.add.image(
						this.allRooms[this.actualRoomImmat].items[itemImmat].x + this.allRooms[this.actualRoomImmat].x,
						this.allRooms[this.actualRoomImmat].items[itemImmat].y + this.allRooms[this.actualRoomImmat].y,
						this.allRooms[this.actualRoomImmat].items[itemImmat].uname
					).setOrigin(0)
				}
				PLAYERFACTORY.playerPhaser.depth = 1000
			}
			else {
				console.log('no item to refresh in the list !')
			}
		}
		else {
			console.log('no item list to refresh !')
		}
	}
	refreshActualRoomBlocks() {
		// check gamadate.js allRooms maps
		if (this.allRooms[this.actualRoomImmat].blocks) {
			if (this.allRooms[this.actualRoomImmat].blocks.length > 0) {
				for (let blockImmat = 0; blockImmat < this.allRooms[this.actualRoomImmat].blocks.length; blockImmat++) {

					// set block UniqueName ITEM destination
					let blockUName = 'blocks' + this.actualRoomImmat + '_' + blockImmat
					// Refresh ITEM
					this.A_CurrentLibrarie.blocks[blockUName] = this.physics.add.image(
						this.allRooms[this.actualRoomImmat].blocks[blockImmat].x + this.allRooms[this.actualRoomImmat].x,
						this.allRooms[this.actualRoomImmat].blocks[blockImmat].y + this.allRooms[this.actualRoomImmat].y,
						this.allRooms[this.actualRoomImmat].blocks[blockImmat].uname
					).setOrigin(0)
				}
				PLAYERFACTORY.playerPhaser.depth = 1000
			}
			else {
				console.log('no block to refresh in the list !')
			}
		}
		else {
			console.log('no block list to refresh !')
		}
	}
	// _____________________________________________
	// GAMESCENE CLEAR Stuff byRoom ____librarie-__/
	clearActualRoomPortals() {
		if (typeof this.allRooms[this.actualRoomImmat].portals === 'object') {
			if (this.allRooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.allRooms[this.actualRoomImmat].portals.length; portalImmat++) {
					let portalUName = 'portals' + this.actualRoomImmat + '_' + portalImmat
					this.A_CurrentLibrarie.portals[portalUName].destroy()
					console.log(portalUName, 'destroyed')
				}
			}
		}
	}
	clearActualRoomItems() {
		if (typeof this.allRooms[this.actualRoomImmat].items === 'object') {
			if (this.allRooms[this.actualRoomImmat].items.length > 0) {
				for (let itemImmat = 0; itemImmat < this.allRooms[this.actualRoomImmat].items.length; itemImmat++) {
					let itemUName = 'items' + this.actualRoomImmat + '_' + itemImmat
					if (this.A_CurrentLibrarie.items[itemUName]) {
						this.A_CurrentLibrarie.items[itemUName].destroy()
					}
					else {
						console.log(itemUName, ' did not existe and cant be destroyed')
					}
					console.log(itemUName, 'destroyed')
				}
			}
			else {
				console.log(' Not item to destroy in the list !')
			}
		}
		else {
			console.log('No list item to destroy !')
		}
	}
	clearActualRoomBlocks() {
		if (typeof this.allRooms[this.actualRoomImmat].blocks === 'object') {
			if (this.allRooms[this.actualRoomImmat].blocks.length > 0) {
				for (let blockImmat = 0; blockImmat < this.allRooms[this.actualRoomImmat].blocks.length; blockImmat++) {
					let blockUName = 'blocks' + this.actualRoomImmat + '_' + blockImmat
					if (this.A_CurrentLibrarie.blocks[blockUName]) {
						this.A_CurrentLibrarie.blocks[blockUName].destroy()
					}
					else {
						console.log(blockUName, ' did not existe and cant be destroyed')
					}
					console.log(blockUName, 'destroyed')
				}
			}
			else {
				console.log(' Not block to destroy in the list !')
			}
		}
		else {
			console.log('No list block to destroy !')
		}
	}
	// _____________________________________________
	// FUNCTIONS __________________________________/
	setWorldBoundsByActualRoom() {
		console.log('setWorldBoundsByActualRoom(',
			this.allRooms[this.actualRoomImmat].x,
			this.allRooms[this.actualRoomImmat].y,
			this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].width,
			this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].height,
			')'
		)

		this.physics.world.setBounds(
			this.allRooms[this.actualRoomImmat].x,
			this.allRooms[this.actualRoomImmat].y,
			this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].width,
			this.A_CurrentLibrarie['rooms']['rooms' + this.actualRoomImmat].height
		);

	}
	setRoomVisibility(type = false, objname = false, visible = true) {
		if (objname) {
			if (this.A_CurrentLibrarie[type][objname]) {
				console.log('setRoomVisibility :(' + objname + ') Visible=' + (visible ? true : 'false') + ' - type=' + (type ?? 'false'))
				this.A_CurrentLibrarie[type][objname].setVisible(visible)
			}
		}
	}
	roomClickedByImmat = (immat) => {
		var tx = this['rooms' + immat].input.localX
		var ty = this['rooms' + immat].input.localY
		console.log('rooms' + immat + ': ', tx, ty)
	}
	toDegrees(angle) {
		return angle * (180 / Math.PI)
	}
	// ______________________________________________________
	// TEMPORARY DEV CONSOLE ___________________________//__/
	addconsole() {
		this.myconsole = this.add.text(1, 1, '', this.myconsolestyle)
		this.myconsole.stroke = "#de77ae";
		this.myconsole.strokeThickness = 16;
		this.myconsole.setShadow(2, 2, "#333333", 2, true, false);
	}
	refreshconsole() {
		this.myconsole.setText(
			'Player X: ' + PLAYERFACTORY.playerPhaser.x + ' Y: ' + PLAYERFACTORY.playerPhaser.y +
			'(x:' + (PLAYERFACTORY.playerPhaser.x - this.allRooms[this.actualRoomImmat].x) +
			',y:' + (PLAYERFACTORY.playerPhaser.y - this.allRooms[this.actualRoomImmat].y) + ')')
		this.myconsole.x = 1
		this.myconsole.y = 1
	}
	// ________________________
	// TESTS ______________/__/
	loadPandaImagetest() {
		// testing collider
		this.load.image(ITEMFACTORY.get_itemFromShop('items', 'pandabagsmall').uname, ITEMFACTORY.get_itemFromShop('items', 'pandabagsmall').image)
		this.load.image(ITEMFACTORY.get_itemFromShop('blocks', 'blocksimple').uname, ITEMFACTORY.get_itemFromShop('blocks', 'blocksimple').image)
	}
	addBlocktest() {
		this.block = this.physics.add.image(
			this.allRooms[this.actualRoomImmat].x + 128,
			this.allRooms[this.actualRoomImmat].y,
			ITEMFACTORY.get_itemFromShop('blocks', 'blocksimple').uname
		).setOrigin(0)//.setScale(2)
		// add Overlaping action
		this.physics.add.overlap(PLAYERFACTORY.playerPhaser, this.block, this.collidingPandaOrBlock, null, this);
		this.physics.add.overlap(PLAYERFACTORY.playerPhaser, this.block, this.collidingPandaOrBlock, null, this);
	}
	addPandatest() {
		// testing collider
		this.panda = this.physics.add.image(
			this.allRooms[this.actualRoomImmat].x + 65,
			this.allRooms[this.actualRoomImmat].y + 1,
			ITEMFACTORY.get_itemFromShop('items', 'pandabagsmall').uname
		).setOrigin(0).setScale(.5)
		// add Overlaping action
		this.physics.add.overlap(this.panda, PLAYERFACTORY.playerPhaser, this.collidingPandaOrBlock, null, this);
	}
	collidingPandaOrBlock() {
		if (this.panda) { this.panda.destroy() }
		if (this.block) { this.block.destroy() }
	}
}
