class Tools extends Phaser.Scene {
	constructor() {
		super()
		
		this.panda
		this.actualRoomImmat = 1
		this.zoOom = {
			step: .1,
			max: 3,
			min: .5
		}
		// this.centerX = GAME.config.width / 2
		// this.centerY = GAME.config.height / 2
		this.keys = {
			keyUp: [90, 38], // 'z', arrowUp
			keyDown: [83, 40], // 's', arrowDown
			keyLeft: [81, 37], // 'q', arrowLeft
			keyRight: [68, 39], // 'd', arrowRight
			keySpace: [32], // space
			keyEnter: [13], // enter
			keyEscape: [27], // escape
			keyTilde: [222], // ² tilde/square
			keyPlus: [107], // +
			keyMinus: [109], // -
			keyShift: [13], // shift
		}
		this.ObjectsBounds = {
			world: { w: 777, h: 512 },
			camera: { w: 777, h: 512, ww: window.innerWidth, wh: window.innerHeight }
		}
		this.myconsolestyle = {
			font: "bold 32px quikhand",
			fill: "#fff",
			boundsAlignH: "center",
			boundsAlignV: "middle"
		}
		this.Rooms = [
			{
				x: 1, y: 1, w: 256, h: 256, image: 'assets/floor_256-0.png'
			},
			{
				x: 257, y: 256, w: 256, h: 256, image: 'assets/floor_256-1.png', startpos: { x: 124, y: 124 },
				portals: [
					{ action: 'out', x: 1, y: 1, w: 64, h: 64, image: 'assets/p_out.png', norigin: { x: 0.5, y: 0.5 } },
					{ action: 'in', x: 192, y: 192, w: 64, h: 64, image: 'assets/p_in.png', norigin: { x: 0.5, y: 0.5 }, dest: { room: 2, portal: 0 } },
				]
			},
			{
				x: 513, y: 1, w: 256, h: 256, image: 'assets/floor_256-2.png',
				portals: [
					{ action: 'out', x: 1, y: 1, w: 64, h: 64, image: 'assets/p_out.png', norigin: { x: 0.5, y: 0.5 } },
					{ action: 'in', x: 192, y: 192, w: 64, h: 64, image: 'assets/p_in.png', norigin: { x: 0.5, y: 0.5 }, dest: { room: 1, portal: 0 } },
				]
			},
		];
		this.playerDatas = {
			objname: 'playerOne',
			startPos: {},
			media: { x: 1, y: 1 },
			picture: 'assets/playerface.png',
			w: 20,
			h: 31,
			speed: 5
		}
	}
	// ______________________________________________________
	// SOMES LISTENERS ____________________________//_______/
	onKeyDown(event) {
		if (this.keys.keyUp.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollY -= this.playerDatas.speed;
			this.myconsole.y -= this.playerDatas.speed;
			this.playerOne.y -= this.playerDatas.speed;
		}
		else if (this.keys.keyDown.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollY += this.playerDatas.speed;
			this.myconsole.y += this.playerDatas.speed;
			this.playerOne.y += this.playerDatas.speed;
		}
		else if (this.keys.keyLeft.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollX -= this.playerDatas.speed;
			this.myconsole.x -= this.playerDatas.speed;
			this.playerOne.x -= this.playerDatas.speed;
		}
		else if (this.keys.keyRight.indexOf(event.keyCode) > -1) {
			// this.cameras.main.scrollX += this.playerDatas.speed;
			this.myconsole.x += this.playerDatas.speed;
			this.playerOne.x += this.playerDatas.speed;
		}
		this.refreshconsole()
	}
	onWheelScroll(event) {
		event.deltaY > 0
			? this.cameras.main.zoom > this.zoOom.min ? this.cameras.main.zoom -= this.zoOom.step : ''
			: this.cameras.main.zoom < this.zoOom.max ? this.cameras.main.zoom += this.zoOom.step : '';
	}
	// ______________________________________________________
	// GAMESCENE PRELOADS _________________________//_______/
	preloadRoomsImages() {
		for (let number = 0; number < this.Rooms.length; number++) {
			this.load.image('room' + number, this.Rooms[number].image)
		}
	}
	preloadPortalsImages() {
		for (let roomImmat = 0; roomImmat < this.Rooms.length; roomImmat++) {
			if (this.Rooms[roomImmat].portals) {
				for (let portalImmat = 0; portalImmat < this.Rooms[roomImmat].portals.length; portalImmat++) {
					this.load.image(
						'portal' + roomImmat + '_' + portalImmat,
						this.Rooms[roomImmat].portals[portalImmat].image
					);
				}
			}
		}
	}
	preloadPlayerImages() {
		this.load.image(this.playerDatas.objname, this.playerDatas.picture)
		// next : need some later changes to match sprite object for animations moves
	}
	// _____________________________________________
	// GAMESCENE ADDS _____________________________/
	addRooms() {
		for (let roomImmat = 0; roomImmat < this.Rooms.length; roomImmat++) {
			// ADD TO GAMESCENE
			this['room' + roomImmat] = this.add.image(this.Rooms[roomImmat].x, this.Rooms[roomImmat].y, 'room' + roomImmat).setOrigin(0)
			// add roomImmat/id to roomè
			this['room' + roomImmat].roomImmat = roomImmat

			// // only room where playerOne is
			// if (roomImmat === this.actualRoomImmat) {
			// 	this['room' + roomImmat].setInteractive()
			// 	this['room' + roomImmat].on('pointerdown', () => { this.roomClickedByImmat(roomImmat) }, this)
			// 	// if portals exists
			// 	if (typeof this.Rooms[roomImmat].portals === 'object') {
			// 		this.addPortalsByRoomImmat(roomImmat, { only: 'all' })
			// 	}
			// }
			// else {
			// 	// only room where playerOne is NOT and portals exists
			// 	if (typeof this.Rooms[roomImmat].portals === 'object') {
			// 		this.addPortalsByRoomImmat(roomImmat, { only: 'out' })
			// 	}
			// }
		}
	}
	clearActualRoomPortals() {
		if (typeof this.Rooms[this.actualRoomImmat].portals === 'object') {
			if (this.Rooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.Rooms[this.actualRoomImmat].portals.length; portalImmat++)
				{
					let PortalName = 'portal' + this.actualRoomImmat + '_' + portalImmat
					this[PortalName].destroy()
				}
			}
		}
	}
	addActualRoomPortals() {
		if (typeof this.Rooms[this.actualRoomImmat].portals === 'object') {
			if (this.Rooms[this.actualRoomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.Rooms[this.actualRoomImmat].portals.length; portalImmat++)
				{
					let PortalName = 'portal' + this.actualRoomImmat + '_' + portalImmat

					// add portal to game in no exist
					// if (typeof this[PortalName] == 'undefined'){
						this[PortalName] = this.physics.add.image(
							this.Rooms[this.actualRoomImmat].portals[portalImmat].x + this.Rooms[this.actualRoomImmat].x,
							this.Rooms[this.actualRoomImmat].portals[portalImmat].y + this.Rooms[this.actualRoomImmat].y,
							PortalName
						).setOrigin(0)

						// adding OVERLAP EVENT TELEPORTATION on IN PORTAL
						if (this.Rooms[this.actualRoomImmat].portals[portalImmat].action == 'in') {
							this.physics.add.overlap(this[PortalName], this.playerOne, () => this.teleportationTo(portalImmat), null, this);
						}

					// }

				}
			}
			this.playerOne.depth = 1000
		}
	}
	addPortalsByRoomImmat(roomImmat, rules = false) {
		if (typeof this.Rooms[roomImmat].portals === 'object') {
			if (this.Rooms[roomImmat].portals.length > 0) {
				for (let portalImmat = 0; portalImmat < this.Rooms[roomImmat].portals.length; portalImmat++) {
					let addthisone = false
					if (rules === false) {
						addthisone = true
					}
					else {
						if (rules.only && rules.only === 'all') {
							addthisone = true
						}
						else if (rules.only && rules.only === 'in' && this.Rooms[roomImmat].portals[portalImmat].action === 'in') {
							addthisone = true
						}
						else if (rules.only && rules.only === 'out' && this.Rooms[roomImmat].portals[portalImmat].action === 'out') {
							addthisone = true
						}
					}
					if (addthisone === true) {
						let PortalName = 'portal' + roomImmat + '_' + portalImmat
						// add portal to game
						this['portal' + roomImmat + '_' + portalImmat] = this.physics.add.image(
							this.Rooms[roomImmat].portals[portalImmat].x + this.Rooms[roomImmat].x,
							this.Rooms[roomImmat].portals[portalImmat].y + this.Rooms[roomImmat].y,
							PortalName
						).setOrigin(0)

						// ADD COLLIDER TO PORTAL WITH TELEPORTATION

						if (this.Rooms[roomImmat].portals[portalImmat].action == 'in') {

							console.log('adding collider portal[room' + roomImmat + 'portal:' + portalImmat + '] action:' + this.Rooms[roomImmat].portals[portalImmat].action)

							// new ??
							this[PortalName].body.collideWorldBounds = true;
							
		this.physics.add.collider(
			this[PortalName],
			this.playerOne)
							
		// this.physics.add.collider(this[PortalName],this.playerOne)
		// this.physics.add.overlap(
		// 	this[PortalName],
		// 	this.playerOne,
		// 	this.teleportationTo(roomImmat, portalImmat),
		// 	null,
		// 	this
		// );
		
		this.physics.add.collider(
			this[PortalName],
			this.playerOne,
			this.collidingPanda,
			{toto:'titi'},
			this
		);
							
						}
					}

				}
			}
		}
	}
	addplayer() {
		this.playerOne = this.physics.add.image(
			this.Rooms[this.actualRoomImmat].x + this.Rooms[this.actualRoomImmat].startpos.x + (this.playerDatas.w / 2),
			this.Rooms[this.actualRoomImmat].y + this.Rooms[this.actualRoomImmat].startpos.y + (this.playerDatas.h / 2),
			'playerOne'
		)
		.setOrigin(.5, .5)
		.setCollideWorldBounds(true);
	}
	// _____________________________________________
	// FUNCTIONS __________________________________/
	setWorldBoundsByActualRoom() {
		this.physics.world.setBounds(
			this.Rooms[this.actualRoomImmat].x,
			this.Rooms[this.actualRoomImmat].y,
			this.Rooms[this.actualRoomImmat].w,
			this.Rooms[this.actualRoomImmat].h
		);
	}
	teleportationTo = (portalImmat) => {		
		// get target room & target portal immats 
		let targetRoomImmat=this.Rooms[this.actualRoomImmat].portals[portalImmat].dest.room
		let targetPortalImmat=this.Rooms[this.actualRoomImmat].portals[portalImmat].dest.portal

		// change player pos ?
		this.playerOne.x = this.Rooms[targetRoomImmat].x + this.Rooms[targetRoomImmat].portals[targetPortalImmat].x +(this.Rooms[targetRoomImmat].portals[targetPortalImmat].w/2);
		this.playerOne.y = this.Rooms[targetRoomImmat].y + this.Rooms[targetRoomImmat].portals[targetPortalImmat].y +(this.Rooms[targetRoomImmat].portals[targetPortalImmat].h/2);

		// clear ROOM
		this.clearActualRoomPortals()

		// refresh worlds bound
		this.actualRoomImmat = this.Rooms[this.actualRoomImmat].portals[portalImmat].dest.room
		this.setWorldBoundsByActualRoom()
		this.addActualRoomPortals()
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
			'(x:' + (this.playerOne.x - this.Rooms[this.actualRoomImmat].x) +
			',y:' + (this.playerOne.y - this.Rooms[this.actualRoomImmat].y) + ')')
		this.myconsole.x = 1
		this.myconsole.y = 1

	}
	// ________________________
	// TESTS ______________/__/
	loadPandaImage() {
		// testing collider
		this.load.image('panda', 'assets/panda.png')
		this.load.image('block', 'assets/block.png')
	}
	addPanda() {
		// testing collider
		this.panda = this.physics.add.image(
			this.Rooms[this.actualRoomImmat].x + 65,
			this.Rooms[this.actualRoomImmat].y + 1,
			'panda'
		).setOrigin(0)

		this.physics.add.overlap(this.panda, this.playerOne, this.collidingPanda, null, this);

		this.block = this.physics.add.image(
			this.Rooms[this.actualRoomImmat].x + 129,
			this.Rooms[this.actualRoomImmat].y + 1,
			'block'
		).setOrigin(0)//.setScale(2)

		this.physics.add.overlap(this.playerOne, this.block, this.collidingPanda, null, this);
	}
	collidingPanda() {
		this.panda.destroy()
		this.block.destroy()
		// create a new one at random room and pos
		// or not
	}
}
