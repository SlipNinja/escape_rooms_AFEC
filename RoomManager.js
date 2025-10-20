class RoomManager {
	container = document.getElementById("main_container");

	load_room(room) {
		let room_data = this.fetch_room();
		room_data.parent = this.container;
	}

	fetch_room() {
		fetch("./rooms/room_1/room_1.html")
			.then((response) => {
				// When the page is loaded convert it to text
				return response.text();
			})
			.then((html) => {
				// Initialize the DOM parser
				const parser = new DOMParser();

				// Parse the text
				const doc = parser.parseFromString(html, "text/html");

				// You can now even select part of that html as you would in the regular DOM
				// Example:
				// const docArticle = doc.querySelector('article').innerHTML

				console.log(doc);
				console.log(doc.querySelector(".content"));
			})
			.catch((error) => {
				console.error("Failed to fetch page: ", error);
			});
	}
}

let Manager = new RoomManager();
Manager.load_room();
