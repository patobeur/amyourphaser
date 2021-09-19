class Tools extends Phaser.Scene {
	constructor() {
		super()
		this.actualroom = 1
		this.centerX = GAME.config.width / 2
		this.centerY = GAME.config.height / 2
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
			world: { w: 2048, h: 2048 },
			camera: { w: 2048, h: 2048, ww: window.innerWidth, wh: window.innerHeight }
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
				x: 306, y: 306, w: 257, h: 256, image: 'assets/floor_256-1.png', startpos: { w: 1, x: 1 },
				portals: [
					{ action: 'out', x: 1, y: 1, w: 64, h: 64, image: 'assets/p_out.png', norigin: { x: 0.5, y: 0.5 }, dest: { room: 2, portal: 0 } },
					{ action: 'in', x: 65, y: 65, w: 64, h: 64, image: 'assets/p_in.png', norigin: { x: 0.5, y: 0.5 }, from: { room: 1, portal: 0 } }
				]
			},
			{
				x: 552, y: 1, w: 256, h: 256, image: 'assets/floor_256-2.png',
				portals: [
					{ action: 'out', x: 1, y: 1, w: 64, h: 64, image: 'assets/p_out.png' },//, norigin: { x: 0.5, y: 0.5 }, from: { room: 1, portal: 0 } },
					{ action: 'in', x: 65, y: 65, w: 64, h: 64, image: 'assets/p_in.png' },//, norigin: { x: 0.5, y: 0.5 }, dest: { room: 1, portal: 0 } }
				]
			},
		];
		this.playerDatas = {
			objname: 'playerOne',
			startPos: { x: 1, y: 1 },
			media: { x: 1, y: 1 },
			picture: 'assets/playerface.png'
		}
		this.zoomStepValue = .1
	}
	// ______________________________________________________
	// SOMES LISTENERS ____________________________//_______/
	onKeyDown(event) {
		if (this.keys.keyUp.indexOf(event.keyCode) > -1) {
			this.playerOne.y -= 5;
			this.cameras.main.scrollY -= 5;
		}
		else if (this.keys.keyDown.indexOf(event.keyCode) > -1) {
			this.cameras.main.scrollY += 5;
			this.playerOne.y += 5;
		}
		else if (this.keys.keyLeft.indexOf(event.keyCode) > -1) {
			this.cameras.main.scrollX -= 5;
			this.playerOne.x -= 5;
		}
		else if (this.keys.keyRight.indexOf(event.keyCode) > -1) {
			this.cameras.main.scrollX += 5;
			this.playerOne.x += 5;
		}
		this.refreshconsole()
	}
	onWheelScroll(event) {
		event.deltaY > 0
			? this.cameras.main.zoom > 0.8 ? this.cameras.main.zoom -= this.zoomStepValue : ''
			: this.cameras.main.zoom < 3 ? this.cameras.main.zoom += this.zoomStepValue : '';
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
		for (let immat = 0; immat < this.Rooms.length; immat++) {
			console.log('This Rooms (' + immat + ') pos dont work ???', this.Rooms[immat].x + 'px', this.Rooms[immat].y + 'px')

			// ADD TO GAMESCENE
			this['room' + immat] = this.add.image(this.Rooms[immat].x, this.Rooms[immat].y, 'room' + immat)
			// add immat/id to roomè
			this['room' + immat].immat = immat

			// only room where playerOne is
			if (immat === this.actualroom) {
				this['room' + immat].setInteractive()
				this['room' + immat].on('pointerdown', () => { this.roomClickedByImmat(immat) }, this)
				// if portals exists
				if (typeof this.Rooms[immat].portals === 'object') {
					this.addPortalsByRoomImmat(immat, { only: 'all' })
				}
			}
			else {
				// only room where playerOne is NOT and portals exists
				if (typeof this.Rooms[immat].portals === 'object') {
					this.addPortalsByRoomImmat(immat, { only: 'out' })
				}
			}
		}
	}
	addPortalsByRoomImmat(roomImmat, rules = false) {

		if (typeof this.Rooms[roomImmat].portals === 'object') {
			if (this.Rooms[roomImmat].portals.length > 0) {
				for (let number = 0; number < this.Rooms[roomImmat].portals.length; number++) {
					let addthisone = false
					if (rules === false) {
						addthisone = true
					}
					else {
						if (rules.only && rules.only === 'all') {
							addthisone = true
						}
						else if (rules.only && rules.only === 'out' && this.Rooms[roomImmat].portals[number].action === 'out') {
							addthisone = true
						}
						else if (rules.only && rules.only === 'in' && this.Rooms[roomImmat].portals[number].action === 'in') {
							addthisone = true
						}
					}
					if (addthisone === true) {
						// add to game
						console.log('This dont work ???: posX ??' + this.Rooms[roomImmat].x + 'px')
						this.add.image(
							this.Rooms[roomImmat].portals[number].x + this.Rooms[roomImmat].x,
							// this.Rooms[roomImmat].portals[number].x + (this.Rooms[roomImmat].x / 2),
							this.Rooms[roomImmat].portals[number].y + this.Rooms[roomImmat].y,
							// this.Rooms[roomImmat].portals[number].y + (this.Rooms[roomImmat].y / 2),
							'portal' + roomImmat + '_' + number
						)
					}

				}
			}
		}
	}
	addplayer() {
		this.playerOne = this.physics.add.image(
			this.Rooms[this.actualroom].x,
			this.Rooms[this.actualroom].y,
			'playerOne'
		).setOrigin(.5, .5)
	}
	// _____________________________________________
	// FUNCTIONS __________________________________/
	teleportationTo = (roomdest) => {
		console.log('Beam me up, Scotty !')
		console.log(roomdest)
		// get room dest portal pos 
		// change room
		// this.playerOne.y = ?;
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
		this.myconsole = this.add.text(24, 16, '', this.myconsolestyle)
	}
	refreshconsole() {
		this.myconsole.setText('X: ' + this.cameras.main.scrollX + ' / Y: ' + parseInt(this.cameras.main.scrollY))
	}
}
