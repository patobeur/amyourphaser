let allRooms = [
	{
		x: 1, y: 1, w: 256, h: 256, image: dataz.rooms[0].image,
		portals: [
			{
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: dataz.portals.out.image,
			},
			{
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: dataz.portals.in.image,
				dest: { room: 1, portal: 0 }
			},
		]
	},
	{
		// START PLAYER POS
		startpos: { x: 124, y: 124 },
		x: 257, y: 256, w: 256, h: 256, image: dataz.rooms[1].image,
		portals: [
			{
				action: 'out', x: 1, y: 128, w: 64, h: 64,
				image: dataz.portals.out.image,
			},
			{
				action: 'in', x: 192, y: 128, w: 64, h: 64,
				image: dataz.portals.in.image,
				dest: { room: 2, portal: 0 }
			},
		]
	},
	{
		x: 513, y: 1, w: 256, h: 256, image: dataz.rooms[2].image,
		portals: [
			{
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: dataz.portals.out.image,
			},
			{
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: dataz.portals.in.image,
				dest: { room: 0, portal: 0 }
			},
		]
	},
];
let allBlocks = {
	simple: {
		objName: 'simpleblock',
		image: dataz.blocks.simple.image
	}
}

let allItems = {
	panda: {
		objName: 'pandabag',
		type: 'bag',
		skills: ['smallbag'],
		image: dataz.items.panda.image
	},
}

let allPlayer = {
	objName: 'playerOne',
	startPos: {},
	picture: dataz.player.image,
	w: 20,
	h: 31,
	speed: 5,
	basic: {
		image: dataz.player.basic.image
	}
}
