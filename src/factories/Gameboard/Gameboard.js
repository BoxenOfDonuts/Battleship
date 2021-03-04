const Gameboard = () => {
  const board = Array(100).fill(null);
  const inventory = []
  let areAllSunk = false;
  let sunkCount = 0;

  const _shipSunk = () => {
    sunkCount++;
    if (inventory.length === sunkCount) {
      areAllSunk = true;
    }
  }

  const placeShip = (ship, coordinate, isVertical) => {
    if (!isVertical) ship.flipOrientation();
    for (let i = coordinate; i < coordinate + ship.getLength(); i++) {
      board.splice(i, 1, ship)
    }
    inventory.push(ship)
  }

  const recieveAttack = (coordinate) => {
    if (board[coordinate] !== null && board[coordinate] !== false) {
      const ship = board[coordinate];
      ship.hit();
      if (ship.isSunk()) {
        _shipSunk();
      }
    } else {
      board[coordinate] = false;
    }

  }
 
  const theBoard = () => {
    return board;
  }

  const sink = () => {
    return areAllSunk;
  }

  return { placeShip, theBoard, recieveAttack, sink }

}

export default Gameboard;