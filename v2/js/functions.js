class GameFunctions extends Phaser.Scene {
	constructor() {
		super('SceneMain')
		// this.uikeys = uikeys;
		// this.input.keyboard.on('keyup', this.onKeyUp, this);
		//
		// PHASER Singles
		this.allSingles = {
			uiburger: [],
			cursor: Object,
		}
		// PHASER groups
		this.allGroups = {}
		this.camera2 = Object
	}
	// _________________________________________
	// GAMESCENE PRELOADS _librarie+__//_______/
	preloadAll() {
		IMAGESFACTORY.preloadAllImages()
		this.allGroups = {
			// background: this.physics.add.group(),
			floor: this.physics.add.group(),
			block: this.physics.add.group(),
			player: this.physics.add.group(),
			// mob: this.add.group(),
			ui: this.add.group(),
		}
	}
	createAll() {

		FLOORSFACTORY.addFloorToScene()
		INTERACTIVEFACTORY.setFloorClickable()
		UIFACTORY.addcursortoscene()
		this.setWorldBounds()
		this.addUi() // burger
		INTERACTIVEFACTORY.resizeApp()

		FLOORSFACTORY.addBlocksToScene()
		PLAYERFACTORY.addplayertoscene()


		// keydown, keyup, wheel, resize and other interactions
		INTERACTIVEFACTORY.set_interactivity(0)
		// setInteractive && make clickable
		this.consoleconfig()
		this.camerasmainfollow() // cameras.main follow player
		this.addcamera2()

	}
	updateAll() {
		PLAYERFACTORY.updateplayerpos()
	}
	consoleconfig() {
		if (LOGON) {
			console.log('GAME', GAME)
			console.log('GAME.config', GAME.config)
			console.log('myPhaserConfig', myPhaserConfig)
		}
		console.log('Ready to go !')
	}
	// worl limit
	setWorldBounds() {
		let floor = this.allGroups.floor[FLOORSFACTORY.currentFloorUname]
		// console.log('floor', floor)
		// let coords = {
		// 	x: floor.x -= (PLAYERFACTORY.playerPhaser.width / 2) - 1,
		// 	y: floor.y -= (PLAYERFACTORY.playerPhaser.height / 2) - 1,
		// 	w: floor.width += (PLAYERFACTORY.playerPhaser.width) + 1,
		// 	h: floor.height += (PLAYERFACTORY.playerPhaser.height) + 1
		// }
		let coords = {
			x: floor.x,
			y: floor.y,
			w: floor.width,
			h: floor.height
		}
		// set bounds
		// this.physics.world.setBounds(coords.x, coords.y, coords.w, coords.h);
		this.physics.world.setBounds(0, 0, 256, 256);
		// if (LOGON) 
		console.log('this.physics.world.setBounds', coords.x, coords.y, coords.w, coords.h)
	}
	// camera follow
	camerasmainfollow = () => {
		this.cameras.main.startFollow(PLAYERFACTORY.playerPhaser);
		// this.cameras.main.setSize(x, y);
	}
	// ________________________
	// TESTS ______________/__/
	// ADD UI
	addUi() { // useless
		this.allSingles.uiburger = this.add.image(128, 0, 'burger_off').setOrigin(1, 0).setScale(1)
		this.allGroups.ui.add(this.allSingles.uiburger)
	}
	addcamera2 = () => {
		this.camera2 = this.cameras.add(20, 20, 160, 100)
		// this.camera2.rotation = Math.sin(45);
		this.camera2.startFollow(PLAYERFACTORY.playerPhaser);
		this.camera2.zoom = .5
		this.camera2.setBackgroundColor(0x222222)
		this.updatecameras()
	}
	updatecameras() { // better in scene update()
		// this.camera2.scrollX = Math.cos(50) * 100;
		// this.camera2.scrollY = Math.sin(50) * 100;
		// this.camera2.shake(100, 0.01);
		// this.camera2.flash(2000);
		// this.camera2.fade(2000);
		// this.camera2.zoom = 0.5 + Math.abs(Math.sin(45));
		// if (this.camera2._fadeAlpha >= 1.0) {
		// 	this.camera2._fadeAlpha = 0.0;
		// 	this.camera2.fade(1000);
		// }
	}
	// colliding(obj1, obj2) {
	// 	console.log('simple colliding ok')
	// 	this.physics.add.collider(
	// 		obj1,
	// 		obj2
	// 	)
	// }
	// ERKAGOON
	collide_object(object1) {
		console.log('collide_object')
		console.log(object1)
		this.physics.add.collider(
			object1,
			PLAYERFACTORY.playerPhaser,
			() => {
				console.log('colliding---------------->')
				if (PLAYERFACTORY.playerDatas.up_player) {
					//here on stop le player dans la direction du haut
					PLAYERFACTORY.playerPhaser.y -= -5;
				}
				if (PLAYERFACTORY.playerDatas.down_player) {
					//here on stop le player dans la direction du bas
					PLAYERFACTORY.playerPhaser.y += -5;
				}
				if (PLAYERFACTORY.playerDatas.left_player) {
					//here on stop le player dans la direction de gauche
					PLAYERFACTORY.playerPhaser.x -= -5;
				}
				if (PLAYERFACTORY.playerDatas.right_player) {
					//here on stop le player dans la direction de droite
					PLAYERFACTORY.playerPhaser.x += -5;
				}
			},
		)
	}
	callbackContext() {
		console.log('wtf')
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
				PLAYERFACTORY.playerDatas.speed = 0;
				this.add.text(PLAYERFACTORY.playerPhaser.x - 250, PLAYERFACTORY.playerPhaser.y - 50, 'GAME OVER', { font: "72px Arial Black", fill: colorText });
				setTimeout(function () { location.reload(); }, 3000);
			}
		);
	}
}
