import * as setup from "./scripts/setup.js";
import * as list from "./scripts/list.js";
import * as id from "./scripts/id.js";

console.log("Person til at gøre hjemmesiden pænere søges");

window.hideThings = hideThings;

window.searchText = null;

document.addEventListener("DOMContentLoaded", async function () {
	window.data = await setup.getHatData();
	list.populateList(window.data, handleClick);

	const searchBar = document.getElementById(id.searchBar);
	searchBar.addEventListener("input", handleSearch);
});

function handleSearch(event) {
	const searchText = event.target.value.toLowerCase();
	window.searchText = searchText;
	const listItems = document.querySelectorAll(".list-item");

	// // A litte surprise
	// if (searchQuery == "unlock objects") {
	// 	skipObjects = false;
	// 	list.populateList(window.data, handleClick);
	// } else if (searchQuery == "lock objects") {
	// 	skipObjects = true;
	// 	list.populateList(window.data, handleClick);
	// }

	listItems.forEach((item) => {
		const name = item.querySelector(".item-name").textContent.toLowerCase();
		if (name.includes(searchText)) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
}

function hideThings(thing) {
	const listItems = document.querySelectorAll(".list-item");
	listItems.forEach((item) => {
		const placement = item.getAttribute("placement");
		if (placement === thing) {
			item.style.display = "none";
		} else {
			item.style.display = "flex";
		}
	});
}

function handleClick(hat_id) {
	const hat = window.data[hat_id];

	const element = document.getElementById(hat_id);

	// if (window.currentHats[placement] == 0) {
	// 	window.currentHats[placement] = hat_id;
	// 	element.style.backgroundColor = "yellow";
	// } else if (window.currentHats[placement] == hat_id) {
	// 	window.currentHats[placement] = 0;
	// 	element.style.backgroundColor = "";
	// } else {
	// 	let elementOld = document.getElementById(window.currentHats[placement]);
	// 	if (elementOld !== null) {
	// 		elementOld.style.backgroundColor = "";
	// 	}
	// 	window.currentHats[placement] = hat_id;
	// 	element.style.backgroundColor = "yellow";
	// }

	console.log(element);
}
