'use strict';
console.log('Sokoban Game');
// The model
var SIZE = 10;
var gBoard;

// i and j for the gamer
var gGamerPos = {
    i: 5,
    j: 5,
};

initGame();
// This is called when page loads 
function initGame() {
    createEmptyBoard();
    fillBoard();
    gBoard[2][4] = createSoko('target', '');
    gBoard[5][5] = createSoko('floor', 'player');
    gBoard[6][7] = createSoko('floor', 'box');
    gBoard[4][2] = createSoko('floor', 'box');
    renderBoard();
}

// Creates an empty board and updates the global board
function createEmptyBoard() {
    var board = [];
    for (var i = 0; i < SIZE - 1; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = '';
        }
    }

    gBoard = board;
    console.table(gBoard);
}

// fill the global board with outline and content
function fillBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (i === 0 || i === gBoard.length - 1 || j === 0 || j === gBoard[0].length - 1) { // if top,left,right,bottom line then this...
                gBoard[i][j] = createSoko('wall', '');
            } else { // if not border line then this...
                gBoard[i][j] = createSoko('floor', '');
            }
        }
    }
    console.table(gBoard);
}

function createSoko(type, element) {
    return {
        type: type,
        element: element,
    };
}

function createPlayer(element) {
    return {
        element: element,
    };
}

// Print the board as a table
function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var test = row[j];
            var cellContent = ''
            var cellTitle = null;
            var className = '';
            if (test.type === 'wall') {
                test.type = 'wall';
                className = 'wall';
            } else if (test.type === 'target') {
                test.type = 'target';
                className = 'target';
            } else {
                test.type = 'floor';
                className = 'floor';
            }
            if (gBoard[i][j].element === 'player') {
                className = 'player';
            }
            if (gBoard[i][j].element === 'box') {
                className = 'box';
            }
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td " id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class="    ' + className + '"></td>';
        }
        strHtml += '</tr>';
    }
    var elSokoBoard = document.querySelector('.soko-board');
    elSokoBoard.innerHTML = strHtml;
}

function createSoko(type, element) {
    return {
        type: type,
        element: element,
    };
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}

// Called when a cell (td) is clicked
function cellClicked(elCell) {
    var cellCoord = getCellCoord(elCell.id);
    movePiece(elCell);
    console.log(cellCoord);
}

// Game is over when all boxes are on targets
function checkGameOver() {

}

function isWall(toCoord) {
    if (gBoard[toCoord.i][toCoord.j].type === 'wall') {
        return true;
    } else return false;
}

function isBox(toCoord) {
    if (gBoard[toCoord.i][toCoord.j].element === 'box') {
        return true;
    } else return false;
}

function movePiece(elToCell) {
    var fromCoord = gGamerPos;
    var toCoord = getCellCoord(elToCell.id);
    if ((Math.abs(toCoord.i - fromCoord.i)) + (Math.abs(toCoord.j - fromCoord.j)) === 1) {
        if (!isWall(toCoord)) {
            // debugger;
            // if (gBoard[toCoord.i][toCoord.j].element === 'box') {
            //     gBoard[toCoord.i][toCoord.j].element = '';
            //     gBoard[toCoord.i][toCoord.j].element = 'box';
            // }
            gGamerPos = toCoord;
            // Update the Model
            gBoard[fromCoord.i][fromCoord.j].element = '';
            // gBoard[toCoord.i][toCoord.j] = piece;
            gBoard[toCoord.i][toCoord.j].element = 'player';
            // Update the DOM
            renderBoard();
        }
    }
}

