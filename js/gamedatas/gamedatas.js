let allRooms = [
	{
		x: 1, y: 1,
		name: 'endroom',
		image: configDefault.rooms[0].image,
		portals: [
			{
				name: 'portalout',
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: configDefault.portals.out.image,
			},
			{
				name: 'portalin',
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: configDefault.portals.in.image,
				dest: { room: 1, portal: 0 }
			},
		]
	},
	{
		// START PLAYER POS
		startpos: { x: 124, y: 124 },
		name: 'startroom',
		x: 257, y: 256, image: configDefault.rooms[1].image,
		portals: [
			{
				name: 'portalout',
				action: 'out', x: 1, y: 128, w: 64, h: 64,
				image: configDefault.portals.out.image,
			},
			{
				name: 'portalin',
				action: 'in', x: 192, y: 128, w: 64, h: 64,
				image: configDefault.portals.in.image,
				dest: { room: 2, portal: 0 }
			},
		],
		items: [
			{
				name: 'pandabagsmall', x: 50, y: 68,
				image: configDefault.items['pandabagsmall'].image,
			}
		],
		blocks: [
			{
				name: 'blocksimple', x: 150, y: 250,
				image: configDefault.blocks['blocksimple'].image,
			}
		]
	},
	{
		name: 'passageroom',
		x: 513, y: 1,
		image: configDefault.rooms[2].image,
		portals: [
			{
				name: 'portalout',
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: configDefault.portals.out.image,
			},
			{
				name: 'portalin',
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: configDefault.portals.in.image,
				dest: { room: 0, portal: 0 }
			},
		]
	},
];
// let allBlocksByRoom = {
// 	0: {},
// 	1: {
// 		objid: 'simpleblock', x: 50, y: 86
// 	},
// 	2: {},
// }
let allBlocks = {
	simpleblock: {
		name: 'simpleblock',
		image: configDefault.blocks.blocksimple.image,
		body: {
			enable: true,
			immovable: true,
			moves: false
		}
	}
}

// let allItemsByRoom = {
// 	0: {},
// 	1: {
// 		objid: 'pandabagsmall',
// 	},
// 	2: {},
// }
let allItems = {
	pandabagsmall: {
		name: 'pandabagsmall',
		type: 'bag',
		skills: ['pandabagsmall'],
		image: configDefault.items.pandabagsmall.image,
	},
}

let allPlayer = {
	name: 'playerOne',
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
