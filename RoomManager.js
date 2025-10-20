class RoomManager {
	container = document.getElementById("main_container");

	async load_room(room_number) {
		let room_data = await this.fetch_room(room_number);
		console.log("ROOM DATA", typeof room_data, room_data);
		this.container.innerHTML = room_data;
	}

	async fetch_room(room) {
		const html_file = `./rooms/room_${room}/room_${room}.html`;
		return fetch(html_file).then((response) => {
			return response.text();
		});
	}
}

let Manager = new RoomManager();
Manager.load_room(1);
