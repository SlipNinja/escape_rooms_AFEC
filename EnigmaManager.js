export class EnigmaManager {
	questions = [];
	url = "questions.json";

	constructor() {
		this.questions = this.fetchQuestions();
	}

	async fetchQuestions() {
		try {
			const response = await fetch(this.url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			this.questions = data.questions;
			return this.questions;
		} catch (error) {
			console.error("Failed to fetch questions:", error);
			return [];
		}
	}

	getQuestionById(id) {
		return this.questions.find((q) => q.id === id);
	}
}
