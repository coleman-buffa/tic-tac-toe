/* Tic tac toe with command line input and output for two human players at the same keyboard

Build comments, future plans, discussion points, etc

*/

//Import 
const inquirer = require('inquirer');

let board = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
};

const winPossibilities = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]

function markBoard(position, letter) {
  board[position] = letter.toUpperCase();
}

function printBoard() {
  console.log('\n' +
    ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
    ' ---------\n' +
    ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
    ' ---------\n' +
    ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}

function validMove(position) {
  if (board[position] === ' ') {
    return true
  } else {
    return false
  }
}

function checkWin(player) {
  let count = 0;
  for (let i = 0; i < winPossibilities.length; i++) {
    count = 0;
    for (let j = 0; j < winPossibilities[i].length; j++) {
      if (board[winPossibilities[i][j]] === player) {
        count++;
      }
      if (count === 3) {
        return true
      }
    }
  }
  return false
}

function checkDraw() {
  for (const tile in board) {
    if (board[tile] === ' ') {
      return false
    }
  }
  return true
}

function takeTurn(player) {
  inquirer.prompt([
    {
      name: 'playerMove',
      type: 'number',
      message: 'Player ' + player + ': enter a number 1-9',
      validate: function (value) {
        if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9) {
          if (validMove(value)) {
            return true
          } else {
            return 'Select an empty square for your play'
          }
        } else {
          return 'Enter a number 1-9'
        }
      }
    }
  ]).then(function (response) {
    markBoard(response.playerMove, player);

    //Logic to check for win or draw goes here otherwise the next player takes their turn
    //Check win condition first?
    printBoard();
    if (checkWin(player)) {
      console.log(`${player} wins!`);
      return
    }
    if (checkDraw()) {
      console.log('This game is a draw.');
      return
    }
    if (player === 'X') {
      takeTurn('O');
    } else {
      takeTurn('X');
    }
  })
}

takeTurn('X');