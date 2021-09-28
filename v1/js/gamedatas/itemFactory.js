class ItemFactory {// extends Phaser.Scene {
	constructor() {
		// super()
		this.allItems = this.get_articleliste()
	}
	get_articleliste = () => {
		let allItems = {
			items: {
				pandabagsmall: {
					uname: 'pandabagsmall',
					type: 'bag',
					skills: ['pandabagsmall'],
					image: THEMEPATHIMG + 'panda.png',
				},
			},
			blocks: {
				blocksimple: {
					uname: 'blocksimple',
					image: THEMEPATHIMG + 'grass_32.png',
				},
				wall_32x64: {
					uname: 'wall_32x64',
					image: THEMEPATHIMG + 'wall_32x64.png',
				},
				wall_64x64: {
					uname: 'wall_64x64',
					image: THEMEPATHIMG + 'wall_64x64.png',
				},
				trap_64x64: {
					uname: 'trap_64x64',
					image: THEMEPATHIMG + 'trap_64x64.png',
				}
			},
			portals: {
				portalout: {
					uname: 'portalout',
					action: 'out',
					image: THEMEPATHIMG + 'p_out.png',
				},
				portalin: {
					uname: 'portalin',
					action: 'in',
					image: THEMEPATHIMG + 'p_in.png',
				},
				tp_vert_out_19x19: {
					uname: 'tp_vert_out_19x19',
					action: 'out',
					image: THEMEPATHIMG + 'tp_vert_out_19x19.png'
				},
				tp_vert_in_19x19: {
					uname: 'tp_vert_in_19x19',
					action: 'in',
					image: THEMEPATHIMG + 'tp_vert_in_19x19.png',
					// to test for switch img
					imageswitch: THEMEPATHIMG + 'tp_vert_in_19x19.png'
				},
			},
		}
		return allItems
	}
	get_itemFromShop = (type, uname) => {
		if (LOGON) console.log('ITEMSHOP get_itemFromShop:', uname, '(' + type + ')')
		return this.allItems[type][uname] ?? false
	}
}
