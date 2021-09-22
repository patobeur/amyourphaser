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
	}
	// ______________________________________________________
	// SOMES LISTENERS ____________________________//_______/
	onKeyDown(event) {
		if (keys.keyUp.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollY -= this.playerDatas.speed;
			this.myconsole.y -= allPlayer.speed;
			this.playerOne.y -= allPlayer.speed;
		}
		else if (keys.keyDown.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollY += allPlayer.speed;
			this.myconsole.y += allPlayer.speed;
			this.playerOne.y += allPlayer.speed;
		}
		else if (keys.keyLeft.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollX -= allPlayer.speed;
			this.myconsole.x -= allPlayer.speed;
			this.playerOne.x -= allPlayer.speed;
		}
		else if (keys.keyRight.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollX += allPlayer.speed;
			this.myconsole.x += allPlayer.speed;
			this.playerOne.x += allPlayer.speed;
		}
		this.refreshconsole()
	}
	onWheelScroll(event) {
		event.deltaY > 0
			? this.cameras.main.zoom > zooom.min ? this.cameras.main.zoom -= zooom.step : ''
			: this.cameras.main.zoom < zooom.max ? this.cameras.main.zoom += zooom.step : '';
	}
	// ______________________________________________________
	// GAMESCENE PRELOADS _________________________//_______/
	preloadRoomsImages() {
		for (let number = 0; number < this.allRooms.length; number++) {
			this.load.image('room' + number, this.allRooms[number].image)
		}
	}
	preloadPortalsImages() {
		for (let roomImmat = 0; roomImmat < this.allRooms.length; roomImmat++) {
			if (this.allRooms[roomImmat].portals) {
				for (let portalImmat = 0; portalImmat < this.allRooms[roomImmat].portals.length; portalImmat++) {
					this.load.image(
						'portal' + roomImmat + '_' + portalImmat,
						this.allRooms[roomImmat].portals[portalImmat].image
					);
				}
			}
		}
	}
	preloadPlayerImages() {
		this.load.image(allPlayer.objName, allPlayer['basic'].image)
		// next : need some later changes to match sprite object for animations moves
	}
	// _____________________________________________
	// GAMESCENE ADDS _____________________________/
	addRooms() {
		for (let roomImmat = 0; roomImmat < this.allRooms.length; roomImmat++) {
			// ADD TO GAMESCENE
			this['room' + roomImmat] = this.add.image(this.allRooms[roomImmat].x, this.allRooms[roomImmat].y, 'room' + roomImmat).setOrigin(0)

			// add roomImmat to room
			this['room' + roomImmat].roomImmat = roomImmat

			if (roomImmat != this.actualRoomImmat) {
				this['room' + roomImmat].setVisible(false)
			}

		}
	}
	clearActualRoomPortals() {
		if (typeof this.allRooms[this.actualRoomImmat].portals === 'object') {
			if (this.allRooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.allRooms[this.actualRoomImmat].portals.length; portalImmat++) {
					let PortalName = 'portal' + this.actualRoomImmat + '_' + portalImmat
					this[PortalName].destroy()
				}
			}
		}
	}
	addActualRoomPortals() {
		if (typeof this.allRooms[this.actualRoomImmat].portals === 'object') {
			if (this.allRooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.allRooms[this.actualRoomImmat].portals.length; portalImmat++) {
					let PortalName = 'portal' + this.actualRoomImmat + '_' + portalImmat

					// add portal to game in no exist
					// if (typeof this[PortalName] == 'undefined'){
					this[PortalName] = this.physics.add.image(
						this.allRooms[this.actualRoomImmat].portals[portalImmat].x + this.allRooms[this.actualRoomImmat].x,
						this.allRooms[this.actualRoomImmat].portals[portalImmat].y + this.allRooms[this.actualRoomImmat].y,
						PortalName
					).setOrigin(0)

					// adding OVERLAP EVENT TELEPORTATION on IN PORTAL
					if (this.allRooms[this.actualRoomImmat].portals[portalImmat].action == 'in') {
						this.physics.add.overlap(this[PortalName], this.playerOne, () => this.teleportationTo(portalImmat), null, this);
					}

					// }

				}
			}
			this.playerOne.depth = 1000
		}
	}
	addplayer() {
		this.playerOne = this.physics.add.image(
			this.allRooms[this.actualRoomImmat].x + this.allRooms[this.actualRoomImmat].startpos.x + (allPlayer.w / 2),
			this.allRooms[this.actualRoomImmat].y + this.allRooms[this.actualRoomImmat].startpos.y + (allPlayer.h / 2),
			allPlayer.objName
		)
			.setOrigin(.5, .5)
			.setCollideWorldBounds(true);
	}
	// _____________________________________________
	// FUNCTIONS __________________________________/
	setWorldBoundsByActualRoom() {
		this.physics.world.setBounds(
			this.allRooms[this.actualRoomImmat].x,
			this.allRooms[this.actualRoomImmat].y,
			this.allRooms[this.actualRoomImmat].w,
			this.allRooms[this.actualRoomImmat].h
		);
	}
	setRoomVisibility(obj = false, visible = true) {
		if (obj) {
			if (this[obj]) {
				this[obj].setVisible(visible)
			}
		}
	}
	teleportationTo = (portalImmat) => {
		// get target room & target portal immats 
		let targetRoomImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.room
		let targetPortalImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.portal

		// change player pos ?
		this.playerOne.x = this.allRooms[targetRoomImmat].x + this.allRooms[targetRoomImmat].portals[targetPortalImmat].x + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].w / 2);
		this.playerOne.y = this.allRooms[targetRoomImmat].y + this.allRooms[targetRoomImmat].portals[targetPortalImmat].y + (this.allRooms[targetRoomImmat].portals[targetPortalImmat].h / 2);

		// clear ROOM
		this.clearActualRoomPortals()

		// set Visibility of last and new room
		this.setRoomVisibility('room' + this.actualRoomImmat, false)
		this.setRoomVisibility('room' + targetRoomImmat, true)

		this.actualRoomImmat = this.allRooms[this.actualRoomImmat].portals[portalImmat].dest.room

		// refresh worlds bound
		this.setWorldBoundsByActualRoom()

		// add portal in the room
		this.addActualRoomPortals()

		// refresh elements in the room (panda and block testing)
		this.refreshElementsInRoom()

	}
	refreshElementsInRoom() {
		if (typeof this.actualRoomImmat === 'number' && this.actualRoomImmat === 1) {
			console.log('actualRoomImmat;', typeof this.actualRoomImmat, this.actualRoomImmat)
			// testing
			this.setRoomVisibility('panda', true)
			this.setRoomVisibility('block', true)
		}
		else {
			this.setRoomVisibility('panda', false)
			this.setRoomVisibility('block', false)
		}

	}
	roomClickedByImmat = (immat) => {
		var tx = this['room' + immat].input.localX
		var ty = this['room' + immat].input.localY
		console.log('room' + immat + ': ', tx, ty)
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
			'Player X: ' + this.playerOne.x + ' Y: ' + this.playerOne.y +
			'(x:' + (this.playerOne.x - this.allRooms[this.actualRoomImmat].x) +
			',y:' + (this.playerOne.y - this.allRooms[this.actualRoomImmat].y) + ')')
		this.myconsole.x = 1
		this.myconsole.y = 1

	}
	// ________________________
	// TESTS ______________/__/
	loadPandaImage() {
		// testing collider
		this.load.image(allItems['panda'].objName, allItems['panda'].image)
		this.load.image(allBlocks['simple'].objName, allBlocks['simple'].image)
	}
	addBlock() {
		this.block = this.physics.add.image(
			this.allRooms[this.actualRoomImmat].x + 128,
			this.allRooms[this.actualRoomImmat].y,
			allBlocks['simple'].objName
		).setOrigin(0)//.setScale(2)
		// Overlaping action
		this.physics.add.overlap(this.playerOne, this.block, this.collidingPandaOrBlock, null, this);
	}
	addPanda() {
		// testing collider
		this.panda = this.physics.add.image(
			this.allRooms[this.actualRoomImmat].x + 65,
			this.allRooms[this.actualRoomImmat].y + 1,
			allItems['panda'].objName
		).setOrigin(0).setScale(.5)
		// Overlaping action
		this.physics.add.overlap(this.panda, this.playerOne, this.collidingPandaOrBlock, null, this);
	}
	collidingPandaOrBlock() {
		if (this.panda) { this.panda.destroy() }
		if (this.block) { this.block.destroy() }
		// create a new one at random room and pos
		// or not
	}
}
