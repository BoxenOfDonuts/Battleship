import Gameboard from './Gameboard';

describe('Test Suite for Gameboard', () => {
  it('places a ship', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(7, 3, false);
    expect(gameboard.theBoard()[6]).toBeNull();
    expect(gameboard.theBoard()[10]).toBeNull();
    expect(gameboard.theBoard()[7]).not.toBeNull();
    expect(gameboard.theBoard()[8]).not.toBeNull();
    expect(gameboard.theBoard()[9]).not.toBeNull();
  })
  it('placing a ship does not increase the size of the array', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(7, 3, false);
    expect(gameboard.theBoard().length).toBe(72);
  })
  it('ship takes a hit', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(7, 3, false);
    gameboard.recieveAttack(7);
    expect(gameboard.theBoard()[7].getHull()).toEqual([true, false, false])
    expect(gameboard.theBoard()[8].getHull()).toEqual([true, false, false])
    expect(gameboard.theBoard()[9].getHull()).toEqual([true, false, false])
  })
  it('misses are tracked', () => {
    const gameboard = Gameboard();
    gameboard.recieveAttack(7);
    expect(gameboard.theBoard()[7]).toBe(false)
    expect(gameboard.theBoard()[7]).not.toBeNull()
    expect(gameboard.theBoard().length).toBe(72);
  })
  it('creates multiple unique ships', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(7, 3, false);
    gameboard.placeShip(0, 1, false);
    gameboard.recieveAttack(0);
    expect(gameboard.theBoard()[0].getHull()).toEqual([true])
    expect(gameboard.theBoard()[7].getHull()).toEqual([false, false, false])
  })
  it('sinking the last ship updates areAllSunk', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(0, 1, false);
    gameboard.recieveAttack(0);
    expect(gameboard.sink()).toBe(true)
  })
})