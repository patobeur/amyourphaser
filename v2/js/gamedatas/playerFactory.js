class PlayerFactory extends Phaser.Scene {
	constructor() {
		super()
		this.playerDatas = {
			uname: 'playerOne',
			image: { immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			speed: 5,
			// basic: {
			// 	image:{ immat: false, uname: 'player', path: THEMEPATHIMG + 'star_32x32.png' },
			// },
			job: 'basic',
			stats: this.get_job('basic', 'stats'),
			clickedDest: {
				x: false,
				y: false
			},
			x: 1, y: 1, // not used ???
			deg: -90,
			dest: { on: false, x: 0, y: 0 },
			up_player: false,
			down_player: false,
			left_player: false,
			right_player: false,
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
					madness: 0
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
					madness: 0
				},
			},
			'rogue': {
				uname: 'rogue',
				stats: {
					health: 100,
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
					health: 100,
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
					health: 100,
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
