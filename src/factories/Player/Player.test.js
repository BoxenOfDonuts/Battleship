import Player from './Player';
import Gameboard from '../Gameboard/Gameboard';
import Ship from '../Ship/Ship'

describe('Player Test Suite', () => {
  it('attacks another player', () => {
    const player = Player();
    const opponent = Gameboard();
    opponent.placeShip(Ship(1), 0, false)
    player.attack(opponent,0)
  })
  it('computer attackes open spot', () => {
    const player = Player();
    const opponent = Gameboard();
    for (let i = 1; i < opponent.theBoard().length; i++) {
      opponent.placeShip(Ship(1), i, false);
    }
    // opponent.placeShip(0, 1, false)
    expect(opponent.theBoard()).not.toContain(false);
    player.computerAttack(opponent)
    expect(opponent.theBoard()).toContain(false);
  })
  // it('Check for bad input into hit')
})