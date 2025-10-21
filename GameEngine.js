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

		console.log("ANSWER", answer);
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
		document.getElementById("question").innerHTML = this.enigma.getQuestionById(
			this.room.get_current_room()
		).question;
	}

	changePage() {
		this.resetInput();
		this.room.increment_room();
		this.room.load_room();
		this.updateQuestion();
	}

	nextPage() {
		if (this.room.get_current_room() > 0) {
			this.checkAnswer().then((response) => {
				if (response) {
					this.changePage();
				} else {
					this.displayErrorMessage();
				}
			});
		} else {
			this.changePage();
		}
	}

	restartGame() {
		sessionStorage.removeItem("currentRoomNumber");
		document.getElementById("answer_container").style.display = "none";
		this.room.load_room(0);
	}
}

const gameEngine = new GameEngine();
gameEngine.room.load_room();

const restart_button = document.getElementById("restart");

document.getElementById("main").addEventListener("click", function (event) {
	if (event.target.classList.contains("next_btn")) {
		console.log(document.getElementById("answer").value);
		gameEngine.nextPage();
	}
});

restart_button.addEventListener("click", function (e) {
	gameEngine.restartGame();
});
