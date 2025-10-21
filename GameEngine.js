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

	async getQuestion() {
		let currentRoom = this.room.get_current_room();
		const response = await fetch(`rooms/room_${currentRoom}/questions.json`);
		const data = await response.json();

		return data;
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

	// startGame() {
	// 	document.getElementsByClassName("answer")[0].style.display = "flex";

	// 	this.room.increment_room();
	// 	this.room.load_room(this.room.get_current_room());
	// }

	nextPage() {
		//debugger;
		if (this.room.get_current_room()) {
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
		} else {
			this.room.increment_room();
			this.room.load_room(this.room.get_current_room());
			document.getElementsByClassName("answer")[0].style.display = "flex";
		}
	}
}

const gameEngine = new GameEngine();
//const main_button = document.getElementById("main_container").firstElementChild;
const next_buttons = document.getElementsByClassName("next_btn");
//document.getElementsByClassName("answer")[0].style.display = "none";

// // Main button
// main_button.addEventListener("click", function (e) {
// 	gameEngine.startGame();
// });

// Validation button

for (var i = 0; i < next_buttons.length; i++) {
	next_buttons[i].addEventListener("click", function (e) {
		gameEngine.nextPage();
	});
}
// next_button.addEventListener("click", function (e) {
// 	gameEngine.nextPage();
// 	// gameEngine.checkAnswer().then(function (response) {
// 	// 	if (response) {
// 	// 		gameEngine.validateInput();
// 	// 		gameEngine.room.increment_room();
// 	// 		gameEngine.room.load_room(gameEngine.room.get_current_room());
// 	// 	} else {
// 	// 		gameEngine.displayErrorMessage();
// 	// 	}
// 	// });
// });
