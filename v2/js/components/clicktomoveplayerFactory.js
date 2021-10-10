class ClickToMovePlayerFactory extends Phaser.Scene {
	constructor() {
		super()
		// ClickToMovePlayerFactory system
		// not realy aware !!!!

	}
	// set interactivity
	setinteract() {
		GAME.scene.scenes[sceneNum].input.on('pointermove', (event) => { this.mousemove(event) });
	}
	// _____________________________________________________
	// ON MOUSE MOOVE _____________________________//_______\
	mousemove(event) {
		let floor = GAME.scene.scenes[SCENEIMMAT].allGroups.floor[FLOORSFACTORY.currentFloorUname]
		let dx = floor.input.localX
		let dy = floor.input.localY
		//set cursor
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor.setVisible(true).setPosition(dx, dy);
		// test 
		// let BetweenPoints = Phaser.Math.Angle.BetweenPoints(objsource, objdest)
		// let Between = Phaser.Math.Angle.Between(objsource, objdest)
		// let BetweenY = Phaser.Math.Angle.BetweenY(objsource, objdest)
	}
	addcursortoscene() {
		if (LOGON) console.log('addcursortoscene() to ', FLOORSFACTORY.uname)
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor = GAME.scene.scenes[SCENEIMMAT].physics.add.sprite(
			0, 0,
			'cursor_left'
		).setOrigin(.5, .5).setVisible(true)//.setScale(10)
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor.body.immovable = true
		GAME.scene.scenes[SCENEIMMAT].allSingles.cursor.body.moves = false
	}
	// _____________________________________________________
	// CLICK FLOOR TO MOVE ________________________//_______\
	setFloorClickable() {
		// add event clik on background

		let floor = GAME.scene.scenes[SCENEIMMAT].allGroups.floor[FLOORSFACTORY.currentFloorUname]
		floor.setInteractive()
		floor.on('pointerdown', (pointer) => {
			let x = floor.input.localX
			let y = floor.input.localY
			if (pointer.rightButtonDown()) {
				// if (pointer.getDuration() > 100) {
				console.log('right', x, y)
				// } else { }
			}
			if (pointer.leftButtonDown()) {
				console.log('left', x, y)
				this.playerMoveByPointer(
					floor
				)
			}
		})
		this.addcursortoscene()
	}
	playerMoveByPointer(backgroundclicked) {
		this.set_PlayerClickPos({
			x: backgroundclicked.input.localX + (PLAYERFACTORY.playerPhaser.width / 2),
			y: backgroundclicked.input.localY + (PLAYERFACTORY.playerPhaser.height / 2)
		})
		this.move_PlayerToPointerPos()
	}
	set_PlayerClickPos(obj) {
		PLAYERFACTORY.playerDatas.clickpos = {
			x: obj.x - PLAYERFACTORY.playerPhaser.body.halfWidth,
			y: obj.y - PLAYERFACTORY.playerPhaser.body.halfHeight
		}
		PLAYERFACTORY.playerDatas.deg = MATHSFACTORY.get_DegreeWithTwoPos(
			PLAYERFACTORY.playerPhaser.x,
			PLAYERFACTORY.playerPhaser.y,
			PLAYERFACTORY.playerDatas.clickpos.x,
			PLAYERFACTORY.playerDatas.clickpos.y
		)
	}
	move_PlayerToPointerPos() {
		GAME.scene.scenes[SCENEIMMAT].physics.moveTo(
			PLAYERFACTORY.playerPhaser,
			PLAYERFACTORY.playerDatas.clickpos.x,
			PLAYERFACTORY.playerDatas.clickpos.y,
			200)
	}
	updateplayerpos() {
		// console.log('refresh')
		// if body player is mooving
		if (PLAYERFACTORY.playerPhaser.body.speed > 0) {
			var distance = Phaser.Math.Distance.Between(
				PLAYERFACTORY.playerPhaser.x,
				PLAYERFACTORY.playerPhaser.y,
				PLAYERFACTORY.playerDatas.clickpos.x,
				PLAYERFACTORY.playerDatas.clickpos.y
			);
			if (distance < PLAYERFACTORY.playerDatas.speed) {
				//CHATFACTORY.add_message('I reach pos x:' + parseInt(this.playerPhaser.x) + ',y:' + parseInt(this.playerPhaser.y), 'text', 'me')
				PLAYERFACTORY.playerPhaser.body.reset(PLAYERFACTORY.playerDatas.clickpos.x, PLAYERFACTORY.playerDatas.clickpos.y);
			}
		}
	}
}
let CLIKTOMOVEFACTORY = new ClickToMovePlayerFactory();
