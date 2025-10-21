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

		return answer == this.enigma.getQuestionById(this.room.get_current_room()).answer;
	}

	displayErrorMessage() {
		document.getElementById("error").innerHTML = "Wrong Answer! Try Again";
	}

	resetInput() {
		document.getElementById("error").innerHTML = "";
		document.getElementById("answer").value = "";
	}

	updateQuestion() {
		document.getElementById("question").innerHTML = this.enigma.getQuestionById(this.room.get_current_room()).question;
	}

	nextPage() {
		debugger;
		if (this.room.get_current_room() > 0) {
			console.log(">0");
			this.checkAnswer().then((response) => {
				if (response) {
					this.resetInput();
					this.room.increment_room();
					this.room.load_room();
					this.updateQuestion();
				} else {
					this.displayErrorMessage();
				}
			});
		} else {
			console.log("0");

			this.resetInput();
			this.room.increment_room();
			this.room.load_room();
			this.updateQuestion();
		}
	}

	restartGame() {
		sessionStorage.removeItem("currentRoomNumber");
		document.getElementById("answer_container").style.display = "none";
		this.room.load_room(0);
	}
}

const gameEngine = new GameEngine();
const restart_button = document.getElementById("restart");

document.getElementById("main").addEventListener("click", function (event) {
	if (event.target.classList.contains("next_btn")) {
		gameEngine.nextPage();
	}
});

restart_button.addEventListener("click", function (e) {
	gameEngine.restartGame();
});
