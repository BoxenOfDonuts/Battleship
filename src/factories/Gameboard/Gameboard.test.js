import Gameboard from './Gameboard';
import Ship from '../Ship/Ship';

describe('Test Suite for Gameboard', () => {
  // it('places a ship', () => {
  //   const gameboard = Gameboard();
  //   const ship = Ship(3)
  //   gameboard.placeShip(ship, 7, false);
  //   expect(gameboard.theBoard()[6]).toBeNull();
  //   expect(gameboard.theBoard()[10]).toBeNull();
  //   expect(gameboard.theBoard()[7]).not.toBeNull();
  //   expect(gameboard.theBoard()[8]).not.toBeNull();
  //   expect(gameboard.theBoard()[9]).not.toBeNull();
  // })
  // it('placing a ship does not increase the size of the array', () => {
  //   const gameboard = Gameboard();
  //   const ship = Ship(3)
  //   gameboard.placeShip(ship, 7, false);
  //   expect(gameboard.theBoard().length).toBe(100);
  // })
  // it('ship takes a hit', () => {
  //   const gameboard = Gameboard();
  //   const ship = Ship(3)
  //   gameboard.placeShip(ship, 7, false);
  //   gameboard.recieveAttack(7);
  //   // breaking because we pass in a board coord not a position on the ship
  //   expect(gameboard.theBoard()[7].getHull()).toEqual([true, false, false])
  //   expect(gameboard.theBoard()[8].getHull()).toEqual([true, false, false])
  //   expect(gameboard.theBoard()[9].getHull()).toEqual([true, false, false])
  // })
  // it('misses are tracked', () => {
  //   const gameboard = Gameboard();
  //   gameboard.recieveAttack(7);
  //   expect(gameboard.theBoard()[7]).toBe(false)
  //   expect(gameboard.theBoard()[7]).not.toBeNull()
  //   expect(gameboard.theBoard().length).toBe(100);
  // })
  // it('creates multiple unique ships', () => {
  //   const gameboard = Gameboard();
  //   const ship = Ship(3);
  //   const ship2 = Ship(2);
  //   gameboard.placeShip(ship, 7, false);
  //   gameboard.placeShip(ship2, 0, false);
  //   gameboard.recieveAttack(0);
  //   expect(gameboard.theBoard()[0].getHull()).toEqual([true, false])
  //   expect(gameboard.theBoard()[7].getHull()).toEqual([false, false, false])
  // })
  // it('sinking the last ship updates areAllSunk', () => {
  //   const gameboard = Gameboard();
  //   const ship = Ship(1)
  //   gameboard.placeShip(ship, 0, false);
  //   gameboard.recieveAttack(0);
  //   expect(gameboard.sink()).toBe(true)
  // })
  // it('if we forget to disable click and they click the same spot twice nothing happens', () => {
  //   const gameboard = Gameboard();
  //   gameboard.recieveAttack(0);
  //   expect(() => gameboard.recieveAttack(0)).not.toThrow()
  // })
  let gameboard = Gameboard();

  beforeEach(() => {
    gameboard = Gameboard();
  })

  it('creates the board as we expect', () => {
    const fakeBoard = Array(100).fill(null).map(value => ({shot: false, ship: false}))
    expect(gameboard.board).toEqual(fakeBoard);
  })
  it('Places a ship on the board', () => {
    // should it be a method? I dunno. but probably?
    const boat = Ship('boat', [0]);
    gameboard.board[0].ship = boat;
    expect(gameboard.board[0]).toEqual({shot: false, ship: boat})
    expect(gameboard.board[1]).toEqual({shot: false, ship: false})
  })
  it('can place multiple ships on the board', () => {
    // should it be a method? I dunno. but probably?    
    const boat = Ship('boat', [0]);
    const destroyer = Ship('destroyer', [22,23])
    gameboard.board[0].ship = boat;
    gameboard.board[22].ship = destroyer;
    gameboard.board[23].ship = destroyer;
    expect(gameboard.board[0]).toEqual({shot: false, ship: boat})
    expect(gameboard.board[1]).toEqual({shot: false, ship: false})
    expect(gameboard.board[22]).toEqual({shot: false, ship: destroyer})
    expect(gameboard.board[23]).toEqual({shot: false, ship: destroyer})
  })
  it('ships are unique', () => {
    const boat = Ship('boat', [0]);
    const destroyer = Ship('destroyer', [22,23])
    gameboard.board[0].ship = boat;
    gameboard.board[22].ship = destroyer;
    gameboard.board[23].ship = destroyer;
    const didHit = gameboard.recieveAttack(22);
    destroyer.hit(22);
    expect(didHit).toBe(true)
    expect(gameboard.board[22]).toEqual({shot:true, ship: destroyer})
    expect(gameboard.board[0]).toEqual({shot:false, ship: boat})
    expect(boat.data.hits).toEqual([])
    expect(destroyer.data.hits).toEqual([22])
  })
  it('can mark hits on a ship', () => {
    const boat = Ship('boat', [0]);
    gameboard.board[0].ship = boat;
    expect(gameboard.board[0].shot).toBe(false)
    const didHit = gameboard.recieveAttack(0);
    expect(didHit).toBe(true)
    expect(gameboard.board[0].shot).toBe(true)
  })

  it('can mark a miss on the board', () => {
    const boat = Ship('boat', [0]);
    gameboard.board[0].ship = boat;
    expect(gameboard.board[10].shot).toBe(false);
    const didHit = gameboard.recieveAttack(10);
    expect(didHit).toBe(false)
    expect(gameboard.board[10].shot).toBe(true)
  })
  it('place ship method works as expected', () => {
    const destroyer = Ship('destroyer', [22,23])
    gameboard.placeShip(destroyer);
    expect(gameboard.board[22]).toEqual({shot: false, ship: destroyer})
    expect(gameboard.board[23]).toEqual({shot: false, ship: destroyer})
  })
})