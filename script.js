const board = document.getElementById("sudoku-board");

// Initialize the 9x9 grid
for (let i = 0; i < 81; i++) {
    let cell = document.createElement("input");
    cell.setAttribute("type", "number");
    cell.setAttribute("min", "1");
    cell.setAttribute("max", "9");
    board.appendChild(cell);
}

function getBoard() {
    let cells = board.querySelectorAll("input");
    let grid = [];
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            let val = cells[i * 9 + j].value;
            grid[i][j] = val ? parseInt(val) : 0;
        }
    }
    return grid;
}

function setBoard(grid) {
    let cells = board.querySelectorAll("input");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells[i * 9 + j].value = grid[i][j] === 0 ? "" : grid[i][j];
        }
    }
}

function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) return false;
    }
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}

function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) return true;
                        grid[row][col] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    let cells = board.querySelectorAll("input");
    let grid = getBoard();
    
    // Track empty cells to highlight AI's work
    let emptyIndices = [];
    cells.forEach((cell, idx) => {
        if (cell.value === "") emptyIndices.push(idx);
        cell.classList.remove("solved");
    });

    if (solve(grid)) {
        setBoard(grid);
        emptyIndices.forEach(idx => cells[idx].classList.add("solved"));
    } else {
        alert("No solution exists!");
    }
}

function clearBoard() {
    let cells = board.querySelectorAll("input");
    cells.forEach(cell => {
        cell.value = "";
        cell.classList.remove("solved");
    });
}

// Event Listeners
document.getElementById("solve-btn").addEventListener("click", solveSudoku);
document.getElementById("clear-btn").addEventListener("click", clearBoard);