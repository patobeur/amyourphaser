let configDefault = {
	rooms: {
		'0': { image: 'assets/img/floor_256-0.png' },
		'1': { image: 'assets/img/floor_256-1.png' },
		'2': { image: 'assets/img/floor_256-2.png' },
		'3': { image: 'assets/img/floor_256-3.png' },
		'4': { image: 'assets/img/floor_256-4.png' },
	},
	portals: {
		'in': { image: 'assets/img/p_in.png' },
		'out': { image: 'assets/img/p_out.png' },
	},
	player: {
		basic: {
			image: 'assets/img/playerface.png',
		},
	},
	blocks: {
		simple: {
			image: 'assets/img/grass_32.png',
		}
	},
	items: {
		panda: {
			image: 'assets/img/panda.png',
		}
	},
	zooom: {
		step: .1,
		max: 3,
		min: .5
	},
	keys: {
		keyUp: [90, 38], // 'z', arrowUp
		keyDown: [83, 40], // 's', arrowDown
		keyLeft: [81, 37], // 'q', arrowLeft
		keyRight: [68, 39], // 'd', arrowRight
		keySpace: [32], // space
		keyEnter: [13], // enter
		keyEscape: [27], // escape
		keyTilde: [222], // ² tilde/square
		keyPlus: [107], // +
		keyMinus: [109], // -
		keyShift: [13], // shift
		keyTalk: [84], // t to talk in the chat
	}
}

