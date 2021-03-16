import ShipTypes from '../Ship/ShipTypes';
import Ship from '../Ship/Ship'

const Gameboard = (() => {
  const placeShip = (ship, board) => {
    
    // Does not mutate the board, not sure which I want at this point
    const newBoard = [...board]
    for (let position of ship.data.positions) {
      newBoard[position] = {...board[position], ship: ship.data.name}
    }
    return newBoard;

  }

  const validPlacement = (coordinates, board) => {
    // const { positions } = ship.data;
    const start = coordinates[0];
    const end = coordinates[coordinates.length-1];
    if (start % 10 === 9 || end % 10 < start % 10 ) {
      return false;
    }
    // for too close to another ship 
    const badPositions = [];
    board.forEach((value, index) => {
      if (value.ship) {
        badPositions.push(index, index-10, index+10);
        if (!(index % 10 === 9)) {
          badPositions.push(index+1, index+11, index-9)
        }
        if (!(index % 10 === 0)) {
          badPositions.push(index-1, index-11, index+9)
        }
      }
    })

    for (const value of coordinates) {
      if (badPositions.includes(value)) {
        return false;
      }
    }
    return true;
  }

  const randomCoordinates = (shipType, board) => {
    const randomSpots = (shipType) => {
      const coordinate = Math.floor(Math.random() * 98)
      const coordinates = [coordinate];
      for (let i = 1; i < shipType.length; i++) {
        coordinates.push(coordinate + i);
      }
      return coordinates;
    }
    let coordinates = randomSpots(shipType);
    while(!validPlacement(coordinates, board)) {
        coordinates = randomSpots(shipType);
        console.log('this shouldnt go a lot')
    }

    return coordinates;
  }

  const isValid = (board, position, direction) => {
    console.log(board[position + direction])
    if (board[position + direction].shot) {
      return false
    }
    return true;
  }

  return { placeShip, validPlacement, randomCoordinates, isValid }
})();

export default Gameboard;