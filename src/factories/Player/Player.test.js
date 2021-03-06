import Player from './Player';
import Gameboard from '../Gameboard/Gameboard';
import Ship from '../Ship/Ship'

describe('Player Test Suite', () => {
  it('is a blank test', () => {
    expect(1).toBe(1);
  })
  // it('Player Creates with a name', () => {
  //   const player = Player('Joel')
  //   expect(player.data.name).toBe('Joel')
  // })
  // it('attacks another player', () => {
  //   const player = Player();
  //   const opponent = Gameboard();
  //   opponent.placeShip(Ship(1), 0, false)
  //   player.attack(opponent,0)
  // })
  // it('computer attackes open spot', () => {
  //   const player = Player();
  //   const opponent = Gameboard();
  //   for (let i = 1; i < opponent.theBoard().length; i++) {
  //     opponent.placeShip(Ship(1), i, false);
  //   }
  //   // opponent.placeShip(0, 1, false)
  //   expect(opponent.theBoard()).not.toContain(false);
  //   player.computerAttack(opponent)
  //   expect(opponent.theBoard()).toContain(false);
  // })
})