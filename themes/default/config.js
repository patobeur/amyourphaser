let configDefault = {
	images: {
		room0: { image: THEMEPATHIMG + 'floor_256-0.png' },
		room1: { image: THEMEPATHIMG + 'map_1.png' },//floor_256-1.png' },
		room2: { image: THEMEPATHIMG + 'floor_256-2.png' },
		room3: { image: THEMEPATHIMG + 'floor_256-3.png' },
		room4: { image: THEMEPATHIMG + 'floor_256-4.png' },
		portalin: { image: THEMEPATHIMG + 'p_in.png' },
		portalout: { image: THEMEPATHIMG + 'p_out.png' },
		// portalintest: { image: THEMEPATHIMG + 'ptest_in.png' },
		// portalouttest: { image: THEMEPATHIMG + 'ptest_out.png' },
		tp_vert_in_19x19: { image: THEMEPATHIMG + 'tp_vert_in_19x19.png' },
		tp_vert_out_19x19: { image: THEMEPATHIMG + 'tp_vert_out_19x19.png' },
		blocksimple: { image: THEMEPATHIMG + 'grass_32.png' },
		pandabagsmall: { image: THEMEPATHIMG + 'panda.png' }
	},
	player: {
		basic: {
			image: THEMEPATHIMG + 'playerface.png',
		},
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

