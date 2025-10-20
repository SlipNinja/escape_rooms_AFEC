import GameEngine from "./GameEngine.js";

let gameEngine;
console.log("TEST");

async function ready() {
	gameEngine = new GameEngine();

	document.getElementsByClassName("answer")[0].style.display = "none";

	console.log(gameEngine);
}

document.addEventListener("DOMContentLoaded", ready);
