'use strict';
console.log('Minesweeper');
// 💣 🚩 ❌
// The model
var gBoard = [];
var gTimerInterval;
var gMines;
var gCountCells;
var gCountFlags;
// This is an object by which the board size is set
// (in this case:4*4), and how many mines to put
var gLevel = {
    SIZE: [4, 6, 8],
    MINES: [2, 5, 15]
};

function timer() {
    var time = 0;
    var elTimer = document.querySelector('.timer');
    var timerInterval = setInterval(function () {
        time += 1;
        elTimer.innerHTML = (time / 10).toFixed(3);
    }, 100)
    return timerInterval;
}

// This is an object in which you can keep and update the current
// state:
// isGameOn – boolean, when true we let the user play
// shownCount: how many cells are shown
// markedCount: how many cells are marked (with a flag)
// secsPassed: how many seconds passed
var gState = {
    isGameOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// This is called when page loads
function initGame(a, b) {
    resetGame();
    gBoard = buildBoard(a, b);
    renderBoard(gBoard);
}

function isBomb(i, j) {
    if (gBoard[i][j] === "💣") {
        return true;
    } else return false;
}

// Builds the board by setting mines at random locations, and
// then calling the setMinesNeighborsCount() Then return the created board.
//To do: add game level with SIZE and MINES

function buildBoard(SIZE, MINES) {
    var board = [];
    gMines = MINES;
    var count = 0;
    var num1;
    var num2;
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = '';
        }
    }
    while (MINES > 0) {
        num1 = getRandomInt(0, SIZE);
        num2 = getRandomInt(0, SIZE);
        if (board[num1][num2] !== '💣') {
            board[num1][num2] = '💣';
            MINES--;
        }
    }

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            count = setMinesNeighborsCount(board, i, j);
            if (count !== 0) board[i][j] = count;
        }
    }
    console.table(board);
    renderBoard(board);
    return board;
}

// cancels the right click menu function
window.oncontextmenu = function () {
    return false;     // cancel default menu
}

function mouseDown(e, elCell, i, j) {
    e = e || window.event;
    switch (e.which) {
        case 1: cellClicked(elCell, i, j); break;
        case 2: console.log(); break;
        case 3: cellMarked(elCell); break;
    }
}

function renderBoard(board) {
    var elMineBoard = document.querySelector('.mine-board');
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var selector = '.cell-' + i + '-' + j;
            strHtml += '<td onmousedown="mouseDown(event,this,' + i + ',' + j + ');" id="' + selector + '" class = "testclass"> </td>';
        }
        strHtml += '</tr>';
    }
    elMineBoard.innerHTML = strHtml;
    return board;
}

// Sets mines-count to neighbours
function setMinesNeighborsCount(board, rowIdx, colIdx) {
    var neigboursCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // If middle cell or out of mat - continue;
            if ((i === rowIdx && j === colIdx) || (j < 0 || j >= board[i].length)) continue;
            if (board[rowIdx][colIdx] === '💣') continue;
            if (board[i][j] === '💣') neigboursCount++;

            // if (board[i][j]) neigboursCount++;
        }
    }
    return neigboursCount;
}

// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    var bomb = isBomb(i, j);
    if (bomb === false) {
       if (gBoard[i][j] === '') expandShown(elCell, i, j);
        var strHtml = '';
        var elMineBoard = document.querySelector('.mine-board');

        strHtml += '<td> ' + gBoard[i][j] +
            '</td>';
        elCell.innerHTML = strHtml;
        elCell.classList.add('clicked');
        var elOpened = document.querySelector('.opened');
        gCountCells = document.querySelectorAll ('.clicked');
        gCountCells = gCountCells.length;
        elOpened.innerHTML = gCountCells;
        checkGameOver();
        if (gState.secsPassed === 0) {
            gTimerInterval = timer()
            gState.secsPassed++;
        }
    } else {
        var strHtml = '';
        var elMineBoard = document.querySelector('.mine-board');
        strHtml += '<td> ' + gBoard[i][j] +
            '</td>';
        elCell.innerHTML = strHtml;
        var elLost = document.querySelector('.lose');
        elLost.innerHTML = 'You Lost! Try Again';
        clearInterval(gTimerInterval);
    }
}

// Called on right click to mark a cell as suspected to have a mine
function cellMarked(elCell) {
    if (elCell.classList.value !== 'testclass clicked'){
    if (elCell.classList.value === "testclass marked") {
        console.log('I am marked already please remove me');
        elCell.classList.remove('marked');
        
    } else elCell.classList.add('marked');
    
    var elFlagged = document.querySelector('.flagged');
    gCountFlags = document.querySelectorAll ('.marked');
    gCountFlags = gCountFlags.length;
    elFlagged.innerHTML = gCountFlags;
    checkGameOver();
}
}

// Game ends when all mines are marked and all the other cells are shown
function checkGameOver() {
        // gCountCells = document.querySelectorAll ('.clicked');
        // gCountCells = gCountCells.length;
        // gCountFlags = document.querySelectorAll ('.marked');
        // gCountFlags = gCountFlags.length;
    if (gBoard.length ** 2 - gMines === gCountCells && gCountFlags === gMines) {
        var elWin = document.querySelector('.win');
        elWin.innerHTML = 'You Won! Try an harder level';
        clearInterval(gTimerInterval);
    }
}

function resetGame() {
    gBoard = [];
    gState.isGameOn = true;
    gState.markedCount = 0;
    gState.shownCount = 0;
    gState.secsPassed = 0;
    clearInterval(gTimerInterval);
    var elTimer = document.querySelector('.timer');
    var elFlagged = document.querySelector('.flagged');
    var elOpened = document.querySelector('.opened');
    var elMineBoard = document.querySelector('.mine-board');
    var elWin = document.querySelector('.win');
    var elLose = document.querySelector('.lose');
    elTimer.innerHTML = '';
    elFlagged.innerHTML = '';
    elOpened.innerHTML = '';
    elMineBoard.innerHTML = '';
    elWin.innerHTML = '';
    elLose.innerHTML = '';
    gCountCells = 0;
    gCountFlags = 0;
}

// When user clicks an empty place (0 neighbors), we need to open not
// only that cell, but also its neighbors.
function expandShown(elCell, rowIdx, colIdx) {
    var elMineBoard = document.querySelector('.mine-board');
    var strHtml = '';
        for (var i = rowIdx - 2; i <= rowIdx + 2; i++) {
            if (!(i >= 0 && i < gBoard.length)) continue;
            for (var j = colIdx - 2; j <= colIdx + 2; j++) {
                // If middle cell or out of mat - continue;
                if ((i === rowIdx && j === colIdx) || (j < 0 || j >= gBoard[i].length)) continue;
                if (gBoard[i][j] === '💣') continue;
                var strHtml = '';
                var selector = '.cell-' + i + '-' + j;
                var elMineBoard = document.getElementById(''+ selector +'');
                if (elMineBoard.classList !== 'testclass clicked') {
                elMineBoard.classList.add('clicked');
            }   
                
                strHtml += '<td> ' + gBoard[i][j] +
                '</td>';
                elMineBoard.innerHTML = strHtml;
                
            }
        }
        
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}