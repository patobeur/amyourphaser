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
			stats: this.get_job('basic', 'stats'),
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
	get_job = (jobuname, jobcat) => {
		let jobs = {
			'basic': {
				uname: 'basic',
				stats: {
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0
				},
			},
			'magic': {
				uname: 'magic',
				stats: {
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0
				},
			},
			'rogue': {
				uname: 'rogue',
				stats: {
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0
				},
			},
			'warrior': {
				uname: 'warrior',
				stats: {
					int: 100,
					karma: 100,
					strength: 100,
					ying: 0,
					yang: 0,
					madness: 0
				},
			},
			'whatever': {
				uname: 'whatever',
				stats: {
					int: 1,
					karma: 1,
					strength: 1,
					ying: 50,
					yang: 50,
					madness: 100
				},
			},
		}
		return jobs[jobuname][jobcat]
	}
}
