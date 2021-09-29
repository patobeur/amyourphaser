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
			currentSprites: 'idle_down'
		}
		this.playerPhaser = false
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
	checkPlayerOnKeyUp(event) {
		this.playerPhaser.anims.stop();
	}

	checkCurrentPlayerSprite(animeName) {
		if (this.playerDatas.currentSpriteName != animeName) {
			this.playerPhaser.play(animeName)
			this.playerDatas.currentSpriteName = animeName
		}

	}




}
