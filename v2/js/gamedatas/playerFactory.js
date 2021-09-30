class PlayerFactory extends Phaser.Scene {
	constructor() {
		super()
		this.playerkeys = playerkeys;
		this.playerDatas = {
			uname: 'playerOne',
			image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },

			deston: false,
			destx: 0,
			desty: 0,
			x: 1,
			y: 1, // not used ???
			deg: -90,
			speed: 4,
			// basic: {
			// 	image:{ immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			// },
			job: 'basic',
			stats: this.get_job('basic', 'stats'),
			up_player: false,
			down_player: false,
			left_player: false,
			right_player: false,
			//ANIMS
			currentSprites: 'idle_down',
			sprites: {
				immat: false,
				uname: 'playersprites',
				path: THEMEPATHSPRITES + 'playersprites.png',
				frames: { frameWidth: 32, frameHeight: 32 }
			},
			setbounds: {
				x: 0,
				y: 0,
				w: 1920,
				h: 1080
			},

		}
		this.playerPhaser = false
		this.animskeys = [
			'idle_up', 'idle_right', 'idle_down', 'idle_left',
			'walk_up', 'walk_right', 'walk_down', 'walk_left'
		]
	}
	set_job = () => {

	}
	set_stats = () => {

	}
	set_jobstats = () => {

	}
	get_job = (jobuname, jobcat) => {
		let jobs = {
			'basic': {
				uname: 'basic',
				stats: {
					health: 100,
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0,
					speed: 4,
				},
				image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			},
			'magic': {
				uname: 'magic',
				stats: {
					health: 100,
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0,
					speed: 4,
				},
				image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			},
			'StormTrooper': {
				uname: 'rogue',
				stats: {
					health: 100,
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0,
					speed: 4,
				},
				image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			},
			'vendeurdechoux': {
				uname: 'warrior',
				stats: {
					health: 100,
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0,
					speed: 4,
				},
				image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			},
			'whatever': {
				uname: 'whatever',
				stats: {
					health: 100,
					int: 1,
					karma: 1,
					strength: 1,
					ying: 50,
					yang: 50,
					madness: 100,
					speed: 4,
				},
				image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			},
		}
		return jobs[jobuname][jobcat]
	}

	checkPlayerOnKeyDown(event) {

		if (this.playerkeys.keyUp.indexOf(event.keyCode) > -1) {
			this.playerPhaser.y -= this.playerDatas.speed;
			this.playerDatas.up_player = true;
			this.checkCurrentPlayerSprite('walk_up')
		}
		else if (this.playerkeys.keyDown.indexOf(event.keyCode) > -1) {
			this.playerPhaser.y += this.playerDatas.speed;
			this.playerDatas.down_player = true;
			this.checkCurrentPlayerSprite('walk_down')
		}
		else if (this.playerkeys.keyLeft.indexOf(event.keyCode) > -1) {
			this.playerPhaser.x -= this.playerDatas.speed;
			this.playerDatas.left_player = true;
			this.checkCurrentPlayerSprite('walk_left')
		}
		else if (this.playerkeys.keyRight.indexOf(event.keyCode) > -1) {
			this.playerPhaser.x += this.playerDatas.speed;
			this.playerDatas.right_player = true;
			this.checkCurrentPlayerSprite('walk_right')
		}
	}
	createPlayerAnim() {
		// https://labs.phaser.io/edit.html?src=src/animation/create%20animation%20from%20sprite%20sheet.js&v=3.55.2
		// Animation set
		GAME.anims.create({
			key: 'idle_down', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_up', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_left', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_right', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [6] }),
		});
		GAME.anims.create({
			key: 'walk_up', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [1, 0, 2, 0] }),
		});
		GAME.anims.create({
			key: 'walk_down', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [7, 6, 8, 6] }),
		});
		GAME.anims.create({
			key: 'walk_left', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [14, 12, 13, 12] }),
		});
		GAME.anims.create({
			key: 'walk_right', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('playersprites', { frames: [19, 18, 20, 18] }),
		});
		// PLAYERFACTORY.playerPhaser.play('idle_down');
	}
	checkPlayerOnKeyUp(event) {
		// if (
		// 	(this.playerkeys.keyUp.indexOf(event.keyCode) > -1) ||
		// 	(this.playerkeys.keyDown.indexOf(event.keyCode) > -1) ||
		// 	(this.playerkeys.keyLeft.indexOf(event.keyCode) > -1) ||
		// 	(this.playerkeys.keyRight.indexOf(event.keyCode) > -1)
		// ) {
		// 	console.log('isPlaying', this.playerPhaser.anims.isPlaying)
		// 	console.log('event.Up', event)
		// 	console.log('currentAnim.key', this.playerPhaser.anims.currentAnim.key)

		// 	let name = this.playerPhaser.anims.currentAnim.key;
		// 	name = name.replace('walk_', '') + '_player'

		// 	console.log(name)
		// 	console.log('A_this.playerDatas[' + name + ']: is ' + this.playerDatas[name])

		// 	this.playerDatas[name] = false

		// 	this.playerPhaser.anims.stop();
		// 	console.log('B_this.playerDatas[' + name + '] is set to :' + this.playerDatas[name])
		// }
	}

	checkCurrentPlayerSprite(animeName) {
		if (this.playerDatas.currentSpriteName != animeName) {
			this.playerPhaser.play(animeName)
			// console.log(this.playerPhaser)
			this.playerDatas.currentSpriteName = animeName
		}

	}




}
