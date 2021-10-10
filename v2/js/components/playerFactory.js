class PlayerFactory extends Phaser.Scene {
	constructor() {
		super()
		this.playerPhaser = Object
		this.jobs = ['magic', 'rogue', 'healer', 'archer', 'warrior']
		this.playerkeys = INTERACTIVEFACTORY.keys.player;
		this.images = []
		this.sprites = []
		this.spritessheet = []
		this.bulletssprite = []
		this.set_imagesAndSprites()
		// --
		this.playerDatas = {
			uname: 'ObiOuane',
			job: 'warrior',//basic,rogue,warrior,healer,archer,magic
			currentSpriteName: 'idle_down',
			x: 16,
			y: 16, // not used ???
			deg: -90,
			speed: 4,
			up_player: false,
			down_player: false,
			left_player: false,
			right_player: false,
			image: {},
			sprites: {},
			spritessheet: {},
			bulletssprite: {},
			stats: {},
			clickpos: new Phaser.Math.Vector2(),
			fireRate: 100,
			nextFire: 0,
		}

		this.setJobDatas();

		this.animskeys = [
			'idle_up', 'idle_right', 'idle_down', 'idle_left',
			'walk_up', 'walk_right', 'walk_down', 'walk_left'
		]

		// shoot system
		this.bullets = false;

	}
	addplayertoscene() {
		this.playerPhaser = GAME.scene.scenes[SCENEIMMAT].physics.add.sprite(
			this.playerDatas.x, this.playerDatas.y,
			this.playerDatas.sprites.uname
		).setOrigin(.5, .5)
		this.playerPhaser.setCollideWorldBounds(true)

		if (SHOOTSKILL) this.set_bullets()

		// add to group
		GAME.scene.scenes[SCENEIMMAT].allGroups.player.add(this.playerPhaser)
		this.createPlayerGAMEAnims()
		CHATFACTORY.add_message('New around ? ', 'text')
		CHATFACTORY.add_message('Here you are x:' + parseInt(this.playerPhaser.x) + ',y:' + parseInt(this.playerPhaser.y), 'text')
	}
	// updateplayerpos() {
	// 	// console.log('refresh')
	// 	// if body player is mooving
	// 	if (this.playerPhaser.body.speed > 0) {
	// 		var distance = Phaser.Math.Distance.Between(
	// 			this.playerPhaser.x,
	// 			this.playerPhaser.y,
	// 			this.playerDatas.clickpos.x,
	// 			this.playerDatas.clickpos.y
	// 		);
	// 		if (distance < this.playerDatas.speed) {
	// 			//CHATFACTORY.add_message('I reach pos x:' + parseInt(this.playerPhaser.x) + ',y:' + parseInt(this.playerPhaser.y), 'text', 'me')
	// 			this.playerPhaser.body.reset(this.playerDatas.clickpos.x, this.playerDatas.clickpos.y);
	// 		}
	// 	}
	// }
	// _____________________________________________________
	// SET JOB DATAS ______________________________//_______\
	setJobDatas() {
		// only one of each
		this.playerDatas.stats = this.get_job('stats');
		this.playerDatas.image = this.get_job('image');
		this.playerDatas.bulletssprite = this.get_job('bulletssprite');
		this.playerDatas.sprites = this.get_job('sprites');
		this.playerDatas.spritessheet = this.get_job('spritessheet');
		// set bullet skills true or false
		// only archer and magic

	}
	// _____________________________________________________
	// CLICK FLOOR TO MOVE ________________________//_______\
	// playerMoveByPointer = (backgroundclicked) => {
	// 	CLIKTOMOVEFACTORY.set_PlayerClickPos({ x: backgroundclicked.input.localX + (PLAYERFACTORY.playerPhaser.width / 2), y: backgroundclicked.input.localY + (PLAYERFACTORY.playerPhaser.height / 2) })
	// 	CLIKTOMOVEFACTORY.move_PlayerToPointerPos()
	// }
	// set_PlayerClickPos(obj) {
	// 	this.playerDatas.clickpos = {
	// 		x: obj.x - this.playerPhaser.body.halfWidth,
	// 		y: obj.y - this.playerPhaser.body.halfHeight
	// 	}
	// 	this.playerDatas.deg = MATHSFACTORY.get_DegreeWithTwoPos(
	// 		this.playerPhaser.x,
	// 		this.playerPhaser.y,
	// 		this.playerDatas.clickpos.x,
	// 		this.playerDatas.clickpos.y
	// 	)
	// }

	// move_PlayerToPointerPos() {
	// 	GAME.scene.scenes[SCENEIMMAT].physics.moveTo(
	// 		this.playerPhaser,
	// 		this.playerDatas.clickpos.x,
	// 		this.playerDatas.clickpos.y,
	// 		200)
	// }
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
		else if (this.playerkeys.key1.indexOf(event.keyCode) > -1) {
			// TOUCHE & ou 1
			// SHOOT SYSTEM
			if (SHOOTSKILL) {
				PLAYERFACTORY.fire()
				console.log('Shooting !')
			}
		}
	}
	checkPlayerOnKeyUp(event) {
	}
	createPlayerGAMEAnims() {
		// https://labs.phaser.io/edit.html?src=src/animation/create%20animation%20from%20sprite%20sheet.js&v=3.55.2
		// Animation set
		// console.log('sprites_' + this.playerDatas.job)
		GAME.anims.create({
			key: 'idle_down', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_up', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_left', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [6] }),
		});
		GAME.anims.create({
			key: 'idle_right', frameRate: 8, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [6] }),
		});
		GAME.anims.create({
			key: 'walk_up', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [1, 0, 2, 0] }),
		});
		GAME.anims.create({
			key: 'walk_down', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [7, 6, 8, 6] }),
		});
		GAME.anims.create({
			key: 'walk_left', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [14, 12, 13, 12] }),
		});
		GAME.anims.create({
			key: 'walk_right', frameRate: 4, repeat: -1,
			frames: GAME.anims.generateFrameNumbers('sprites_' + this.playerDatas.job, { frames: [19, 18, 20, 18] }),
		});
		// PLAYERFACTORY.playerPhaser.play('idle_down');
	}
	set_CurrentPlayerSprite(animeName) {
		if (this.playerDatas.currentSpriteName != animeName) {
			// console.log('animeName', animeName)
			this.playerPhaser.play(animeName)
			this.playerDatas.currentSpriteName = animeName
		}
	}
	set_imagesAndSprites() {
		let allJobs = this.get_job('all')
		this.jobs.forEach(jobname => {
			this.images.push(allJobs[jobname].image)
			this.sprites.push(allJobs[jobname].sprites)
			this.spritessheet.push(allJobs[jobname].spritessheet)
			// this.bulletssprite.push(allJobs[jobname].bulletssprite)
		});
	}
	// JOBS / METIERS
	get_job = (jobcat) => {
		let jobs = {
			rogue: {
				uname: 'rogue',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 0, yang: 100, madness: 0, speed: 4 },
				sprites: { immat: -1, uname: 'sprite_rogue', path: THEMEPATHASSETS + 'img/job_rogue.png', frames: { frameWidth: 32, frameHeight: 32 } },
				image: { immat: -1, uname: 'player_rogue', path: THEMEPATHSPRITE + 'playersprites.png' },
				spritessheet: { immat: -1, uname: 'sprites_rogue', path: THEMEPATHSPRITE + 'playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
				bulletssprite: { immat: -1, uname: 'bullet_rogue', path: THEMEPATHSPRITE + 'fireball.png', frames: { frameWidth: 32, frameHeight: 32 } },
				skills: { bullets: true }
			},
			magic: {
				uname: 'magic',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 50, yang: 50, madness: 0, speed: 4 },
				sprites: { immat: -1, uname: 'sprite_magic', path: THEMEPATHASSETS + 'img/job_magic.png', frames: { frameWidth: 32, frameHeight: 32 } },
				image: { immat: -1, uname: 'player_magic', path: THEMEPATHSPRITE + 'playersprites.png' },
				spritessheet: { immat: -1, uname: 'sprites_magic', path: THEMEPATHSPRITE + 'playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
				bulletssprite: { immat: -1, uname: 'bullet_magic', path: THEMEPATHSPRITE + 'fireball.png', frames: { frameWidth: 32, frameHeight: 32 } },
				skills: { bullets: true }
			},
			archer: {
				uname: 'archer',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 0, yang: 0, madness: 0, speed: 4 },
				sprites: { immat: -1, uname: 'sprite_archer', path: THEMEPATHASSETS + 'img/job_basic.png', frames: { frameWidth: 32, frameHeight: 32 } },
				image: { immat: -1, uname: 'player_archer', path: THEMEPATHSPRITE + 'playersprites.png' },
				spritessheet: { immat: -1, uname: 'sprites_archer', path: THEMEPATHSPRITE + 'playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
				bulletssprite: { immat: -1, uname: 'bullet_archer', path: THEMEPATHSPRITE + 'fireball.png', frames: { frameWidth: 32, frameHeight: 32 } },
				skills: { bullets: true }
			},
			warrior: {
				uname: 'warrior',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 0, yang: 0, madness: 0, speed: 4 },
				sprites: { immat: -1, uname: 'sprite_warrior', path: THEMEPATHASSETS + 'img/job_warrior.png', frames: { frameWidth: 32, frameHeight: 32 } },
				image: { immat: -1, uname: 'player_warrior', path: THEMEPATHSPRITE + 'playersprites.png' },
				spritessheet: { immat: -1, uname: 'sprites_warrior', path: THEMEPATHSPRITE + 'playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
				bulletssprite: { immat: -1, uname: 'bullet_warrior', path: THEMEPATHSPRITE + 'fireball.png', frames: { frameWidth: 32, frameHeight: 32 } },
				skills: { bullets: true }
			},
			healer: {
				uname: 'healer',
				stats: { health: 100, int: 100, karma: 100, strength: 100, ying: 100, yang: 0, madness: 0, speed: 4 },
				sprites: { immat: -1, uname: 'sprite_healer', path: THEMEPATHASSETS + 'img/job_healer.png', frames: { frameWidth: 32, frameHeight: 32 } },
				image: { immat: -1, uname: 'player_healer', path: THEMEPATHSPRITE + 'playersprites.png' },
				spritessheet: { immat: -1, uname: 'sprites_healer', path: THEMEPATHSPRITE + 'playersprites.png', frames: { frameWidth: 32, frameHeight: 32 } },
				bulletssprite: { immat: -1, uname: 'bullet_healer', path: THEMEPATHSPRITE + 'fireball.png', frames: { frameWidth: 32, frameHeight: 32 } },
				skills: { bullets: true }
			},
		}
		if (jobcat == 'all') {
			return jobs
		}
		return jobs[this.playerDatas.job][jobcat]
	}

	//TESTING 
	// https://phaser.io/examples/v2/arcade-physics/shoot-the-pointer#download
	// https://labs.phaser.io/edit.html?src=src/input/gamepad/twin%20stick%20shooter.js
	fire() {
		if (SHOOTSKILL) {
			if (GAME.scene.scenes[SCENEIMMAT].time.now > this.playerDatas.nextFire) {
				//} && this.bullets.countDead() > 0) {
				console.log('fire()  console.log(this.bullets)', GAME.scene.scenes[SCENEIMMAT].allGroups.bullets)
				// update nextFire timer
				this.playerDatas.nextFire = GAME.scene.scenes[SCENEIMMAT].time.now + this.playerDatas.fireRate;

				var bullet = GAME.scene.scenes[SCENEIMMAT].allGroups.bullets.getFirstDead();
				// bullet.reset(this.playerPhaser.x - 8, this.playerPhaser.y - 8);
				GAME.scene.scenes[SCENEIMMAT].physics.moveTo(bullet, 300);
			}
			else {
				console.log('fire() to fast')
			}
		}
	}
	renderbullet() { // called in SceneMain.js
		if (SHOOTSKILL) {
			GAME.scene.scenes[SCENEIMMAT].debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.total, 32, 32);
			GAME.scene.scenes[SCENEIMMAT].debug.spriteInfo(this.playerPhaser, 32, 450);
		}
	}
	set_bullets() {
		// if (LOGON) 
		console.log('setting bullets')
		// this.bullets = GAME.scene.scenes[SCENEIMMAT].add.group();
		// not working ??
		// this.bullets.setCollideWorldBounds(true);
		// this.bullets.setoutOfBoundsKill(true);
		// this dont create nothing !!!!!
		GAME.scene.scenes[SCENEIMMAT].allGroups.bullets.createMultiple(50, 'bullet', 0, false);
		if (LOGON) console.log('>>>>>>>>console.log this.bullets group:', this.bullets)
		// not working ?? array empty ?????
		// this.bullets.children.forEach(element => {
		// 	console.log('<<<<<<<<<<<<<<<<console.log bullet child', bullet)
		// });
		// not working ?? array empty ?????
		GAME.scene.scenes[SCENEIMMAT].allGroups.bullets.children.each(function (bullet) {
			bullet.setCollideWorldBounds(true);
			bullet.setoutOfBoundsKill(true);
			console.log('<<<<<<<<<<<<<<<<console.log bullet child', bullet)
		}, this);
		// not working ??
		// this.bullets.setAll('checkWorldBounds', true);
		// this.bullets.setCollideWorldBounds(true);
		// this.bullets.setAll('outOfBoundsKill', true);
	}
}
let PLAYERFACTORY = new PlayerFactory();
