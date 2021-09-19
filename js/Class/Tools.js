class Tools extends Phaser.Scene {
	constructor() {
		super()
		this.actualroom = 1
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

			// only room where playerOne is
			if (roomImmat === this.actualroom) {
				this['room' + roomImmat].setInteractive()
				this['room' + roomImmat].on('pointerdown', () => { this.roomClickedByImmat(roomImmat) }, this)
				// if portals exists
				if (typeof this.Rooms[roomImmat].portals === 'object') {
					this.addPortalsByRoomImmat(roomImmat, { only: 'all' })
				}
			}
			else {
				// only room where playerOne is NOT and portals exists
				if (typeof this.Rooms[roomImmat].portals === 'object') {
					this.addPortalsByRoomImmat(roomImmat, { only: 'out' })
				}
			}
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
						// add portal to game
						this['portal' + roomImmat + '_' + portalImmat] = this.physics.add.image(
							this.Rooms[roomImmat].portals[portalImmat].x + this.Rooms[roomImmat].x,
							this.Rooms[roomImmat].portals[portalImmat].y + this.Rooms[roomImmat].y,
							'portal' + roomImmat + '_' + portalImmat
						).setOrigin(0)


						// ADD COLLIDER TO PORTAL WITH TELEPORTATION

						if (this.Rooms[roomImmat].portals[portalImmat].action == 'in') {

							console.log('adding collider portal[room' + roomImmat + 'portal:' + portalImmat + '] action:' + this.Rooms[roomImmat].portals[portalImmat].action)

							let portal = this['portal' + roomImmat + '_' + portalImmat]
							this.physics.add.collider(
								portal,
								this.playerOne,
								this.teleportationTo(roomImmat, portalImmat),
								null,
								this
							);
						}
					}

				}
			}
		}
	}
	addplayer() {
		// console.log('player pos: ', (this.Rooms[this.actualroom].x + this.Rooms[this.actualroom].startpos.x), (this.Rooms[this.actualroom].y + this.Rooms[this.actualroom].startpos.y))
		this.playerOne = this.physics.add.image(
			this.Rooms[this.actualroom].x + this.Rooms[this.actualroom].startpos.x + (this.playerDatas.w / 2),
			this.Rooms[this.actualroom].y + this.Rooms[this.actualroom].startpos.y + (this.playerDatas.h / 2),
			'playerOne'
		).setOrigin(.5, .5)

		this.playerOne.setCollideWorldBounds(true);
	}
	// _____________________________________________
	// FUNCTIONS __________________________________/
	setWorldBounds() {
		this.physics.world.setBounds(
			this.Rooms[this.actualroom].x,
			this.Rooms[this.actualroom].y,
			this.Rooms[this.actualroom].w,
			this.Rooms[this.actualroom].h
			// this.Rooms[2].x,
			// this.Rooms[2].y,
			// this.Rooms[2].w,
			// this.Rooms[2].h
		);

	}
	teleportationTo = (roomImmat, portalImmat) => {		// get room dest portal pos 
		console.log(
			'Beam me up, Scotty ! teleporting from',
			'Room[' + roomImmat + ']Portal[' + roomImmat + '] to',
			'Room[' + this.Rooms[roomImmat].portals[portalImmat].dest.room + ']Portal[' + this.Rooms[roomImmat].portals[portalImmat].dest.portal + ']')

		// change room
		// this.actualroom = this.Rooms[roomImmat].portals[portalImmat].dest.room

		// wtf ?
		// this.playerOne.x = this.Rooms[this.actualroom].portals[portalImmat].x;
		// this.playerOne.y = this.Rooms[this.actualroom].portals[portalImmat].y;

		// refresh worlds bound
		// this.setWorldBounds()
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
		// this.myconsole = this.physics.add.text(1, 1, '', this.myconsolestyle)
		this.myconsole = this.add.text(1, 1, '', this.myconsolestyle)
		// this.myconsole.setInteractive()
		// this.myconsole.setCollideWorldBounds(true);
	}
	refreshconsole() {
		// this.myconsole.setText('X: ' + this.cameras.main.scrollX + ' / Y: ' + parseInt(this.cameras.main.scrollY))
		this.myconsole.setText(
			'Player X: ' + this.playerOne.x + ' Y: ' + this.playerOne.y +
			'(x:' + (this.playerOne.x - this.Rooms[this.actualroom].x) + ',y:' + (this.playerOne.y - this.Rooms[this.actualroom].y) +
			')')
	}
}
