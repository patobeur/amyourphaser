class UiDomFactory extends Phaser.Scene {
	constructor() {
		super();
		this.myconsolestyle = {
			font: "bold 32px quikhand",
			fill: "#FF0000",
			boundsAlignH: "center",
			boundsAlignV: "middle",
			stroke: "#de77ae",
			textecolor: "#ff0000"
		}
		this.myconsole = Object
		this.consoleStats = Object
		this.texteRoom
	}
	UIaddConsole = (player, playerPhaser, obj) => {
		let posX = 1
		let posY = 1
		this.myconsole = obj.add.text(posX, posY, '', this.myconsolestyle)
		this.myconsole.scrollFactorX = 0
		this.myconsole.scrollFactorY = 0
		this.UIrefreshConsole(player, playerPhaser, obj)
	}
	UIrefreshConsole(player, playerPhaser, obj) {
		this.myconsole.setText('Player X: ' + playerPhaser.x + ' Y: ' + playerPhaser.y +
			'(x:' + (playerPhaser.x - obj.A_CurrentLibrarie.rooms['rooms' + obj.actualRoomImmat].x) +
			',y:' + (playerPhaser.y - obj.A_CurrentLibrarie.rooms['rooms' + obj.actualRoomImmat].y) + ')')
	}

	// stats
	UIaddStats = (player, playerPhaser, obj) => {
		console.log('myconsole', this.myconsole)
		let posX = 1
		let posY = 50//this.myconsole.y + this.myconsole.height
		//texte room
		this.texteRoom = obj.add.text(posX, posY, 'Room:', this.myconsolestyle)
		this.texteRoom.zoomFactor = 0
		this.texteRoom.scrollFactorX = 0
		this.texteRoom.scrollFactorY = 0
		console.log(this.texteRoom)

		//texte health
		posY = this.texteRoom.y + this.texteRoom.height
		this.healthG = obj.add.text(posX, posY, 'Health:', this.myconsolestyle)
		this.healthG.scrollFactorX = 0
		this.healthG.scrollFactorY = 0


		this.consoleStats = obj.add.group()
		this.consoleStats.add(this.texteRoom)
		this.UIrefreshStats(player, playerPhaser, obj)
	}
	UIrefreshStats(player, playerPhaser, obj) {
		this.texteRoom.setText('Room : rooms' + obj.actualRoomImmat)
		// console.log(player)
		this.healthG.setText('HP : ' + player.stats.health)
	}
}
