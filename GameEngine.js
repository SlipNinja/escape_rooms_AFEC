import { RoomManager } from "./RoomManager.js";

class GameEngine {
	room;

	constructor() {
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
		this.room.load_room(this.room.get_current_room());
	}

	nextPage() {
		console.log(this.room);
		this.room.roomNumber++;
		console.log(this.room);
		document.getElementsByClassName("answer")[0].style.display = "flex";
		console.log(this.room.roomNumber);
	}
}

const gameEngine = new GameEngine();
const main_button = document.getElementById("main_container").firstElementChild;

main_button.addEventListener("click", function (e) {
	gameEngine.startGame();
});

// async function ready() {
// 	document.getElementsByClassName("answer")[0].style.display = "none";
// 	console.log(gameEngine);
// }

// document.addEventListener("DOMContentLoaded", ready);
