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

  const validPlacement = (coordinates, board) => {
    // const { positions } = ship.data;
    const start = coordinates[0];
    const end = coordinates[coordinates.length-1];
    if (start % 10 === 9 || end % 10 < start % 10 ) {
      return false;
    }
    // for too close to another ship 
    const badBositions = [];
    board.forEach((value, index) => {
      if (value.ship) {
        badBositions.push(index, index-10, index+10);
        if (!(index % 10 === 9)) {
          badBositions.push(index+1, index+11, index-9)
        }
        if (!(index % 10 === 0)) {
          badBositions.push(index-1, index-11, index-9)
        }
      }
    })

    console.log(badBositions);
    for (const value of coordinates) {
      if (badBositions.includes(value)) {
        return false;
      }
    }

    return true;
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



  return { placeShip, validPlacement }
})();

export default Gameboard;