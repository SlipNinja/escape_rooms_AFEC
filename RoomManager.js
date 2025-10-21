export class RoomManager {
	container = document.getElementById("main_container");

	get_current_room() {
		if (!sessionStorage.getItem("currentRoomNumber")) sessionStorage.setItem("currentRoomNumber", 0);

		return parseInt(sessionStorage.getItem("currentRoomNumber"));
	}

	increment_room() {
		let currRoom = parseInt(sessionStorage.getItem("currentRoomNumber"));
		sessionStorage.setItem("currentRoomNumber", currRoom + 1);
	}

	notLandingPage() {
		return this.get_current_room() > 0;
	}

	async load_room(room_number = this.get_current_room()) {
		this.container.innerHTML = await this.fetch_room_html(room_number);

		if (this.notLandingPage()) {
			this.replace_js(room_number);
			this.replace_css(room_number);
			document.getElementById("answer_container").style.display = "flex";
		}
	}

	async fetch_room_html(room) {
		let html_file;
		if (room > 0) {
			html_file = `rooms/room_${room}/room_${room}.html`;
		} else {
			html_file = `landing.html`;
		}

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
