import * as path from "./path.js";
import * as id from "./id.js";

export function populateList(data, handleClick) {
	const container = document.getElementById(id.listContainer);
	container.innerHTML = "";

	const itemsArray = Object.keys(data).map((key) => ({
		key: key,
		...data[key],
	}));
	itemsArray.sort((a, b) => a.n.localeCompare(b.n));

	itemsArray.forEach((item) => {
		const listItem = document.createElement("div");
		listItem.className = "list-item";
		listItem.addEventListener("click", () => handleClick(item.key));
		listItem.id = item.key;
		listItem.setAttribute("data-placement", getPlacementFromNumber(item.u));

		// Type icon
		const placement = getPlacementFromNumber(item.u);
		const leftImage = document.createElement("img");
		leftImage.src = `images/${placement}.png`;
		leftImage.alt = `${item.n} left image`;
		leftImage.className = "left-image";

		// Name
		const nameSpan = document.createElement("span");
		nameSpan.textContent = item.n;
		nameSpan.className = "item-name";

		// Image
		const image = document.createElement("img");
		let imageNo = item.g.split(",")[0];
		image.src = path.getHatImage(imageNo);
		image.alt = `${item.n} image`;
		image.className = "item-image";

		listItem.appendChild(leftImage);
		listItem.appendChild(nameSpan);
		listItem.appendChild(image);
		container.appendChild(listItem);
	});
}

export function getPlacementFromNumber(u) {
	if (u == "1") {
		return id.head;
	} else if (u == "2") {
		return id.mouth;
	} else if (u == "11") {
		return id.object;
	}
	return id.belly;
}

export function updateList() {
	const listItems = document.querySelectorAll(".list-item");
	listItems.forEach((item) => {
		const placement = item.dataset.placement;
		const name = item.querySelector(".item-name").textContent.toLowerCase();

		if (name.includes(window.searchText) && window.shown[placement]) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
}
