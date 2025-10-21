const hidden_btn = document.querySelector(".hidden_button");

function btn_clicked(e) {
	update_html();
	update_css();
}

function update_html() {
	document.querySelector(".secret_text").innerHTML = "Something changed in &lt;head&gt;...";
	hidden_btn.remove();
}

function update_css() {
	const new_style = document.createElement("link");
	new_style.rel = "stylesheet";
	new_style.href = "rooms/room_5/secret.css";
	new_style.title = "elleEstOuLaPoulette";
	document.head.appendChild(new_style);
}

hidden_btn.addEventListener("click", (e) => {
	btn_clicked();
});
