/* Tic tac toe with command line input and output for two human players at the same keyboard

This took roughly 6 hours to plan, code, and debug. This was my first attempt at making this game in any format.
To save time I made use of Inquirer to simplify handling user input from the terminal. It would be instructive to attempt a build that uses no libraries.
It would be instructive to develep a computer opponent. The basic version could play by selecting an available tile randomly.
Implement a browser based GUI
Implement online play with another human player on a different computer (websocket?)

*/

//Import inquirer to aid in accepting and validating players' input
const inquirer = require('inquirer');

//Object will track the state of the game
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

//Array of possible win conditions
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

//Mark the indicated position with the indicated letter
function markBoard(position, letter) {
  board[position] = letter.toUpperCase();
}

//Output the board to the console
function printBoard() {
  console.log('\n' +
    ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
    ' ---------\n' +
    ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
    ' ---------\n' +
    ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}

//Check to see the move the current player is attempting is an empty tile
function validMove(position) {
  if (board[position] === ' ') {
    return true
  } else {
    return false
  }
}

//Check to see if the move just made wins the game by iterating through the win condition matrix, and counting the number of the given player's mark appears in any of the subarrays.
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

//Check to see if the game ends in a draw by verifying all the tiles are filled. This function is only ever called after checkWin to guarantee it will not be looking at a board state that contains a winning condition.
function checkDraw() {
  for (const tile in board) {
    if (board[tile] === ' ') {
      return false
    }
  }
  return true
}

//Runs the game by prompting the players for their input and calling the rest of the game controlling functions. The Inquirer package provides input validation to ensure that players enter only numbers 1-9.
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

//Game on!
takeTurn('X');