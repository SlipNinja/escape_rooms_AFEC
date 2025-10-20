class RoomManager {
	container = document.getElementById("main_container");

	async load_room(room_number) {
		let room_data = await this.fetch_room_html(room_number);
		this.container.innerHTML = room_data;
		this.replace_css(room_number);
	}

	async fetch_room_html(room) {
		const html_file = `./rooms/room_${room}/room_${room}.html`;
		return fetch(html_file).then((response) => {
			return response.text();
		});
	}

	replace_css(room) {
		const html_file = `./rooms/room_${room}/room_${room}.css`;
		const css_link = document.getElementsByTagName("link")[0];
		css_link.href = html_file;
	}
}

let Manager = new RoomManager();
Manager.load_room(1);
