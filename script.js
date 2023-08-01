const container = document.querySelector(".container");
const gridBuilder = document.querySelector("#gridBuilder");
gridBuilder.addEventListener("click", resetGrid);
gridSize.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		resetGrid();
	}
});

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
let selectedColor = document.getElementById("colorPicker");
selectedColor = "#990000";

function setCurrentColor(newColor) {
	selectedColor = newColor;
}

let eraseMode = false;
function toggleEraseMode() {
	if (eraseMode) {
		eraseMode = false;
	} else {
		eraseMode = true;
	}
}
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", toggleEraseMode);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(size = 16) {
	container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	for (let i = 0; i < size * size; i++) {
		const gridElement = document.createElement("div");
		gridElement.classList.add("gridCells");
		gridElement.addEventListener("mouseenter", hoverOver);
		gridElement.addEventListener("mouseleave", hoverEnd);
		gridElement.addEventListener("mouseover", addColor);
		container.appendChild(gridElement);
	}
}

function resetGrid() {
	container.innerHTML = "";
	let gridSize = document.getElementById("gridSize").value;
	if (gridSize > 100) {
		gridSize = 100;
	}
	createGrid(gridSize);
}

function addColor(e) {
	if (eraseMode && mouseDown) {
		removeColor(e);
	} else if (mouseDown) {
		e.target.style.backgroundColor = selectedColor;
		e.target.classList.add("colored");
	}
}

function removeColor(e) {
		e.target.style.backgroundColor = "rgb(29, 29, 29)";
		e.target.classList.remove("colored");
	}

function hoverOver(e) {
	e.target.style.backgroundColor = "white";
}

function hoverEnd(e) {
	if (e.target.classList.contains("colored")) {
		e.target.style.backgroundColor = selectedColor;
	} else {
		e.target.style.backgroundColor = "rgb(29, 29, 29)";
	}
}

createGrid();
