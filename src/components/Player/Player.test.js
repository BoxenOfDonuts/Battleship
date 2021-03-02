import Player from './Player';
import Gameboard from '../Gameboard/Gameboard';

describe('Player Test Suite', () => {
  it('attacks another player', () => {
    const player = Player();
    const opponent = Gameboard();
    opponent.placeShip(0, 1, false)
    player.attack(opponent,0)
    console.log(opponent.theBoard()[0].isSunk())
  })
  it('computer attackes open spot', () => {
    const player = Player();
    const opponent = Gameboard();
    for (let i = 1; i < opponent.theBoard().length; i++) {
      opponent.placeShip(i, 1, false);
    }
    // opponent.placeShip(0, 1, false)
    expect(opponent.theBoard()).not.toContain(false);
    player.computerAttack(opponent)
    expect(opponent.theBoard()).toContain(false);
    console.log(opponent.theBoard());
  })
})