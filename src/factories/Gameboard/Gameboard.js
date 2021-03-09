const Gameboard = (board) => {
  // const board = Array(100).fill(null).map(value => ({shot: false, ship: false}))
  const inventory = []
  let areAllSunk = false;
  let sunkCount = 0;

  if (!board) {
    // console.error('using default board, please pass board into gameboard object')
    board = Array(100).fill(null).map(value => ({shot: false, ship: false}))
  }

  const placeShip = (ship) => {
    
    //// Does not mutate the board, not sure which I want at this point
    // const newBoard = [...board]
    // for (let position of ship.data.positions) {
    //   newBoard[position] = {...board[position], ship: true}
    // }
    // return newBoard;

    // mutates the board
    for (let position of ship.data.positions) {
      board[position].ship = ship;
    }
    return board;
  }

  const recieveAttack = (position) => {
    board[position].shot = true;
    return board[position].ship
      ? true
      : false;
  }

  return {board, areAllSunk, recieveAttack, placeShip}
}

export default Gameboard;