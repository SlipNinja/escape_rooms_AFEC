<<<<<<< HEAD
var btns = [];
=======
if (typeof btns === undefined) {
	let btns = [];
} else {
	btns = [];
}
>>>>>>> 88d9b048bd468c22d85a1da2a2d4cdc9008ea1f7

function add_btn() {
	if (btns.length < 30) {
		const new_button = document.createElement("button");
		new_button.textContent = "Try me, duh";
		new_button.onclick = add_btn;
		let container = document.querySelector(".room");
		container.appendChild(new_button);
		btns.push(new_button);
		if (btns.length == 26) {
			new_button.textContent = "St4ckOv3rfl0w";
			new_button.id = "btn_answer";
		}
	}
}

add_btn();
