import Gameboard from './Gameboard';
import Ship from '../Ship/Ship';

describe('Test Suite for Gameboard', () => {
  // let gameboard = Gameboard();
  const board = Array(100).fill(null).map((value, index) =>({shot: false, ship: false}));
  const ship = Ship('Patrol Boat', [0,1]);
  beforeEach(() => {
    const board = Array(100).fill(null).map((value, index) =>({shot: false, ship: false}));
    const ship = Ship('Patrol Boat', [0,1]);
    // gameboard = Gameboard();
  })
  
  it('has a test', () =>{
    
  })
  it('places ship correctly', () => {

  })

  // it('creates the board as we expect', () => {
  //   const fakeBoard = Array(100).fill(null).map(value => ({shot: false, ship: false}))
  //   expect(gameboard.board).toEqual(fakeBoard);
  // })
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

  })
  // it('can place multiple ships on the board', () => {
  //   // should it be a method? I dunno. but probably?    
  //   const boat = Ship('boat', [0]);
  //   const destroyer = Ship('destroyer', [22,23])
  //   gameboard.board[0].ship = boat;
  //   gameboard.board[22].ship = destroyer;
  //   gameboard.board[23].ship = destroyer;
  //   expect(gameboard.board[0]).toEqual({shot: false, ship: boat})
  //   expect(gameboard.board[1]).toEqual({shot: false, ship: false})
  //   expect(gameboard.board[22]).toEqual({shot: false, ship: destroyer})
  //   expect(gameboard.board[23]).toEqual({shot: false, ship: destroyer})
  // })
  // it('ships are unique', () => {
  //   const boat = Ship('boat', [0]);
  //   const destroyer = Ship('destroyer', [22,23])
  //   gameboard.board[0].ship = boat;
  //   gameboard.board[22].ship = destroyer;
  //   gameboard.board[23].ship = destroyer;
  //   const didHit = gameboard.recieveAttack(22);
  //   destroyer.hit(22);
  //   expect(didHit).toBe(true)
  //   expect(gameboard.board[22]).toEqual({shot:true, ship: destroyer})
  //   expect(gameboard.board[0]).toEqual({shot:false, ship: boat})
  //   expect(boat.data.hits).toEqual([])
  //   expect(destroyer.data.hits).toEqual([22])
  // })
  // it('can mark hits on a ship', () => {
  //   const boat = Ship('boat', [0]);
  //   gameboard.board[0].ship = boat;
  //   expect(gameboard.board[0].shot).toBe(false)
  //   const didHit = gameboard.recieveAttack(0);
  //   expect(didHit).toBe(true)
  //   expect(gameboard.board[0].shot).toBe(true)
  // })

  // it('can mark a miss on the board', () => {
  //   const boat = Ship('boat', [0]);
  //   gameboard.board[0].ship = boat;
  //   expect(gameboard.board[10].shot).toBe(false);
  //   const didHit = gameboard.recieveAttack(10);
  //   expect(didHit).toBe(false)
  //   expect(gameboard.board[10].shot).toBe(true)
  // })
  // it('place ship method works as expected', () => {
  //   const destroyer = Ship('destroyer', [22,23])
  //   gameboard.placeShip(destroyer);
  //   expect(gameboard.board[22]).toEqual({shot: false, ship: destroyer})
  //   expect(gameboard.board[23]).toEqual({shot: false, ship: destroyer})
  // })
})