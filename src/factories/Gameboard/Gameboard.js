const Gameboard = (() => {
  const placeShip = (ship, board) => {
    // Does not mutate the board, not sure which I want at this point
    const newBoard = [...board];
    for (let position of ship.data.positions) {
      newBoard[position] = { ...board[position], ship: ship.data.name };
    }
    return newBoard;
  };

  const validPlacement = (coordinates, board) => {
    // const { positions } = ship.data;
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];
    if ((start % 10 === 9 && start % 10 !== end % 10) || end % 10 < start % 10 || end > 99) {
      return false;
    }
    // for too close to another ship
    const badPositions = [];
    board.forEach((value, index) => {
      if (value.ship) {
        badPositions.push(index, index - 10, index + 10);
        if (!(index % 10 === 9)) {
          badPositions.push(index + 1, index + 11, index - 9);
        }
        if (!(index % 10 === 0)) {
          badPositions.push(index - 1, index - 11, index + 9);
        }
      }
    });

    for (const value of coordinates) {
      if (badPositions.includes(value)) {
        return false;
      }
    }
    return true;
  };

  const randomCoordinates = (shipType, board) => {
    let loopCatch = 0;
    const randomSpots = (shipType) => {
      const coordinate = Math.floor(Math.random() * 98);
      const directions = [1, 10];
      const increment = directions[Math.floor(Math.random() * 2)];
      const coordinates = [coordinate];
      for (let i = 1; i < shipType.length; i++) {
        coordinates.push(coordinate + (i * increment));
      }
      return coordinates;
    };
    let coordinates = randomSpots(shipType);
    while (!validPlacement(coordinates, board) && loopCatch < 11) {
      coordinates = randomSpots(shipType);
      loopCatch++;
      console.log('this shouldnt go a lot');
    }

    return coordinates;
  };

  const isValidMovement = (board, position, direction) => {
    if (position === 0) {
      console.log(position, direction, position + direction)
    }
    if (position + direction > 99 || position + direction  < 0) {
      console.log('out of bounds')
      return false;
    } else if (board[position + direction].shot) {
      console.log('already shot')
      return false;
    } else if (position % 10 === 0 && direction === -1) {
      console.log('wraps left')
      return false;
    } else if (position % 10 === 9 && direction === 1) {
      console.log('wraps right')
      return false;
    }
    return true;
  };

  const determineGuessDirection = (board, didHit, positions, direction) => {
    const originalHit = positions[positions.length -1];
    if (
      didHit &&
      isValidMovement(
      board,
      positions[0],
      direction
    )
    ) {
      return [direction, positions[0] + direction];
      // ugh, remove !hit ?
    } else if (positions.length > 0) {
      if (isValidMovement(board, originalHit, 1)) {
        return [1, originalHit + 1];
      } else if (isValidMovement(board, originalHit, 10)) {
        return [10, originalHit + 10];
      } else if (isValidMovement(board, originalHit, -10)) {
        return [-10, originalHit -10];
      }
    }

    const randomCoordinate = randomOpenSpot(board)

    return [-1, randomCoordinate] ;
  }

  const randomOpenSpot = (opponentsGameboard) => {
    let openSpots = [];
    for (let index in opponentsGameboard) {
      if (!opponentsGameboard[index].shot) {
        openSpots.push(Number(index));
      }
    }
    const randomIndex = Math.floor(Math.random() * openSpots.length);
    const randomAttack = openSpots[randomIndex];
    return randomAttack;
  }

  return {
    placeShip,
    validPlacement,
    randomCoordinates,
    determineGuessDirection
  };

})();

export default Gameboard;
