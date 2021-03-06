const Gameboard = () => {
  const board = Array(100).fill(null).map(value => ({shot: false, ship: false}))
  const inventory = []
  let areAllSunk = false;
  let sunkCount = 0;

  //trying a place ship w/o mutating
  const placeShip = (ship) => {
    const newBoard = [...board]
    for (let position of ship.data.positions) {
      newBoard[position].ship = ship;
    }
    /// I guess its still a refernce to that object?!?!
    console.log(board)
    // return newBoard;
  }

  const recieveAttack = (position) => {
    board[position].shot = true;
    return board[position].ship
      ? true
      : false;
  }

  // const _shipSunk = () => {
  //   sunkCount++;
  //   if (inventory.length === sunkCount) {
  //     areAllSunk = true;
  //   }
  // }

  // const placeShip = (ship, coordinate) => {
  //   for (let i = coordinate; i < coordinate + ship.getLength(); i++) {
  //     board.splice(i, 1, ship)
  //   }
  //   inventory.push(ship)
  // }

  // const recieveAttack = (coordinate) => {
  //   if (board[coordinate] !== null && board[coordinate] !== false) {
  //     const ship = board[coordinate];
  //     let array = ['x']
  //     const searchInt = ship.isVertical() ? 10 : 1
  //     coordinate = coordinate - searchInt;
  //     while (board[coordinate]) {
  //       array.unshift('o');
  //       coordinate = coordinate - searchInt;
  //     }
  //     while (board[coordinate]) {
  //       array.unshift('o');
  //       coordinate = coordinate + searchInt;
  //     }

  //     ship.hit(array.indexOf('x'));
  //     if (ship.isSunk()) {
  //       _shipSunk();
  //     }
  //   } else {
  //     board[coordinate] = false;
  //   }

  // }

  // const theBoard = (() => {
  //   return board;
  // })()


  // return { placeShip, board, recieveAttack, areAllSunk }
  return {board, areAllSunk, recieveAttack, placeShip}
}

export default Gameboard;