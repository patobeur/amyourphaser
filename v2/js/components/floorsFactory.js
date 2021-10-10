class FloorsFactory extends Phaser.Scene {
	constructor() {
		super()
		this.currentFloorImmat = new Number('0')
		this.currentFloorUname = new String('floor_0')
		this.roomsDatas = this.get_roomsDatas()
		this.images = this.get_images()
		// this.sprites = this.get_sprites()
	}
	set_CurrentFloorImmat(floorImmat) {
		this.floors[floorImmat] ? this.currentFloorImmat = floorImmat : ''
	}
	get_images() {
		let images = [];
		this.roomsDatas.forEach(room => {
			images.push({ immat: room.immat, uname: room.uname, path: room.path, })
			if (room.blocks) {
				room.blocks.forEach(block => {
					images.push({ immat: block.immat, uname: block.uname, path: block.path, })
				})
			}
		})
		return images
	}
	get_imagetopreload() {
		return this.images
	}
	get_roomsDatas() {
		return [
			{
				immat: -1,
				uname: 'floor_0',
				path: THEMEPATHASSETS + 'floors/floor_256-2.png',
				blocks: [
					{
						immat: -1,
						uname: 'block_1',
						x: 3 * 32, y: 2 * 32,
						path: THEMEPATHASSETS + 'img/wall_64x32.png',
						collide: true,
						worldbound: true
					},
					{
						immat: -1,
						uname: 'block_2',
						x: 7 * 32, y: 0,
						path: THEMEPATHASSETS + 'img/wall_64x32.png',
						collide: true,
						worldbound: true
					},
					{
						immat: -1,
						uname: 'block_3',
						x: 7 * 32, y: 4 * 32,
						path: THEMEPATHASSETS + 'img/wall_64x64.png',
						collide: true,
						immovable: true,
						nomoves: true,
						worldbound: true
					},
					{
						immat: -1,
						uname: 'block_4',
						x: 2 * 32, y: 192,
						path: THEMEPATHASSETS + 'img/wall_64x32.png',
						collide: true,
						rotate: 0,
						immovable: true,
						nomoves: true
					},
					{
						immat: -1,
						uname: 'block_0',
						x: 3 * 32, y: 0,
						path: THEMEPATHASSETS + 'img/wall_32x64.png',
					},
				]
			}
		]
	}
	addFloorToScene() { // grounds are clickable
		this.currentFloorDatas = FLOORSFACTORY.images[FLOORSFACTORY.currentFloorImmat].uname
		// if (LOGON)
		console.log('addFloorToScene', FLOORSFACTORY.currentFloorImmat, this.currentFloorUname)
		// add to groups
		GAME.scene.scenes[SCENEIMMAT].allGroups.floor[this.currentFloorUname] =
			GAME.scene.scenes[SCENEIMMAT].physics.add.image(
				0, 0,
				this.currentFloorUname
			).setOrigin(0, 0);
		GAME.scene.scenes[SCENEIMMAT].allGroups.floor[this.currentFloorUname].setCollideWorldBounds(true);
		GAME.scene.scenes[SCENEIMMAT].allGroups.floor[this.currentFloorUname].immovable = true
		GAME.scene.scenes[SCENEIMMAT].allGroups.floor[this.currentFloorUname].body.moves = false
	}
	addBlocksToScene() {
		console.log('adding blocks...')
		// this.currentFloorUname = FLOORSFACTORY.images[FLOORSFACTORY.currentFloorImmat].uname
		this.roomsDatas[FLOORSFACTORY.currentFloorImmat].blocks.forEach(block => {
			// console.log('set_blocks', block)
			// console.log('adding : ', block.uname, 'to allGroups.block')
			GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname] =
				GAME.scene.scenes[SCENEIMMAT].physics.add.sprite(
					block.x,
					block.y,
					block.uname
				)
					.setOrigin(0, 0)
			// 
			// GAME.scene.scenes[SCENEIMMAT].collide_object(
			// 	GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname]
			// )

			if (block.worldbound) { GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].setCollideWorldBounds(true) }
			// if (block.immovable) { GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].immovable = true }
			if (block.nomoves) { GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].body.moves = false }

			if (block.collide) {
				GAME.scene.scenes[SCENEIMMAT].collide_object(
					GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname])
			}
			if (block.rotate) {
				GAME.scene.scenes[SCENEIMMAT].tweens.add({
					targets: GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname],
					angle: block.rotate,
					duration: 0,
					// onUpdate: (tween) => {
					// 	const value = GAME.scene.scenes[SCENEIMMAT].tweens
					// 	console.log('ok', value)
					// }
				})



				// GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].setAngle(block.rotate)
				// GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].setRotation(Phaser.Math.RadToDeg(block.rotate))
				// console.log('rotation', GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].rotation)
			}
			if (block.beat_off) { GAME.scene.scenes[SCENEIMMAT].beat_off(x, y, 'red') }
			if (block.game_over) { GAME.scene.scenes[SCENEIMMAT].game_over_collider(x, y, 'red') }
			// .setInteractive()
			// console.log('set_blocks', GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname])
		});
		// GAME.scene.scenes[SCENEIMMAT].allGroups.block[block.uname].setCollideWorldBounds(true)

	}
	// 🙏 ERKAGOON
	// collide_object(object1, player) {
	// 	console.log('------collide_object-----')
	// 	GAME.scene.scenes[SCENEIMMAT].physics.add.collider(
	// 		player,
	// 		object1,
	// 		(test) => { this.collideCallback(test) },
	// 		(test) => { this.callbackContext(test) },
	// 	);
	// 	console.log(GAME.scene.scenes[SCENEIMMAT].physics)
	// 	console.log('------collide_object done-----')
	// }
	// collideCallback(test) {
	// 	console.log('test', test)
	// 	console.log('##########')
	// 	if (PLAYERFACTORY.playerDatas.up_player) {
	// 		console.log('##########')
	// 		//here on stop le player dans la direction du haut
	// 		PLAYERFACTORY.playerPhaser.y -= -5;
	// 	}
	// 	if (PLAYERFACTORY.playerDatas.down_player) {
	// 		console.log('##########')
	// 		//here on stop le player dans la direction du bas
	// 		PLAYERFACTORY.playerPhaser.y += -5;
	// 	}
	// 	if (PLAYERFACTORY.playerDatas.left_player) {
	// 		console.log('##########')
	// 		//here on stop le player dans la direction de gauche
	// 		PLAYERFACTORY.playerPhaser.x -= -5;
	// 	}
	// 	if (PLAYERFACTORY.playerDatas.right_player) {
	// 		console.log('##########')
	// 		//here on stop le player dans la direction de droite
	// 		PLAYERFACTORY.playerPhaser.x += -5;
	// 	}
	// }
	// callbackContext() {
	// 	console.log('wtf')
	// }
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
let FLOORSFACTORY = new FloorsFactory();
