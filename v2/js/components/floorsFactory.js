class FloorsFactory extends Phaser.Scene {
	constructor() {
		super()
		this.currentFloorImmat = new Number('0')
		this.images = []
		this.sprites = this.get_sprites()
	}
	set_CurrentFloorImmat(floorImmat) {
		this.floors[floorImmat] ? this.currentFloorImmat = floorImmat : ''
	}
	get_images() {
		return [
			{ immat: -1, uname: 'floor_256-2', path: THEMEPATHASSETS + 'floors/floor_256-2.png' },
		]
	}
	get_sprites() {
		return []
	}
	get_imagetopreload() {
		let allJobs = this.get_job('all')
		let jobsimage = []
		this.jobs.forEach(jobname => {
			this.images.push(allJobs[jobname].image)
		});
		return jobsimage
	}
}
let FLOORSFACTORY = new FloorsFactory();
