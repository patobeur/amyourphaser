class ItemShop extends Phaser.Scene {
	constructor() {
		super()
		this.articleliste = this.get_articleliste()
	}
	get_articleliste = () => {
		let articleliste = {
			items: {
				pandabagsmall: {
					name: 'pandabagsmall',
					type: 'bag',
					skills: ['pandabagsmall'],
					image: configDefault.items.pandabagsmall.image,
				},
			},
			blocks: {
				blocksimple: {
					name: 'blocksimple',
					type: 'block',
					image: configDefault.blocks.blocksimple.image,
				},
			}
		}
		return articleliste
	}
	get_article = (type, name) => {
		console.log('get_' + type, name)
		return this.articleliste[type][name] ?? false
	}
}
