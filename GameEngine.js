import { RoomManager } from "./RoomManager.js";

class GameEngine {
	room;

	constructor() {
		this.room = new RoomManager();
	}

	async checkAnswer() {
		const answer = document.getElementById("answer").value;

		let currentRoom = this.room.get_current_room();
		const response = await fetch(`rooms/room_${currentRoom}/questions.json`);
		const data = await response.json();

		console.log(answer, data.answer);
		return answer == data.answer;
	}

	update() {
		let _this = this;
		this.checkAnswer().then(function (response) {
			if (response) {
				_this.validateInput();
				_this.room.increment_room();
				_this.room.load_room(_this.room.get_current_room());
			} else {
				_this.displayErrorMessage();
			}
		});
	}

	displayErrorMessage() {
		document.getElementById("error").innerHTML = "Wrong Answer! Try Again";
	}

	validateInput() {
		document.getElementById("error").innerHTML = "";
		document.getElementById("answer").value = "";
	}

	startGame() {
		document.getElementsByClassName("answer")[0].style.display = "flex";

		this.room.increment_room();
		this.room.load_room(this.room.get_current_room());
	}

	nextPage() {
		this.validateInput();
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
	gameEngine.checkAnswer().then(function (response) {
		if (response) {
			gameEngine.validateInput();
			gameEngine.room.increment_room();
			gameEngine.room.load_room(gameEngine.room.get_current_room());
		} else {
			gameEngine.displayErrorMessage();
		}
	});
});
