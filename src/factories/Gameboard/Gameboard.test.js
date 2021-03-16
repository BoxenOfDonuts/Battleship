import Gameboard from './Gameboard';
import Ship from '../Ship/Ship';

describe('Test Suite for Gameboard', () => {
  const board = Array(100).fill(null).map((value, index) =>({shot: false, ship: false}));
  const ship = Ship('Patrol Boat', [0,1]);

  beforeEach(() => {
    const board = Array(100).fill(null).map((value, index) =>({shot: false, ship: false}));
    const ship = Ship('Patrol Boat', [0,1]);
    // gameboard = Gameboard();
  })

  it('Places a ship on the board', () => {
    // should it be a method? I dunno. but probably?
    const newBoard = Gameboard.placeShip(ship, board)
    expect(newBoard[0]).toEqual({shot: false, ship: 'Patrol Boat'})
    expect(newBoard[1]).toEqual({shot: false, ship: 'Patrol Boat'})
    expect(newBoard[2]).toEqual({shot: false, ship: false})
  })

  it("Placing ship doesn't accidentally mutate the board", ()=> {
    const boardCopy = [...board];
    const newBoard = Gameboard.placeShip(ship, board);
    expect(newBoard[0]).toEqual({shot: false, ship: 'Patrol Boat'});
    expect(board[0]).toEqual({shot: false, ship: false});
    expect(board).toEqual(boardCopy);
  })

  it('Returns false if it does not fit on the board', () => {
    const newBoard = [...board];
    const goodPositions = [8 ,9];
    const badPositions = [9, 10];
    const longBadPositions = [8, 9, 10, 11, 12];
    expect(Gameboard.validPlacement(goodPositions, newBoard)).toBe(true);
    expect(Gameboard.validPlacement(badPositions, newBoard)).toBe(false);
    expect(Gameboard.validPlacement(longBadPositions, newBoard)).toBe(false)
  })

  it('returns false if it is too close to another ship', () => {
    const newBoard = [...board];
    newBoard[18].ship = true;
    newBoard[19].ship = true;
    // before
    expect(Gameboard.validPlacement([16,17], newBoard)).toBe(false);
    // of
    expect(Gameboard.validPlacement([18,19], newBoard)).toBe(false);
    // above
    expect(Gameboard.validPlacement([27,28,29], newBoard)).toBe(false);
    // below
    expect(Gameboard.validPlacement([7,8,9], newBoard)).toBe(false);
    // wrap around
    expect(Gameboard.validPlacement([20], newBoard)).toBe(true);
    newBoard[40].ship = true;
    newBoard[41].ship = true;
    // after
    expect(Gameboard.validPlacement([42], newBoard)).toBe(false);
    // wrap the other way
    expect(Gameboard.validPlacement([38,39], newBoard)).toBe(true);
    // good values
    expect(Gameboard.validPlacement([43,44], newBoard)).toBe(true);
    expect(Gameboard.validPlacement([48,49], newBoard)).toBe(true);
    expect(Gameboard.validPlacement([10, 11, 12, 13], newBoard)).toBe(true);
  })
  it('returns coordinates for computer ship to be placed', () => {
    expect(Gameboard.randomCoordinates({ name: 'Carrier', length: 5 },board).length).toBe(5);
    expect(Gameboard.randomCoordinates({ name: 'Battleship', length: 4 },board).length).toBe(4);
    expect(Gameboard.randomCoordinates({ name: 'Destroyer', length: 3 },board).length).toBe(3);
    expect(Gameboard.randomCoordinates({ name: 'Patrol Boat', length: 2 },board).length).toBe(2);
  })
})
