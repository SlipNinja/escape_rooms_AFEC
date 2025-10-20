function add_btn() {
	const new_button = document.createElement("button");
	new_button.textContent = "I'm a new button !";
	const container = document.getElementById("main_container");
	container.appendChild(new_button);
	console.log("BUTTON ADDED");
}

add_btn();
