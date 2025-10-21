import { RoomManager } from "./RoomManager.js";
import { EnigmaManager } from "./EnigmaManager.js";

class GameEngine {
	room;
	enigma;

	constructor() {
		this.room = new RoomManager();
		this.enigma = new EnigmaManager();
	}

	async checkAnswer() {
		const answer = document.getElementById("answer").value;

		let currentRoom = this.room.get_current_room();

		return answer == this.enigma.getQuestionById(currentRoom).answer;
	}

	displayErrorMessage() {
		document.getElementById("error").innerHTML = "Wrong Answer! Try Again";
	}

	resetInput() {
		document.getElementById("error").innerHTML = "";
		document.getElementById("answer").value = "";
	}

	updateQuestion() {
		document.getElementById("question").innerHTML = this.enigma.getQuestionById(
			this.room.get_current_room()
		).question;
	}

	nextPage() {
		if (this.room.get_current_room()) {
			this.checkAnswer().then((response) => {
				if (response) {
					this.resetInput();
					this.room.increment_room();
					this.room.load_room(this.room.get_current_room());
					this.updateQuestion();
				} else {
					this.displayErrorMessage();
				}
			});
		} else {
			this.room.increment_room();
			this.room.load_room(this.room.get_current_room());
			this.updateQuestion();
			document.getElementsByClassName("answer")[0].style.display = "flex";
		}
	}
}

const gameEngine = new GameEngine();
const next_buttons = document.getElementsByClassName("next_btn");

for (const btn of next_buttons) {
	btn.addEventListener("click", function (e) {
		gameEngine.nextPage();
	});
}

gameEngine.room.load_room(4);
