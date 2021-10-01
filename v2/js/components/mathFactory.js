class MathFactory {
	constructor() {
		// super()
	}
	get_aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
	get_DegreeWithTwoPos = (fromX, fromY, destX, destY,) => {
		var nextY = fromY - destY;
		var nextX = fromX - destX;
		var theta = Math.atan2(-nextY, -nextX); // 0° = east
		theta *= 180 / Math.PI; // radians to degrees
		if (theta < 0) theta += 360; // negative case
		return theta;
	}
}
let MATHSFACTORY = new MathFactory();
