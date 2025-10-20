class RoomManager {
	container = document.getElementById("main_container");
	current_room = 1;

	get_current_room() {
		return this.current_room;
	}

	increment_room() {
		this.current_room++;
	}

	async load_room(room_number = this.current_room) {
		this.container.innerHTML = await this.fetch_room_html(room_number);
		this.replace_js(room_number);
		this.replace_css(room_number);
	}

	async fetch_room_html(room) {
		const html_file = `rooms/room_${room}/room_${room}.html`;
		return fetch(html_file).then((response) => {
			return response.text();
		});
	}

	replace_css(room) {
		const html_file = `rooms/room_${room}/room_${room}.css`;
		const css_link = document.querySelector("link.replaceable");
		css_link.href = html_file;
	}

	replace_js(room) {
		const js_file = `rooms/room_${room}/room_${room}.js`;
		const js_script = document.querySelector("script.replaceable");
		js_script.remove();

		const new_script = document.createElement("script");
		new_script.src = js_file;
		new_script.type = "text/javascript";
		new_script.classList = "replaceable";

		document.head.appendChild(new_script);
	}
}
