class ItemFactory extends Phaser.Scene {
	constructor() {
		super()
		this.allItems = this.get_articleliste()
	}
	get_articleliste = () => {
		let allItems = {
			items: {
				pandabagsmall: {
					uname: 'pandabagsmall',
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
					action: 'in',
					image: configDefault.images['portalin'].image,
				},
				tp_vert_out_19x19: {
					uname: 'tp_vert_out_19x19',
					action: 'out',
					image: configDefault.images['tp_vert_out_19x19'].image
				},
				tp_vert_in_19x19: {
					uname: 'tp_vert_in_19x19',
					action: 'in',
					image: configDefault.images['tp_vert_in_19x19'].image,
					imageswitch: configDefault.images['tp_vert_in_19x19'].image,
				},
			},
		}
		return allItems
	}
	get_itemFromShop = (type, uname) => {
		console.log('ITEMSHOP get_itemFromShop:', uname, '(' + type + ')')
		return this.allItems[type][uname] ?? false
	}
}
