let allRooms = [
	{
		x: 1, y: 1,
		uname: 'endroom',
		image: configDefault.images['room0'].image,
		portals: [
			{
				uname: 'portalout',
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: configDefault.images['portalout'].image//configDefault.portals.out.image,
			},
			{
				uname: 'portalin',
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: configDefault.images['portalin'].image,//configDefault.portals.in.image,
				dest: { room: 1, portal: 0 }
			},
		]
	},
	{
		// START PLAYER POS
		startpos: { x: 124, y: 124 },
		uname: 'startroom',
		x: 257, y: 256,
		image: configDefault.images['room1'].image,
		portals: [
			{
				uname: 'portalout',
				action: 'out', x: 1, y: 128, w: 64, h: 64,
				image: configDefault.images['portalout'].image,
			},
			{
				uname: 'portalin',
				x: 192, y: 128, w: 64, h: 64,
				image: configDefault.images['portalin'].image,
				action: 'in', dest: { room: 2, portal: 0 }
			},
			// {
			// 	uname: 'portalouttest',
			// 	action: 'out',
			// 	x: 10, y: 300, w: 64, h: 64,
			// 	image: configDefault.images['portalouttest'].image
			// },
			// {
			// 	uname: 'portalintest',
			// 	x: 350, y: 0, w: 64, h: 64,
			// 	image: configDefault.images['portalintest'].image,
			// 	action: 'in', dest: { room: 1, portal: 2 }
			// },
			{
				uname: 'tp_vert_out_19x19',
				action: 'out',
				x: 368, y: 248, w: 64, h: 64,
				image: configDefault.images['tp_vert_out_19x19'].image
			},
			{
				uname: 'tp_vert_in_19x19',
				x: 420, y: 66, w: 64, h: 64,
				image: configDefault.images['tp_vert_in_19x19'].image,
				imageswitch: configDefault.images['tp_vert_in_19x19'].image,
				action: 'in', dest: { room: 1, portal: 2 }
			},
		],
		items: [
			{
				uname: 'pandabagsmall', x: 50, y: 68,
				//image: configDefault.images['pandabagsmall'].image,
			}
		],
		blocks: [
			{
				uname: 'blocksimple', x: 150, y: 250,
				image: configDefault.images['blocksimple'].image,
			}
		]
	},
	{
		uname: 'passageroom',
		x: 513, y: 1,
		image: configDefault.images['room2'].image,
		portals: [
			{
				action: 'out', uname: 'portalout', x: 1, y: 1, w: 64, h: 64,
				image: configDefault.images['portalout'].image,
			},
			{
				action: 'in', uname: 'portalin', x: 192, y: 1, w: 64, h: 64,
				image: configDefault.images['portalin'].image,
				dest: { room: 0, portal: 0 }
			},
		],
		// items: [
		// 	{
		// 		uname: 'pandabagsmall', x: 50, y: 68,
		// 		image: configDefault.images['pandabagsmall'].image,
		// 	}
		// ],
	},
];
let allBlocks = {
	blocksimple: {
		uname: 'blocksimple',
		image: configDefault.images['blocksimple'].image,
		body: {
			enable: true,
			immovable: true,
			moves: false
		}
	}
}

let allItems = {
	pandabagsmall: {
		uname: 'pandabagsmall',
		type: 'bag',
		skills: ['pandabagsmall'],
		image: configDefault.images['pandabagsmall'].image,
	},
}

let allPlayer = {
	uname: 'playerOne',
	startPos: {},
	picture: configDefault.player.image,
	w: 20,
	h: 31,
	speed: 5,
	basic: {
		image: configDefault.player.basic.image,
	}
}

let allzooom = {
	step: configDefault.zooom.step,
	max: configDefault.zooom.max,
	min: configDefault.zooom.min,
}
let allkeys = {
	keyUp: configDefault.keys.keyUp,
	keyDown: configDefault.keys.keyDown,
	keyLeft: configDefault.keys.keyLeft,
	keyRight: configDefault.keys.keyRight,
	keySpace: configDefault.keys.keySpace,
	keyEnter: configDefault.keys.keyEnter,
	keyEscape: configDefault.keys.keyEscape,
	keyTilde: configDefault.keys.keyTilde,
	keyPlus: configDefault.keys.keyPlus,
	keyMinus: configDefault.keys.keyMinus,
	keyShift: configDefault.keys.keyShift,
	keyTalk: configDefault.keys.keyTalk
}
