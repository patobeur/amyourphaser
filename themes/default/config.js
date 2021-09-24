let configDefault = {
	rooms: {
		'0': { image: THEMEPATHIMG + 'floor_256-0.png' },
		'1': { image: THEMEPATHIMG + 'map_1.png' },//floor_256-1.png' },
		'2': { image: THEMEPATHIMG + 'floor_256-2.png' },
		'3': { image: THEMEPATHIMG + 'floor_256-3.png' },
		'4': { image: THEMEPATHIMG + 'floor_256-4.png' },
	},
	portals: {
		'in': { image: THEMEPATHIMG + 'p_in.png' },
		'out': { image: THEMEPATHIMG + 'p_out.png' },
	},
	player: {
		basic: {
			image: THEMEPATHIMG + 'playerface.png',
		},
	},
	blocks: {
		blocksimple: {
			image: THEMEPATHIMG + 'grass_32.png',
		}
	},
	items: {
		pandabagsmall: {
			image: THEMEPATHIMG + 'panda.png',
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

