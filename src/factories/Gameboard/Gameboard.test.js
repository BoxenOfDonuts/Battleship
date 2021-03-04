import Gameboard from './Gameboard';
import Ship from '../Ship/Ship';

describe('Test Suite for Gameboard', () => {
  it('places a ship', () => {
    const gameboard = Gameboard();
    const ship = Ship(3)
    gameboard.placeShip(ship, 7, false);
    expect(gameboard.theBoard()[6]).toBeNull();
    expect(gameboard.theBoard()[10]).toBeNull();
    expect(gameboard.theBoard()[7]).not.toBeNull();
    expect(gameboard.theBoard()[8]).not.toBeNull();
    expect(gameboard.theBoard()[9]).not.toBeNull();
  })
  it('placing a ship does not increase the size of the array', () => {
    const gameboard = Gameboard();
    const ship = Ship(3)
    gameboard.placeShip(ship, 7, false);
    expect(gameboard.theBoard().length).toBe(100);
  })
  it('ship takes a hit', () => {
    const gameboard = Gameboard();
    const ship = Ship(3)
    gameboard.placeShip(ship, 7, false);
    gameboard.recieveAttack(7);
    expect(gameboard.theBoard()[7].getHull()).toEqual(1)
    expect(gameboard.theBoard()[8].getHull()).toEqual(1)
    expect(gameboard.theBoard()[9].getHull()).toEqual(1)
  })
  it('misses are tracked', () => {
    const gameboard = Gameboard();
    gameboard.recieveAttack(7);
    expect(gameboard.theBoard()[7]).toBe(false)
    expect(gameboard.theBoard()[7]).not.toBeNull()
    expect(gameboard.theBoard().length).toBe(100);
  })
  it('creates multiple unique ships', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    const ship2 = Ship(1);
    gameboard.placeShip(ship, 7, false);
    gameboard.placeShip(ship2, 0, false);
    gameboard.recieveAttack(0);
    expect(gameboard.theBoard()[0].getHull()).toEqual(1)
    expect(gameboard.theBoard()[7].getHull()).toEqual(0)
  })
  it('sinking the last ship updates areAllSunk', () => {
    const gameboard = Gameboard();
    const ship = Ship(1)
    gameboard.placeShip(ship, 0, false);
    gameboard.recieveAttack(0);
    expect(gameboard.sink()).toBe(true)
  })
  it('if we forget to disable click and they click the same spot twice nothing happens', () => {
    const gameboard = Gameboard();
    gameboard.recieveAttack(0);
    expect(() => gameboard.recieveAttack(0)).not.toThrow()
  })
})