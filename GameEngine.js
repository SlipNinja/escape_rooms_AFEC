class GameEngine {
	roomNumber = 0;
	questions = null;

	constructor(roomNumber) {
		this.roomNumber = roomNumber;
	}

	getRoomQuestion() {
		fetch("rooms/room_" + this.roomNumber + "/questions.json", {
			headers: {
				Accept: "application/json",
			},
		})
			.then((r) => {
				if (r.ok) {
					return r.json();
				} else {
					throw new Error("Erreur serveur", { cause: r });
				}
			})
			.then((questions) => {
				this.questions = questions;
				return this;
			})
			.catch((e) => {
				console.error("Une erreur est survenue", e);
			});
	}

	checkAnswer(val) {
		this.getRoomQuestion();
		console.log("aaaa" + this.roomNumber);
		if (val == this.questions.answer) {
			console.log("good answer");
		} else {
			console.log("bad answer");
		}
	}
}
