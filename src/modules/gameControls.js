import { generateTable, dispatchEvents } from './generateTable';

import {
  patterns,
  startPauseButton,
  resetButton,
  incrementButton,
  timerOutput,
  sizeRangeSlider,
  speedRangeSlider
} from './global/globals';

/*

	timer logic 

*/

let time = 0;
let running = 0;
let speed = 800;

const startPauseTimer = () => {
  if (running == 0) {
    running = 1;
    incrementTimer();
    startPauseButton.innerHTML = 'PAUSE';
  } else {
    running = 0;
    startPauseButton.innerHTML = 'RESUME';
  }
}

const resetTimer = () => {
  running = 0;
  time = 0;
  startPauseButton.innerHTML = 'START';
  timerOutput.innerHTML = '0';
}

function incrementTimer(bool) {

  if (bool) { // increment button 
    time = time + 1;
    timerOutput.innerHTML = time;
    dispatchEvents();
  } else {
    if (running == 1) {
      setTimeout(function () {
        time++;
        timerOutput.innerHTML = time;
        incrementTimer();
        dispatchEvents();
      }, speed);
    } else if (running == 0 && time == 0) {
      timerOutput.innerHTML = '0';
    }
  }
}

/*

	game controls 

*/

let pattern = patterns.value;
let tableSize = null;

patterns.addEventListener("change", function () {
  pattern = patterns.value;
  generateTable(tableSize, pattern);
});

startPauseButton.addEventListener('click', function () {
  startPauseTimer();
});

resetButton.addEventListener('click', function () {
  resetTimer();
});

incrementButton.addEventListener('click', function () {
  incrementTimer(true);
});

sizeRangeSlider.addEventListener('change', function () {
  tableSize = Number(this.value) * .1;
  generateTable(tableSize, pattern);
});

speedRangeSlider.addEventListener('change', function () {
  speed = 1000 - Number(this.value);
});

export { };
