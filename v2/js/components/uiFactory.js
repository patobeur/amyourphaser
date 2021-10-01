class UiFactory {
	constructor() {
		this.zoom = {
			origin: configDefault.zoom.origin,
			step: configDefault.zoom.step,
			max: configDefault.zoom.max,
			min: configDefault.zoom.min,
		}
		this.msgbox = document.getElementById('messages-box')
	}
	addmsg(string) {
		let newmsg = document.createElement('div')
		newmsg.textContent = (typeof string == 'string')
			? string
			: 'not a string !!';
		this.msgbox.prepend(newmsg)
	}
}
let UIFACTORY = new UiFactory();
