// UTILIZED SOLUTION TO REVERSE ENGINEER
// AND JUST PLAYED WITH STYLING TO GRASP THE LOGIC

/*----- CONSTANTS -----*/
const $lookup = {
  '1'   : 'Yellow',
  '-1'  : 'Blue',
  'null': 'white'
};

/*----- X & O ARRAY OF WINNING COMBO'S -----*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- EMPTY VARIABLES -----*/
let board, turn, winner

/*----- FUNCTIONS -----*/
const handleMove = e => {

  // GET INDEX OF SQUARE
  let idx = parseInt(e.target.id.replace('sq', ''));

  // CHECK IF SQUARE AVAILABLE, IF NOT PUT SQUARE
  if (board[idx] || winner) return;

  // UPDATE (board, turn, & winner)
  board[idx] = turn;
  turn *= -1;
  winner = grabWinner();
  render();
}

// GRAB WINNER BY WINNER COMBOS
const grabWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] 
      + board[winningCombos[i][1]] 
      + board[winningCombos[i][2]]) === 3) 
    return board[winningCombos[i][0]];
  }
  if (board.includes(null)) return null;
  return 'Tie';
}


const render = () => {

  board.forEach((sq, idx) => {
    let $squares = $('td div')
    let $div = $squares[idx];
    $($div).css(
      "background", $lookup[sq]
    );
  });

  if (winner === 'Tie') {
    $('h1').html('We have tie!');
  } else if (winner) {
    $('h1').html(`${$lookup[winner].toUpperCase()}, You Won!`);
  } else {
    $('h1').html(`${$lookup[turn].toUpperCase()}'S Turn`);
  }
}

const reset = () => {

  // board = [null, null, null, null, null, null, null, null, null];
  board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  render();
}

reset();

/*----- EVENT LISTENERS -----*/
$('table').on('click', handleMove);
$('#btn').on('click', reset);