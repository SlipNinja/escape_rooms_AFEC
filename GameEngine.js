class GameEngine {
	roomNumber = 1;
	questions = null;

	async checkAnswer(val) {
		const response = await fetch(`rooms/room_${this.roomNumber}/questions.json`);
		const data = await response.json();
		console.log("DATA ", data);
		return val == data.answer;
	}
}
