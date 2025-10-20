class GameEngine {
	roomNumber = 1;
	questions = null;

	constructor() {}

	async getRoomQuestion() {
		return fetch(`rooms/room_${this.roomNumber}/questions.json`).then((r) => {
			if (r.ok) {
				console.log("Get Questions");
				return r.json();
			} else {
				throw new Error("Erreur serveur", { cause: r });
			}
		});
	}

	async checkAnswer(val) {
		console.log("Check answers");
		this.getRoomQuestion().then((response) => {
			this.questions = response;
			console.log("CHECK QUESTION ", this.questions);
			if (val == this.questions.answer) {
				console.log("good answer");
			} else {
				console.log("bad answer");
			}
		});
	}
}
