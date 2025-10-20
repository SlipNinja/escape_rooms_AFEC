class GameEngine {
	room;

	constructor(roomNumber) {
		this.room = new RoomManager();
	}

	async checkAnswer(val) {
		console.log(this.room);
		const response = await fetch(`rooms/room_${this.room.roomNumber}/questions.json`);
		const data = await response.json();
		console.log("DATA ", data);
		return val == data.answer;
	}

	startGame() {
		this.room.load_room(1);
	}

	nextPage() {
		console.log(this.room.roomNumber);
	}
}
