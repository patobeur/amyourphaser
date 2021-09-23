let allRooms = [
	{
		x: 1, y: 1, image: configClient.rooms[0].image ?? configDefault.rooms[0].image,
		portals: [
			{
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: configClient.portals.out.image ?? configDefault.portals.out.image,
			},
			{
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: configClient.portals.in.image ?? configDefault.portals.in.image,
				dest: { room: 1, portal: 0 }
			},
		]
	},
	{
		// START PLAYER POS
		startpos: { x: 124, y: 124 },
		x: 257, y: 256, image: configClient.rooms[1].image ?? configDefault.rooms[1].image,
		portals: [
			{
				action: 'out', x: 1, y: 128, w: 64, h: 64,
				image: configClient.portals.out.image ?? configDefault.portals.out.image,
			},
			{
				action: 'in', x: 192, y: 128, w: 64, h: 64,
				image: configClient.portals.in.image ?? configDefault.portals.in.image,
				dest: { room: 2, portal: 0 }
			},
		],
		items: [
			{ id: 0, name: 'pandabagsmall', x: 50, y: 68 }
		],
		blocks: [
			{ id: 0, name: 'blocksimple', x: 150, y: 250 }
		]
	},
	{
		x: 513, y: 1, image: configClient.rooms[2].image ?? configDefault.rooms[2].image,
		portals: [
			{
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: configClient.portals.out.image ?? configDefault.portals.out.image,
			},
			{
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: configClient.portals.in.image ?? configDefault.portals.in.image,
				dest: { room: 0, portal: 0 }
			},
		]
	},
];
let allBlocksByRoom = {
	0: {},
	1: {
		objid: 'simpleblock', x: 50, y: 86
	},
	2: {},
}
let allBlocks = {
	simpleblock: {
		objName: 'simple block',
		image: configClient.blocks.blocksimple.image ?? configDefault.blocks.blocksimple.image,
		body: {
			enable: true,
			immovable: true,
			moves: false
		}
	}
}

let allItemsByRoom = {
	0: {},
	1: {
		objid: 'pandabagsmall',
	},
	2: {},
}
let allItems = {
	pandabagsmall: {
		objName: 'panda bag',
		type: 'bag',
		skills: ['smallbag'],
		image: configClient.items.pandabagsmall.image ?? configDefault.items.pandabagsmall.image,
	},
}

let allPlayer = {
	objName: 'playerOne',
	startPos: {},
	picture: configClient.player.image ?? configDefault.player.image,
	w: 20,
	h: 31,
	speed: 5,
	basic: {
		image: configClient.player.basic.image ?? configDefault.player.basic.image,
	}
}

let allzooom = {
	step: configClient.zooom.step ?? configDefault.zooom.step,
	max: configClient.zooom.max ?? configDefault.zooom.max,
	min: configClient.zooom.min ?? configDefault.zooom.min,
}
let allkeys = {
	keyUp: configClient.keys.keyUp ?? configDefault.keys.keyUp,
	keyDown: configClient.keys.keyDown ?? configDefault.keys.keyDown,
	keyLeft: configClient.keys.keyLeft ?? configDefault.zooom.keyLeft,
	keyRight: configClient.keys.keyRight ?? configDefault.keys.keyRight,
	keySpace: configClient.keys.keySpace ?? configDefault.keys.keySpace,
	keyEnter: configClient.keys.keyEnter ?? configDefault.keys.keyEnter,
	keyEscape: configClient.keys.keyEscape ?? configDefault.keys.keyEscape,
	keyTilde: configClient.keys.keyTilde ?? configDefault.keys.keyTilde,
	keyPlus: configClient.keys.keyPlus ?? configDefault.keys.keyPlus,
	keyMinus: configClient.keys.keyMinus ?? configDefault.keys.keyMinus,
	keyShift: configClient.keys.keyShift ?? configDefault.keys.keyShift,
	keyTalk: configClient.keys.keyTalk ?? configDefault.keys.keyTalk
}
