class PlayerFactory extends Phaser.Scene {
	constructor() {
		super()
		this.jobs = ['magic', 'rogue', 'healer', 'archer', 'warrior']
		this.playerkeys = KEYSFACTORY.keys.player;
		this.playerDatas = {
			uname: 'ObiOuane',
			x: 1,
			y: 1, // not used ???
			deg: -90,
			speed: 4,
			job: 'warrior',//basic,rogue,warrior,healer,archer,magic
			stats: {},
			up_player: false,
			down_player: false,
			left_player: false,
			right_player: false,
			currentSpriteName: 'idle_down',
			image: {},
			sprites: {},
			setbounds: { //this must go to floorfactory
				x: 0,
				y: 0,
				w: 1920,
				h: 1080
			},
			clickpos: new Phaser.Math.Vector2()
		}

		this.setJobDatas();

		this.playerPhaser = Object
		this.animskeys = [
			'idle_up', 'idle_right', 'idle_down', 'idle_left',
			'walk_up', 'walk_right', 'walk_down', 'walk_left'
		]
	}
	// _____________________________________________________
	// SET JOB DATAS ______________________________//_______\
	setJobDatas() {
		// only one of each
		this.playerDatas.stats = this.get_job('stats');
		this.playerDatas.image = this.get_job('image');
		this.playerDatas.sprites = this.get_job('sprites');
	}

	// _____________________________________________________
	// CLICK FLOOR TO MOVE ________________________//_______\
	PlayerMoveByPointer = (obj, thisgame) => {
		this.set_PlayerClickPos({ x: obj.input.localX, y: obj.input.localY })
		this.move_PlayerToPointerPos(thisgame)
	}
	set_PlayerClickPos(obj) {
		this.playerDatas.clickpos = {
			x: obj.x - this.playerPhaser.body.halfWidth,
			y: obj.y - this.playerPhaser.body.halfHeight
		}
		this.playerDatas.deg = MATHSFACTORY.get_DegreeWithTwoPos(
			this.playerPhaser.x,
			this.playerPhaser.y,
			this.playerDatas.clickpos.x,
			this.playerDatas.clickpos.y
		)
	}
	move_PlayerToPointerPos(thisgame) {
		thisgame.physics.moveTo(
			this.playerPhaser,
			this.playerDatas.clickpos.x,
			this.playerDatas.clickpos.y,
			200)
	}
	checkPlayerOnKeyDown(event) {

		if (this.playerkeys.keyUp.indexOf(event.keyCode) > -1) {
			this.playerPhaser.y -= this.playerDatas.speed;
			this.playerDatas.up_player = true;
			this.set_CurrentPlayerSprite('walk_up')
		}
		else if (this.playerkeys.keyDown.indexOf(event.keyCode) > -1) {
			this.playerPhaser.y += this.playerDatas.speed;
			this.playerDatas.down_player = true;
			this.set_CurrentPlayerSprite('walk_down')
		}
		else if (this.playerkeys.keyLeft.indexOf(event.keyCode) > -1) {
			this.playerPhaser.x -= this.playerDatas.speed;
			this.playerDatas.left_player = true;
			this.set_CurrentPlayerSprite('walk_left')
		}
		else if (this.playerkeys.keyRight.indexOf(event.keyCode) > -1) {
			this.playerPhaser.x += this.playerDatas.speed;
			this.playerDatas.right_player = true;
			this.set_CurrentPlayerSprite('walk_right')
		}
	}
	createPlayerGAMEAnims() {
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
	}
	set_CurrentPlayerSprite(animeName) {
		if (this.playerDatas.currentSpriteName != animeName) {
			this.playerPhaser.play(animeName)
			this.playerDatas.currentSpriteName = animeName
		}

	}
	get_imagetopreload() {
		let allJobs = this.get_job('all')
		let jobsimage = []
		this.jobs.forEach(jobname => {
			jobsimage.push(allJobs[jobname].image)
		});
		return jobsimage
	}
	get_job = (jobcat) => {
		let jobs = {
			rogue: {
				uname: 'rogue',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 0, yang: 100, madness: 0, speed: 4 },
				image: { immat: -1, uname: 'player_rogue', path: THEMEPATHASSETS + 'img/job_rogue.png' },
				sprites: { immat: -1, uname: 'playersprites_rogue', path: THEMEPATHASSETS + '/sprites/playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
			},
			magic: {
				uname: 'magic',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 50, yang: 50, madness: 0, speed: 4 },
				image: { immat: -1, uname: 'player_magic', path: THEMEPATHASSETS + 'img/job_magic.png' },
				sprites: { immat: -1, uname: 'playersprites_magic', path: THEMEPATHASSETS + '/sprites/playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
			},
			archer: {
				uname: 'archer',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 0, yang: 0, madness: 0, speed: 4 },
				image: { immat: -1, uname: 'player_archer', path: THEMEPATHASSETS + 'img/job_basic.png' },
				sprites: { immat: -1, uname: 'playersprites_archer', path: THEMEPATHASSETS + '/sprites/playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
			},
			warrior: {
				uname: 'warrior',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 0, yang: 0, madness: 0, speed: 4 },
				image: { immat: -1, uname: 'player_warrior', path: THEMEPATHASSETS + 'img/job_warrior.png' },
				sprites: { immat: -1, uname: 'playersprites_warrior', path: THEMEPATHASSETS + '/sprites/playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
			},
			healer: {
				uname: 'healer',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 100, yang: 0, madness: 0, speed: 4 },
				image: { immat: -1, uname: 'player_healer', path: THEMEPATHASSETS + 'img/job_healer.png' },
				sprites: { immat: -1, uname: 'playersprites_healer', path: THEMEPATHASSETS + '/sprites/playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
			},
		}
		if (jobcat == 'all') {
			return jobs
		}
		return jobs[this.playerDatas.job][jobcat]
	}
	updateplayerpos() {
		var distance = Phaser.Math.Distance.Between(
			this.playerPhaser.x,
			this.playerPhaser.y,
			this.playerDatas.clickpos.x,
			this.playerDatas.clickpos.y
		);
		// if body player is mooving
		if (this.playerPhaser.body.speed > 0) {
			if (distance < this.playerDatas.speed) {
				CHATFACTORY.add_message('I reach pos x:' + parseInt(this.playerPhaser.x) + ',y:' + parseInt(this.playerPhaser.y), 'text', 'me')
				this.playerPhaser.body.reset(this.playerDatas.clickpos.x, this.playerDatas.clickpos.y);
			}
		}
	}
}
let PLAYERFACTORY = new PlayerFactory();
