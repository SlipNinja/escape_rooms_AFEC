const btns = [];

function add_btn() {
	if (btns.length < 30) {
		const new_button = document.createElement("button");
		new_button.textContent = "Try me, duh";
		new_button.onclick = arguments.callee;
		const container = document.querySelector(".room");
		container.appendChild(new_button);
		btns.push(new_button);
		if (btns.length == 26) {
			new_button.textContent = "St4ckOv3rfl0w";
			new_button.id = "answer";
		}
	}
}

add_btn();
