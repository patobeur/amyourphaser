let GAME = Object
//                                           __
//  *       ________     ________      _____/\_\
//  *      /\       \   /\   __  \    /\   / / /
//  *     /  \       \ /  \  \_\  \__/_ \  \/_/ \
//  *    /    \_______\ /\ \_______\___\ \_______\
//  *    \    /       / \/ /  __   /___/ /  __   /
//  *     \  /       / \  /  /_/  /  \  /  /\ \ /
//  *      \/_______/   \/_______/    \/___\ \_\
//  *                                       \/_/
//  *
window.onload = () => {
	var config = {
		rootrep: 'src/',
		type: Phaser.CANVAS,
		width: window.innerWidth,
		height: window.innerHeight,
		parent: 'amyourphaser',
		physics: {
			default: 'arcade',
			arcade: {
				// gravity: { y: 0 },
				debug: true
			}
		},
		scene: [SceneMain],// SceneTwo],
	};
	GAME = new Phaser.Game(config);
}

// VARIABLES
// var score = 0;
// var bestscore = localStorage.getItem('phaser-bestscore')
// var scoreText
// var bestscoreText;
// var gameoverText;

// var gameStart = false;
// var gameOver = false;

// var keyRestart = game.input.keyboard.addKey('W');  // Get key object
// var keyRestartisDown = keyObj.isDown;
// var keyRestartisUp = keyObj.isUp;

// function boot() {
// }


// function preload() {
// 	this.load.image('sky', config.rootrep + 'assets/sky.png');
// 	this.load.image('ground', config.rootrep + 'assets/platform.png');
// 	this.load.image('floor', config.rootrep + 'assets/basefloor.png');
// 	this.load.image('star', config.rootrep + 'assets/star.png');
// 	this.load.image('bomb', config.rootrep + 'assets/bomb.png');
// 	this.load.spritesheet('dude',
// 		config.rootrep + 'assets/dude.png',
// 		{ frameWidth: 32, frameHeight: 48 }
// 	);
// 	gameStart = true
// }
// function create() {
// 	cursors = this.input.keyboard.createCursorKeys();
// 	// ------------------------------------------------
// 	// DISPLAY SKY
// 	// ------------------------------------------------
// 	this.add.image(400, 300, 'sky'); // .setOrigin(0, 0)

// 	// ------------------------------------------------
// 	// DISPLAY SCORE & MORE
// 	scoreText = this.add.text(24, 16, 'score:0', { fontSize: '32px', fill: '#FFF' });
// 	bestscoreText = this.add.text(784, 32, 'Best:' + bestscore, { fontSize: '32px', fill: '#FFF' }).setOrigin(1, 0.5);
// 	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


// 	// ------------------------------------------------
// 	// DISPLAY PLATFORMS
// 	// ------------------------------------------------
// 	platforms = this.physics.add.staticGroup();
// 	platforms.create(400, 568, 'floor').setScale(2).refreshBody();
// 	platforms.create(600, 400, 'ground');
// 	platforms.create(50, 250, 'ground');
// 	platforms.create(750, 220, 'ground');

// 	// ------------------------------------------------
// 	// DISPLAY PLAYER
// 	player = this.physics.add.sprite(100, 400, 'dude');
// 	player.setBounce(0.2);
// 	player.setCollideWorldBounds(true);
// 	// player.body.setGravityY(300)
// 	// ------------------------------------------------
// 	// ------------------------------------------------
// 	// ANIMATIONS
// 	this.anims.create({
// 		key: 'left',
// 		frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
// 		frameRate: 10,
// 		repeat: -1
// 	});
// 	this.anims.create({
// 		key: 'turn',
// 		frames: [{ key: 'dude', frame: 4 }],
// 		frameRate: 20
// 	});
// 	this.anims.create({
// 		key: 'right',
// 		frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
// 		frameRate: 10,
// 		repeat: -1
// 	});

// 	// DISPLAY BOMBS
// 	bombs = this.physics.add.group();
// 	// this.physics.add.collider(bombs, platforms);
// 	// this.physics.add.collider(player, bombs, hitBomb, null, this);
// 	// --------------------------------------------------------
// 	stars = this.physics.add.group({
// 		key: 'star',
// 		repeat: 11,
// 		setXY: { x: 12, y: 0, stepX: 70 }
// 	});
// 	stars.children.iterate(function (child) {
// 		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
// 	});

// 	// colliders
// 	this.physics.add.collider(player, platforms);
// 	this.physics.add.collider(stars, platforms);
// 	// Stars Vs Player Colliding
// 	// this.physics.add.overlap(player, stars, collectStar, null, this);


// }
// function update() {
// 	if (gameOver) {
// 		return;
// 	}
// 	//--
// 	// if (keyRestartisUp && gameOver) {
// 	// 	game.clearAndRestart()
// 	// }
// 	if (cursors.left.isDown) {
// 		player.setVelocityX(-160);
// 		console.log(player)
// 		player.anims.play('left', true);
// 	}
// 	else if (cursors.right.isDown) {
// 		player.setVelocityX(160);
// 		player.anims.play('right', true);
// 	}
// 	else {
// 		player.setVelocityX(0);
// 		player.anims.play('turn');
// 	}
// 	if (cursors.up.isDown) {
// 		player.setVelocityY(-160);
// 	}
// 	else if (cursors.down.isDown) {
// 		player.setVelocityY(160);
// 	}
// 	//--
// 	// if (cursors.up.isDown && player.body.touching.down) {
// 	// 	player.setVelocityY(-335);
// 	// }
// }

// function clearAndRestart() {

// }

// function hitBomb(player, bomb) {
// 	this.physics.pause();
// 	player.setTint(0xff0000);
// 	player.anims.play('turn');
// 	// GAME OVER
// 	gameOver = true;
// 	gameoverText = this.add.text(400, 300, 'GameOver', style).setOrigin(0.5, 0.5);
// 	gameoverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
// }
// function collectStar(player, star) {
// 	star.disableBody(true, true);
// 	score += 10;
// 	scoreText.setText('Score: ' + score);
// 	bestscoreText.setText('Best: ' + bestscore);

// 	if (score > bestscore) {
// 		localStorage.setItem('iyp-bestscore', score)
// 		bestscore = score;
// 		bestscoreText.setText('Best: ' + bestscore);
// 	}
// 	// BOMB EFFECTS
// 	if (stars.countActive(true) === 0) {
// 		stars.children.iterate(function (child) {
// 			child.enableBody(true, child.x, 0, true, true);
// 		});
// 		var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
// 		var bomb = bombs.create(x, 16, 'bomb');
// 		bomb.setBounce(1);
// 		bomb.setCollideWorldBounds(true);
// 		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
// 	}
// }


// Cosmic.Boot = function () { };

// //setting game configuration and loading the assets for the loading screen
// Cosmic.Boot.prototype = {
// 	preload: function () {
// 		//assets we'll use in the loading screen
// 		this.load.image('logo', 'assets/images/logo.png');
// 		this.load.image('preloadbar', 'assets/images/preloader-bar.png');
// 	},
// 	create: function () {
// 		//loading screen will have a white background
// 		this.game.stage.backgroundColor = '#fff';

// 		//scaling options
// 		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
// 		this.scale.minWidth = 240;
// 		this.scale.minHeight = 170;
// 		this.scale.maxWidth = 2880;
// 		this.scale.maxHeight = 1920;

// 		//have the game centered horizontally
// 		this.scale.pageAlignHorizontally = true;

// 		//screen size will be set automatically
// 		this.scale.setScreenSize(true);

// 		//physics system for movement
// 		this.game.physics.startSystem(Phaser.Physics.ARCADE);

// 		this.state.start('Preload');
// 	}
// };

// 	// rootrep: 'src/',

// // Cosmic.game.state.add('Boot', Cosmic.Boot);
// // //uncomment these as we create them through the tutorial
// // //Cosmic.game.state.add('Preload', Cosmic.Preload);
// // //Cosmic.game.state.add('MainMenu', Cosmic.MainMenu);
// // //Cosmic.game.state.add('Game', Cosmic.Game);

// // Cosmic.game.state.start('Boot');
