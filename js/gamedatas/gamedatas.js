// this is all the game lv datas
// first - if new item you have to add it in file ItemFactory.js->get_articleliste()
// second ad it here
// room image are still imported from themes/default/config.js file but this must change !
let allRooms = [
	{
		uname: 'endroom',
		x: 1, y: 1,
		image: configDefault.images['room0'].image,
		portals: [
			{
				uname: 'portalout',
				action: 'out',
				x: 1, y: 1,
				w: 64, h: 64
			},
			{
				uname: 'portalin',
				action: 'in',
				x: 192, y: 1,
				w: 64, h: 64,
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
				action: 'out',
				x: 1, y: 128,
				w: 64, h: 64,
			},
			{
				uname: 'portalin',
				x: 192, y: 128,
				w: 64, h: 64,
				action: 'in',
				dest: { room: 2, portal: 0 }
			},
			{
				uname: 'tp_vert_out_19x19',
				action: 'out',
				x: 368, y: 248,
				w: 64, h: 64,
			},
			{
				uname: 'tp_vert_in_19x19',
				x: 420, y: 66,
				w: 64, h: 64,
				action: 'in',
				dest: { room: 1, portal: 2 }
			},
		],
		items: [
			{
				uname: 'pandabagsmall',
				x: 50, y: 68,
			}
		],
		blocks: [
			{
				uname: 'blocksimple',
				x: 150, y: 250,
			},
			{
				uname: 'wall_32x64',
				x: 220, y: 350,
				type: 'collide',
				body: {
					enable: true,
					immovable: true,
					moves: false,
					pushable: false,
					blocked: { none: false },
					rotation: 45,
					angle: 45,
					checkCollision: { none: true },
					collideWorldBounds: true,
					// transform: { rotation: true },
				}
			},
			{
				uname: 'wall_32x64',
				x: 420, y: 350,
				type: 'beat_off',
				body: {
					enable: true,
					immovable: true,
					moves: false,
					pushable: false,
					blocked: { none: false },
					rotation: 45,
					angle: 45,
					checkCollision: { none: true },
					collideWorldBounds: true,
					// transform: { rotation: true },
				}
			},
			{
				uname: 'wall_32x64',
				x: 60, y: 350,
				type: 'game_over',
				body: {
					enable: true,
					immovable: true,
					moves: false,
					pushable: false,
					blocked: { none: false },
					rotation: 45,
					angle: 45,
					checkCollision: { none: true },
					collideWorldBounds: true,
					// transform: { rotation: true },
				}
			}
		]
	},
	{
		uname: 'passageroom',
		x: 513, y: 1,
		image: configDefault.images['room2'].image,
		portals: [
			{
				action: 'out', uname: 'portalout',
				x: 1, y: 1,
				w: 64, h: 64,
			},
			{
				action: 'in', uname: 'portalin',
				x: 192, y: 1,
				w: 64, h: 64,
				dest: { room: 0, portal: 0 }
			},
		],
		items: [
			{
				uname: 'pandabagsmall',
				x: 50, y: 68,
			}
		],
	},
];

// extracted from themes/default/config.js file
let allzooom = {
	origin: configDefault.zooom.origin,
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
