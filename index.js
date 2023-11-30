let rows = 25;
let cols = 70;

let isPlaying = false;

let grid = new Array(rows);
let nextGrid = new Array(rows);

let timer;
let reproTime = 100;

function initializeGrids () {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    nextGrid[i] = new Array(cols);
  }
};

function resetGrids() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      nextGrid[i][j] = 0;
    }
  }
}

function copyAndResetGrid() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = nextGrid[i][j];
      nextGrid[i][j] = 0;
    }
  }
}
function init() {
  createTable();
  initializeGrids();
  resetGrids();
}

function createTable() {
  var gridContainer = document.getElementById("grid-container");
  if (!gridContainer) {
    console.error("Hmm, miss the core of the UI program i.e no div");
  }
  var table = document.createElement("table");

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", i + "_" + j);
      cell.setAttribute("class", "dead");
      cell.onclick = changeCellState;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

function changeCellState() {
  const [row, col] = this.id.split("_");
  let classes = this.getAttribute("class");
  if (classes.includes("alive")) {
    this.setAttribute("class", "dead");
    grid[row][col] = 0;
  } else {
    this.setAttribute("class", "alive");
    grid[row][col] = 1;
  }
}

function initializeButtons() {
  const startBtn = document.getElementById("start-btn");
  const clearBtn = document.getElementById("clear-btn");
  const randomBtn = document.getElementById("random-btn");

  startBtn.onclick = startBtnHandler;
  clearBtn.onclick = clearBtnHandler;
  randomBtn.onclick = randomBtnHandler; 
}

function startBtnHandler(){
  if (isPlaying) {
    this.innerHtml = "Continue";
    isPlaying = false;
    // Stop the timer associated with the game loop
    clearTimeout(timer);
  }else{
    this.innerHtml = "Pause"
    isPlaying = true;
    play();
  }
}
function clearBtnHandler(){}
function randomBtnHandler(){}

function play() {
  changeNextGenState();
  if(isPlaying) {
    timer = setTimeout(play, reproductionTime);
  }
}
function changeNextGenState() {
  for(let i; i<rows; i++) {
    for(let j; j<rows; j++) {
      applyGameRules(i,j);
    }
  } 
}
function applyGameRules(row, column) {
  const neighbors = countCellAliveNeighbors(row, column)
  if (grid[i][j]){}
}

function getNeighbors(row, col) {
  const neighbors = [];
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i < rows && j < cols) {
        neighbors.push([i, j]);
      }
    }
  }
  return neighbors;
}

function countCellAliveNeighbors(row, col) {
  const neighbors = getNeighbors(row, col)
  let aliveNeighbors = 0;
  for (const [i,j] of neighbors) {
    const cell = document.getElementById(i + "_" + j);
    if(cell.classList.contains("alive")) {
      aliveNeighbors++;
    }
  }
  return aliveNeighbors;
}

window.onload = init;