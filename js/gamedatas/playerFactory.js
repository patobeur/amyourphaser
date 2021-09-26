class PlayerFactory extends Phaser.Scene {
	constructor() {
		super()
		this.player = {
			uname: 'playerOne',
			startPos: { room: 2, x: 1, y: 1 },// not used ???
			x: 1, y: 1, // not used ???
			picture: configDefault.player.image,
			w: 20, h: 31,
			speed: 5,
			basic: {
				image: configDefault.player.basic.image,
			},
			job: 'basic',
			stats: {
				int: 100,
				karma: 100,
				strength: 100,
				ying: 0,
				yang: 0,
				madness: 0
			},
			clickedDest: {
				x: false,
				y: false
			}
		}
		this.playerPhaser
	}
	set_job = () => {

	}
	set_stats = () => {

	}
	set_jobstats = () => {

	}
}
