import Ship from '../Ship/Ship'

const Gameboard = () => {
  const board = Array(72).fill(null);

  const placeShip = (coordinate, length, isVertical) => {
    const ship = Ship(length);
    if (!isVertical) ship.flipOrientation();
    
  }

  return { placeShip }

}

export default Gameboard;