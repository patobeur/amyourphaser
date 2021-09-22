let Rooms = [
	{
		x: 1, y: 1, w: 256, h: 256, image: 'assets/floor_256-4.png',
		portals: [
			{
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: 'assets/p_out.png',
			},
			{
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: 'assets/p_in.png',
				dest: { room: 1, portal: 0 }
			},
		]
	},
	{
		x: 257, y: 256, w: 256, h: 256, image: 'assets/floor_256-1.png', startpos: { x: 124, y: 124 },
		portals: [
			{
				action: 'out', x: 1, y: 128, w: 64, h: 64,
				image: 'assets/p_out.png', norigin: { x: 0.5, y: 0.5 }
			},
			{
				action: 'in', x: 192, y: 128, w: 64, h: 64,
				image: 'assets/p_in.png', norigin: { x: 0.5, y: 0.5 },
				dest: { room: 2, portal: 0 }
			},
		]
	},
	{
		x: 513, y: 1, w: 256, h: 256, image: 'assets/floor_256-2.png',
		portals: [
			{
				action: 'out', x: 1, y: 1, w: 64, h: 64,
				image: 'assets/p_out.png', norigin: { x: 0.5, y: 0.5 }
			},
			{
				action: 'in', x: 192, y: 1, w: 64, h: 64,
				image: 'assets/p_in.png', norigin: { x: 0.5, y: 0.5 },
				dest: { room: 0, portal: 0 }
			},
		]
	},
];
