class KeyboardFactory {
	constructor() {
		// super()
		this.keys = {
			player: {
				keyUp: configDefault.keys.player.keyUp,
				keyDown: configDefault.keys.player.keyDown,
				keyLeft: configDefault.keys.player.keyLeft,
				keyRight: configDefault.keys.player.keyRight,
			},
			ui: {
				keySpace: configDefault.keys.ui.keySpace,
				keyEnter: configDefault.keys.ui.keyEnter,
				keyEscape: configDefault.keys.ui.keyEscape,
				keyTilde: configDefault.keys.ui.keyTilde,
				keyPlus: configDefault.keys.ui.keyPlus,
				keyMinus: configDefault.keys.ui.keyMinus,
				keyShift: configDefault.keys.ui.keyShift,
				keyTalk: configDefault.keys.ui.keyTalk
			}
		}
	}
}
