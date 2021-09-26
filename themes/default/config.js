let configDefault = {
	images: {
		room0: { image: THEMEPATHIMG + 'floor_256-0.png' },
		room1: { image: THEMEPATHIMG + 'map_1.png' },//floor_256-1.png' },
		room2: { image: THEMEPATHIMG + 'floor_256-2.png' },
		room3: { image: THEMEPATHIMG + 'floor_256-3.png' },
		room4: { image: THEMEPATHIMG + 'floor_256-4.png' },
	},
	player: {
		basic: {
			image: THEMEPATHIMG + 'playerface.png',
		},
	},
	zooom: {
		origin: 1,
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

