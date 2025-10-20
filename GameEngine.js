import { RoomManager } from "./RoomManager.js";

class GameEngine {
	room;

	constructor() {
		this.room = new RoomManager();
	}

	async checkAnswer(val) {
		const response = await fetch(`rooms/room_${this.room.roomNumber}/questions.json`);
		const data = await response.json();
		return val == data.answer;
	}

	startGame() {
		document.getElementsByClassName("answer")[0].style.display = "flex";
		this.room.load_room(this.room.get_current_room());
	}

	nextPage() {
		this.room.increment_room();
		this.room.load_room(this.room.get_current_room());
	}
}

const gameEngine = new GameEngine();
const main_button = document.getElementById("main_container").firstElementChild;
const next_button = document.getElementsByClassName("next_btn")[0];
document.getElementsByClassName("answer")[0].style.display = "none";

// Main button
main_button.addEventListener("click", function (e) {
	gameEngine.startGame();
});

// Validation button
next_button.addEventListener("click", function (e) {
	gameEngine.nextPage();
});
