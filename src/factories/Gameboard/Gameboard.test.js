import Gameboard from './Gameboard';
import Ship from '../Ship/Ship';

describe('Test Suite for Gameboard', () => {
  let board = Array(100)
    .fill(null)
    .map((value, index) => ({ shot: false, ship: false }));
  const ship = Ship('Patrol Boat', [0, 1]);

  beforeEach(() => {
    const board = Array(100)
      .fill(null)
      .map((value, index) => ({ shot: false, ship: false }));
    const ship = Ship('Patrol Boat', [0, 1]);
    // gameboard = Gameboard();
  });

  it('Places a ship on the board', () => {
    // should it be a method? I dunno. but probably?
    const newBoard = Gameboard.placeShip(ship, board);
    expect(newBoard[0]).toEqual({ shot: false, ship: 'Patrol Boat' });
    expect(newBoard[1]).toEqual({ shot: false, ship: 'Patrol Boat' });
    expect(newBoard[2]).toEqual({ shot: false, ship: false });
  });

  it("Placing ship doesn't accidentally mutate the board", () => {
    const boardCopy = [...board];
    const newBoard = Gameboard.placeShip(ship, board);
    expect(newBoard[0]).toEqual({ shot: false, ship: 'Patrol Boat' });
    expect(board[0]).toEqual({ shot: false, ship: false });
    expect(board).toEqual(boardCopy);
  });

  it('Returns false if it does not fit on the board', () => {
    const newBoard = [...board];
    const goodPositions = [8, 9];
    const badPositions = [9, 10];
    const longBadPositions = [8, 9, 10, 11, 12];
    expect(Gameboard.validPlacement(goodPositions, newBoard)).toBe(true);
    expect(Gameboard.validPlacement(badPositions, newBoard)).toBe(false);
    expect(Gameboard.validPlacement(longBadPositions, newBoard)).toBe(false);
  });

  it('returns false if it is too close to another ship', () => {
    const newBoard = [...board];
    newBoard[18].ship = true;
    newBoard[19].ship = true;
    // before
    expect(Gameboard.validPlacement([16, 17], newBoard)).toBe(false);
    // of
    expect(Gameboard.validPlacement([18, 19], newBoard)).toBe(false);
    // above
    expect(Gameboard.validPlacement([27, 28, 29], newBoard)).toBe(false);
    // below
    expect(Gameboard.validPlacement([7, 8, 9], newBoard)).toBe(false);
    // wrap around
    expect(Gameboard.validPlacement([20], newBoard)).toBe(true);
    newBoard[40].ship = true;
    newBoard[41].ship = true;
    // after
    expect(Gameboard.validPlacement([42], newBoard)).toBe(false);
    // wrap the other way
    expect(Gameboard.validPlacement([38, 39], newBoard)).toBe(true);
    // good values
    expect(Gameboard.validPlacement([43, 44], newBoard)).toBe(true);
    expect(Gameboard.validPlacement([48, 49], newBoard)).toBe(true);
    expect(Gameboard.validPlacement([10, 11, 12, 13], newBoard)).toBe(true);
  });
  it('returns coordinates for computer ship to be placed', () => {
    expect(
      Gameboard.randomCoordinates({ name: 'Carrier', length: 5 }, board).length
    ).toBe(5);
    expect(
      Gameboard.randomCoordinates({ name: 'Battleship', length: 4 }, board)
        .length
    ).toBe(4);
    expect(
      Gameboard.randomCoordinates({ name: 'Destroyer', length: 3 }, board)
        .length
    ).toBe(3);
    expect(
      Gameboard.randomCoordinates({ name: 'Patrol Boat', length: 2 }, board)
        .length
    ).toBe(2);
  });
  it('Guesses where the ship is logically', () => {
    const board = Array(100)
      .fill(null)
      .map((value, index) => ({ shot: false, ship: false }));
    board[1].ship = true;
    board[11].ship = true;
    board[21].ship = true;
    expect(Gameboard.determineGuessDirection(board, true, [11], -1)).toEqual([-1, 10]);
    board[10].shot = true;
    expect(Gameboard.determineGuessDirection(board, false, [11], -1)).toEqual([1, 12]);
    board[12].shot = true;
    expect(Gameboard.determineGuessDirection(board, false, [11], -1)).toEqual([10, 21]);
    board[21].shot = true;
    expect(Gameboard.determineGuessDirection(board, true, [21, 11], 10)).toEqual([10, 31]);
    board[31].shot = true;
    expect(Gameboard.determineGuessDirection(board, false, [21, 11], 10)).toEqual([-10, 1]);
    board[1].shot = true;
    expect(Gameboard.determineGuessDirection(board, false, [1, 21, 11], 10)).toContain(-1)
  })
  it('does not wrap on guesses', () => {
    const board = Array(100)
      .fill(null)
      .map((value, index) => ({ shot: false, ship: false }));
    board[90].ship = true;
    board[89].ship = true;
    expect(Gameboard.determineGuessDirection(board, true, [90], -1)).toEqual([1, 91]);
    expect(Gameboard.determineGuessDirection(board, false, [89], -1)).toEqual([10, 99]);
    expect(Gameboard.determineGuessDirection(board, false, [99], 1)).toEqual([-10, 89]);
    expect(Gameboard.determineGuessDirection(board, true, [0], -1)).toEqual([1, 1]);
  })
  it('edges are hard', () => {
    const board = Array(100)
      .fill(null)
      .map((value, index) => ({ shot: false, ship: false }));
    board[90].ship = true;
    board[80].ship = true;
    board[70].ship = true;
    expect(Gameboard.determineGuessDirection(board, true, [90], -1)).toEqual([1, 91]);
    board[91].shot = true;
    expect(Gameboard.determineGuessDirection(board, false, [90], 1)).toEqual([-10, 80]);
    board[80].shot = true;
    expect(Gameboard.determineGuessDirection(board, true, [80, 90], -10)).toEqual([-10, 70]);
  })
});