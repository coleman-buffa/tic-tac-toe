/* Tic tac toe with command line input and output for two human players at the same keyboard



*/

//Import 
const inquirer = require('inquirer');

let board = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: ''
};

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

function takeTurn(player) {
  inquirer.prompt([
    {
      name: 'playerMove',
      type: 'number',
      message: 'Player ' + player + ': enter a number 1-9',
      validate: function (value) {
        if (
          value === 1 || value === 2 || value === 3 ||
          value === 4 || value === 5 || value === 6 ||
          value === 7 || value === 8 || value === 9) {
          return true
        } else {
          return 'Enter a number 1-9'
        }
      }
    }
  ]).then(function (response) {
    markBoard(response.playerMove, player);

    //Logic to check for win or draw goes here otherwise the next player takes their turn

    printBoard();

    if (player === 'X') {
      takeTurn('O');
    } else {
      takeTurn('X');
    }
  })


}

takeTurn('X');