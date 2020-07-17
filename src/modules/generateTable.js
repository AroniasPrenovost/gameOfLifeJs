import { generatePatternCoordinates } from './mapPatterns';

let tableMap = [];
let cellIds = [];
let deadCellIds = [];

function dispatchEvents() {

	let event = new Event('change');
	document.querySelectorAll('.cell').forEach(function (cell) {
		document.getElementById(cell.id).dispatchEvent(event);
	});

	// update tableMap with modified pieces
	for (let ii = cellIds.length - 1; ii >= 0; ii--) {
		tableMap[cellIds[ii][0]][cellIds[ii][1]].life = 'true';
	}
	for (let xx = deadCellIds.length - 1; xx >= 0; xx--) {
		tableMap[deadCellIds[xx][0]][deadCellIds[xx][1]].life = 'false';
	}

	cellIds = [];
	deadCellIds = [];
}

const colorDefault = 'rgb(149, 165, 166)';
const colorLife = 'rgb(44, 62, 80)';

const generateTable = (intArg, patternStr) => {

	/* 
	
		get coordinates to load pattern into table  

	*/

	tableMap = [];

	let baseNumber = 60;
	for (let i = 0; i < intArg; i++) {
		baseNumber += 20;
	}

	let patternCoordinates = generatePatternCoordinates(baseNumber, patternStr);
	let coordinates = patternCoordinates.coordinates;

	/*

		set # of cells per row

	*/

	let myTableDiv = document.getElementById('myDynamicTable');
	let table = document.createElement('TABLE');
	let tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);
	table.border = '1';

	let tdSize = 4;
	let cellCount = 0;

	for (let i = 0; i < baseNumber; i++) {

		let tr = document.createElement('TR');
		tableBody.appendChild(tr);

		for (let j = 0; j < baseNumber; j++) {

			tableMap.push([i]);

			if (j === 0 || i === 0 && j !== 0) continue;

			if (i !== 0 && j !== 0) {

				let td = document.createElement('TD');
				td.classList.add('cell');
				td.style.backgroundColor = colorDefault;

				td.width = String(tdSize).concat('px');
				td.height = String(tdSize).concat('px');
				td.setAttribute('value', cellCount);

				// correlate element data properties with tableMap
				let elementId = `${i}-${j}`;
				td.id = elementId;

				td.dataset.row = i;
				td.dataset.rowPos = j;
				td.dataset.life = false;

				// load pattern
				if (coordinates.indexOf(elementId) > -1) {
					td.style.backgroundColor = colorLife;
					td.setAttribute('data-life', true);
					td.dataset.life = true;
				}

				tableMap[i].push({
					life: td.dataset.life,
					row: i,
					rowPos: j,
					id: td.id
				});

				/*
		
					 toggle cells by programmatic event, calculate 'life' based on surrounding cells 

				*/

				td.onchange = function () {

					// update tableMap values based on these positions
					let row = Number(this.dataset.row);
					let rowPos = Number(this.dataset.rowPos);

					let neighbors = 0;
					let max = baseNumber - 1; // represents max row length || max # of rows

					// check left 
					if (rowPos !== 1) {
						if (tableMap[row][rowPos - 1].life === 'true') neighbors++;
					}

					// check right 
					if (rowPos !== max) {
						if (tableMap[row][rowPos + 1].life === 'true') neighbors++;
					}

					// check above
					// directly above 
					if (row !== 1) {

						if (tableMap[row - 1][rowPos].life === 'true') neighbors++;

						// above left
						if (rowPos >= 2) {
							if (tableMap[row - 1][rowPos - 1].life === 'true') neighbors++;
						}

						// above right 
						if (rowPos <= (max - 1)) {
							if (tableMap[row - 1][rowPos + 1].life === 'true') neighbors++;
						}
					}

					// check below 
					if (row !== max) {

						// directly below 
						if (tableMap[row + 1][rowPos].life === 'true') neighbors++;

						// below right 
						if (rowPos <= (max - 1)) {
							if (tableMap[row + 1][rowPos + 1].life === 'true') neighbors++;
						}

						// below left 
						if (rowPos > 1) {
							if (tableMap[row + 1][rowPos - 1].life === 'true') neighbors++;
						}
					}

					// check cell life && position
					let cell_is_populated = JSON.parse(this.dataset.life.toLowerCase());

					let flag = true;

					if (!cell_is_populated && flag) {
						flag = false;
						if (neighbors === 3) { // populate
							this.style.backgroundColor = colorLife;
							this.setAttribute('data-life', true);
							cellIds.push(this.id.split('-'));
						}
					}

					else if (cell_is_populated && flag) {
						if (neighbors < 2) { // dies by solitude
							this.style.backgroundColor = colorDefault;
							this.setAttribute('data-life', false);
							deadCellIds.push(this.id.split('-'));
						}

						if (neighbors === 2) { // survives 
							this.style.backgroundColor = colorLife;
							this.setAttribute('data-life', true);
							cellIds.push(this.id.split('-'));
						}

						if (neighbors === 3) { // survives 
							this.style.backgroundColor = colorLife;
							this.setAttribute('data-life', true);
							cellIds.push(this.id.split('-'));
						}

						if (neighbors > 3) { // dies by overpopulation
							this.style.backgroundColor = colorDefault;
							this.setAttribute('data-life', false);
							deadCellIds.push(this.id.split('-'));
						}
					}
				}

				// manually update grid - toggle cell 'life' on click
				td.onclick = function () {

					// check cell life + position
					let cell_is_populated = JSON.parse(this.dataset.life.toLowerCase());
					let row = Number(this.dataset.row);
					let rowPos = Number(this.dataset.rowPos);

					if (cell_is_populated) {
						td.style.backgroundColor = colorDefault;
						this.setAttribute('data-life', false);
						tableMap[row][rowPos].life = 'false';
					}
					else if (!cell_is_populated) {
						td.style.backgroundColor = colorLife;
						this.setAttribute('data-life', true);
						tableMap[row][rowPos].life = 'true';
					}
				};

				cellCount++;
				tr.appendChild(td);
			}
		}
	}

	if (myTableDiv.lastElementChild) {
		myTableDiv.removeChild(myTableDiv.lastElementChild);
	}

	myTableDiv.appendChild(table);
}

export { generateTable, dispatchEvents };
