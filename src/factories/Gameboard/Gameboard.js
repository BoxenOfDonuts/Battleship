const Gameboard = (() => {
  const placeShip = (ship, board) => {
    
    // Does not mutate the board, not sure which I want at this point
    const newBoard = [...board]
    for (let position of ship.data.positions) {
      newBoard[position] = {...board[position], ship: ship.data.name}
    }
    return newBoard;

    // mutates the board
    // for (let position of ship.data.positions) {
    //   board[position].ship = ship.data.name;
    // }
    // return board;
  }

  const recieveAttack = (position, board) => {
    const newBoard = [...board]
    newBoard[position].shot = true;
  //   return board[position].ship
  //     ? true
  //     : false;
    // console.log(board[position].ship)

    return {
      board: newBoard,
      isShip: board[position].ship
    }
  }



  return { placeShip }
})();

export default Gameboard;