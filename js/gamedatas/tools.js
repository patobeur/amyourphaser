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

		// this is temporary test
		// i need to decide how to display ui and playerdatas
		this.myconsolestyle = {
			font: "bold 32px quikhand",
			fill: "#fff",
			boundsAlignH: "center",
			boundsAlignV: "middle"
		}

		// datas from gamedatas.js
		this.allRooms = allRooms;
		// this.allzooom = allzooom;
		this.allkeys = allkeys;

		this.A_CurrentLibrarie = {
			console: [],
			rooms: [],
			items: [],
			blocks: [],
			portals: [],
			loadedimages: []
		}

		this.stacksListeNames = ['portals', 'items', 'blocks'];
	}
	// _____________________________________________
	// CURRENT IN-DEV FUNCTIONS ___________________/







	// ______________________________________________________
	// SOMES LISTENERS ____________________________//_______/
	onKeyDown(event) {
		if (!ChatBot.isChatFocused) {
			// if(LOGON) console.log(event.keyCode)
			this.up_player = false;
			this.down_player = false;
			this.left_player = false;
			this.right_player = false;
			if (this.allkeys.keyUp.indexOf(event.keyCode) > -1) {
				// UIFACTORY.myconsole.y -= PLAYERFACTORY.player.speed;
				PLAYERFACTORY.playerPhaser.y -= PLAYERFACTORY.player.speed;
				this.up_player = true;
				this.refreshStatsUI()
				this.refreshConsoleUI()
			}
			else if (this.allkeys.keyDown.indexOf(event.keyCode) > -1) {
				// UIFACTORY.myconsole.y += PLAYERFACTORY.player.speed;
				PLAYERFACTORY.playerPhaser.y += PLAYERFACTORY.player.speed;
				this.down_player = true;
				this.refreshStatsUI()
				this.refreshConsoleUI()
			}
			else if (this.allkeys.keyLeft.indexOf(event.keyCode) > -1) {
				// UIFACTORY.myconsole.x -= PLAYERFACTORY.player.speed;
				PLAYERFACTORY.playerPhaser.x -= PLAYERFACTORY.player.speed;
				this.left_player = true;
				this.refreshStatsUI()
				this.refreshConsoleUI()
			}
			else if (this.allkeys.keyRight.indexOf(event.keyCode) > -1) {
				// UIFACTORY.myconsole.x += PLAYERFACTORY.player.speed;
				PLAYERFACTORY.playerPhaser.x += PLAYERFACTORY.player.speed;
				this.right_player = true;
				this.refreshStatsUI()
				this.refreshConsoleUI()
			}
		}
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
			if (LOGON) console.log('adding to CurrentLibrarie[rooms] : ' + '[' + roomUname + ']')
			this.A_CurrentLibrarie.rooms[roomUname] = this.add.image(
				this.allRooms[roomImmat].x,
				this.allRooms[roomImmat].y,
				roomUname
			).setOrigin(0)

			// add roomImmat to room (for futur use ??)
			this.A_CurrentLibrarie.rooms[roomUname].roomImmat = roomImmat

			// set to invisible if not current room
			// or clickable if current
			if (roomImmat != this.actualRoomImmat) {
				this.A_CurrentLibrarie.rooms[roomUname].setVisible(false)
			}

			// setInteractive && make clickable
			this.A_CurrentLibrarie.rooms[roomUname].setInteractive()
			this.A_CurrentLibrarie.rooms[roomUname].on('pointerdown', () => { this.roomClickedByImmat(roomUname) }, this)
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

						if (LOGON) console.log('(thisroomonly) adding to CurrentLibrarie[portal] : ' + '[' + PortalUName + ']')
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
						if (LOGON) console.log('(thisroomonly) adding to CurrentLibrarie[items] : ' + '[' + ItemUName + ']')
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

					let currentblock = this.allRooms[this.actualRoomImmat].blocks[blocksImmat] // from gamedatas.js
					let blockUname = 'blocks' + this.actualRoomImmat + '_' + blocksImmat
					if (typeof this.A_CurrentLibrarie.blocks[blockUname] == 'undefined') {
						// ADD BLOCK
						if (LOGON) console.log('(thisroomonly) adding to CurrentLibrarie[blocks] : ' + '[' + blockUname + ']')
						this.A_CurrentLibrarie.blocks[blockUname] = this.physics.add.image(
							this.allRooms[this.actualRoomImmat].blocks[blocksImmat].x + this.allRooms[this.actualRoomImmat].x,
							this.allRooms[this.actualRoomImmat].blocks[blocksImmat].y + this.allRooms[this.actualRoomImmat].y,
							this.allRooms[this.actualRoomImmat].blocks[blocksImmat].uname
						)

						if (currentblock.type) {
							switch (currentblock.type) {
								case 'collide':
									//test collision
									this.collide_object(this.A_CurrentLibrarie.blocks[blockUname], PLAYERFACTORY.playerPhaser);
									break;
								case 'beat_off':
									//test objet qui repousse
									this.beat_off(this.A_CurrentLibrarie.blocks[blockUname], PLAYERFACTORY.playerPhaser, 5);
									break;
								case 'game_over':
									//try game over
									this.game_over_collider(this.A_CurrentLibrarie.blocks[blockUname], PLAYERFACTORY.playerPhaser, 'red');
									break;

							}
						}
						// // testing body object
						// if (currentblock && typeof currentblock.body == 'object') {}

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
		console.log(PLAYERFACTORY.playerPhaser)
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
				if (LOGON) console.log('no portal to refresh in the list !')
			}
		}
		else {
			if (LOGON) console.log('no portal list to refresh !')
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
				if (LOGON) console.log('no item to refresh in the list !')
			}
		}
		else {
			if (LOGON) console.log('no item list to refresh !')
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
				if (LOGON) console.log('no block to refresh in the list !')
			}
		}
		else {
			if (LOGON) console.log('no block list to refresh !')
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
					if (LOGON) console.log(portalUName, 'destroyed')
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
						if (LOGON) console.log(itemUName, ' did not existe and cant be destroyed')
					}
					if (LOGON) console.log(itemUName, 'destroyed')
				}
			}
			else {
				if (LOGON) console.log(' Not item to destroy in the list !')
			}
		}
		else {
			if (LOGON) console.log('No list item to destroy !')
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
						if (LOGON) console.log(blockUName, ' did not existe and cant be destroyed')
					}
					if (LOGON) console.log(blockUName, 'destroyed')
				}
			}
			else {
				if (LOGON) console.log(' Not block to destroy in the list !')
			}
		}
		else {
			if (LOGON) console.log('No list block to destroy !')
		}
	}
	// _____________________________________________
	// FUNCTIONS __________________________________/
	teleportationTo = (portalImmat) => {
		console.clear()

		// get target room & target portal immats 
		let targetRoomImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.room
		let targetPortalImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.portal

		// change player pos ?
		PLAYERFACTORY.playerPhaser.y = this.allRooms[targetRoomImmat].y + this.allRooms[targetRoomImmat].portals[targetPortalImmat].y + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].h / 2);
		PLAYERFACTORY.playerPhaser.x = this.allRooms[targetRoomImmat].x + this.allRooms[targetRoomImmat].portals[targetPortalImmat].x + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].w / 2);

		// clear ROOM portals
		this.clearActualRoomPortals()
		this.clearActualRoomItems()
		this.clearActualRoomBlocks()

		// set Visibility of last and new room
		this.setRoomVisibility('rooms', 'rooms' + this.actualRoomImmat, false)
		this.setRoomVisibility('rooms', 'rooms' + targetRoomImmat, true)

		// NEW ROUND SET NEW actualRoomImmat IMMAT
		this.actualRoomImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.room

		// refresh worlds bound
		this.setWorldBoundsByActualRoom()

		// refresh stacks
		this.refreshActualRoomPortals()
		this.refreshActualRoomItems()
		this.refreshActualRoomBlocks()

		if (LOGON) console.log('Room:', this.actualRoomImmat, 'is smelling clean !')
		if (LOGON) console.log('CurrentRoom', allRooms[this.actualRoomImmat])
		if (LOGON) console.log('A_CurrentLibrarie', this.A_CurrentLibrarie)
		this.refreshStatsUI()
	}
	setWorldBoundsByActualRoom() {
		if (LOGON) console.log('setWorldBoundsByActualRoom(',
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
				if (LOGON) console.log('setRoomVisibility :(' + objname + ') Visible=' + (visible ? true : 'false') + ' - type=' + (type ?? 'false'))
				this.A_CurrentLibrarie[type][objname].setVisible(visible)
			}
		}
	}
	roomClickedByImmat = (roomUname) => {
		var tx = this.A_CurrentLibrarie.rooms[roomUname].input.localX
		var ty = this.A_CurrentLibrarie.rooms[roomUname].input.localY
		// if (LOGON) 
		PLAYERFACTORY.player.clickedDest = {
			x: tx,
			y: ty
		}
		console.log(roomUname + ' click: ', tx, ty)
		// console.log(PLAYERFACTORY.player)
	}
	toDegrees(angle) {
		return angle * (180 / Math.PI)
	}
	// ______________________________________________________
	// TEMPORARY CONSOLE DEV ___________________________//__/
	addConsoleUI() {
		// this.A_CurrentLibrarie['console']['myconsole'] = UIFACTORY.UIaddconsole(this)
		UIFACTORY.UIaddConsole(PLAYERFACTORY.player, PLAYERFACTORY.playerPhaser, this)
	}
	addStatsUI() {
		UIFACTORY.UIaddStats(PLAYERFACTORY.player, PLAYERFACTORY.playerPhaser, this)
	}
	refreshConsoleUI() {
		UIFACTORY.UIrefreshConsole(PLAYERFACTORY.player, PLAYERFACTORY.playerPhaser, this)
	}
	refreshStatsUI() {
		UIFACTORY.UIrefreshStats(PLAYERFACTORY.player, PLAYERFACTORY.playerPhaser, this)
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

	// ERKAGOON
	collide_object(object1, player) {
		this.physics.add.collider(
			object1,
			player,
			() => {
				if (this.up_player) {
					//here on stop le player dans la direction du haut
					PLAYERFACTORY.playerPhaser.y -= -5;
				}
				if (this.down_player) {
					//here on stop le player dans la direction du bas
					PLAYERFACTORY.playerPhaser.y += -5;
				}
				if (this.left_player) {
					//here on stop le player dans la direction de gauche
					PLAYERFACTORY.playerPhaser.x -= -5;
				}
				if (this.right_player) {
					//here on stop le player dans la direction de droite
					PLAYERFACTORY.playerPhaser.x += -5;
				}
			}
		);
	}
	beat_off(object1, player, beatOff) {
		this.physics.add.collider(
			object1,
			player,
			() => {
				if (this.up_player) {
					//here on stop le player dans la direction du haut
					this.tweens.timeline({
						targets: PLAYERFACTORY.playerPhaser,
						loop: 1,
						tweens: [
							{
								y: PLAYERFACTORY.playerPhaser.y + beatOff,
								duration: 25
							}
						]
					});
				}
				if (this.down_player) {
					//here on stop le player dans la direction du bas
					this.tweens.timeline({
						targets: PLAYERFACTORY.playerPhaser,
						loop: 1,
						tweens: [
							{
								y: PLAYERFACTORY.playerPhaser.y - beatOff,
								duration: 25
							}
						]
					});
				}
				if (this.left_player) {
					//here on stop le player dans la direction de gauche
					this.tweens.timeline({
						targets: PLAYERFACTORY.playerPhaser,
						loop: 1,
						tweens: [
							{
								x: PLAYERFACTORY.playerPhaser.x + beatOff,
								duration: 25
							}
						]
					});
				}
				if (this.right_player) {
					//here on stop le player dans la direction de droite
					this.tweens.timeline({
						targets: PLAYERFACTORY.playerPhaser,
						loop: 1,
						tweens: [
							{
								x: PLAYERFACTORY.playerPhaser.x - beatOff,
								duration: 25
							}
						]
					});
				}
			}
		);
	}
	game_over_collider(object1, player, colorText) {
		this.physics.add.collider(
			object1,
			player,
			() => {
				this.beat_off(object1, player, 1);
				PLAYERFACTORY.player.speed = 0;
				this.add.text(PLAYERFACTORY.playerPhaser.x - 250, PLAYERFACTORY.playerPhaser.y - 50, 'GAME OVER', { font: "72px Arial Black", fill: colorText });
				setTimeout(function () { location.reload(); }, 3000);
			}
		);
	}
}
