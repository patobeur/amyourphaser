class ItemShop extends Phaser.Scene {
	constructor() {
		super()
		this.allItems = this.get_articleliste()
	}
	get_articleliste = () => {
		let allItems = {
			items: {
				pandabagsmall: {
					uName: 'pandabagsmall',
					type: 'bag',
					skills: ['pandabagsmall'],
					image: configDefault.images['pandabagsmall'].image,
				},
			},
			blocks: {
				blocksimple: {
					uname: 'blocksimple',
					image: configDefault.images['blocksimple'].image,
					body: {
						enable: true,
						immovable: true,
						moves: false
					}
				}
			},
			portals: {
				portalout: {
					uname: 'portalout',
					action: 'out',
					image: configDefault.images['portalout'].image,
				},
				portalin: {
					uname: 'portalin',
					x: 192, y: 128, w: 64, h: 64,
					image: configDefault.images['portalin'].image,
					action: 'in', dest: { room: 2, portal: 0 }
				},
				tp_vert_out_19x19: {
					uname: 'tp_vert_out_19x19',
					action: 'out',
					x: 368, y: 248, w: 64, h: 64,
					image: configDefault.images['tp_vert_out_19x19'].image
				},
				tp_vert_in_19x19: {
					uname: 'tp_vert_in_19x19',
					x: 420, y: 66, w: 64, h: 64,
					image: configDefault.images['tp_vert_in_19x19'].image,
					imageswitch: configDefault.images['tp_vert_in_19x19'].image,
					action: 'in', dest: { room: 1, portal: 2 }
				},
			},
		}
		return allItems
	}
	get_itemFromShop = (type, uName) => {
		console.log('ITEMSHOP get_itemFromShop:', uName, '(' + type + ')')
		return this.allItems[type][uName] ?? false
	}
}
