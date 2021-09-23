class ItemShop extends Phaser.Scene {
	constructor() {
		super()
		this.articleliste = this.get_articleliste()
	}
	get_articleliste = () => {
		let articleliste = {
			items: {
				pandabagsmall: {
					objName: 'panda bag',
					type: 'bag',
					skills: ['smallbag'],
					image: (configClient.items.pandabagsmall.image) ?? configDefault.items.pandabagsmall.image,
				},
			},
			blocks: {
				blocksimple: {
					objName: 'block simple',
					type: 'block',
					image: (configClient.blocks.blocksimple.image) ?? configDefault.blocks.blocksimple.image,
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
