class GameEngine {
	room;

	constructor(roomNumber) {
		this.room = new RoomManager(roomNumber);
	}

	async checkAnswer(val) {
		console.log(this.room);
		const response = await fetch(`rooms/room_${this.room.roomNumber}/questions.json`);
		const data = await response.json();
		console.log("DATA ", data);
		return val == data.answer;
	}
}
