import Player from './Player';
import Gameboard from '../Gameboard/Gameboard';
import Ship from '../Ship/Ship'

describe('Player Test Suite', () => {
  it('Player Creates with a name', () => {
    const player = Player('Joel')
    expect(player.data.name).toBe('Joel')
  })
  it('attacks another player', () => {
    const player = Player();
    const opponent = Gameboard();
    opponent.placeShip(Ship('sub', [0,1,2]))
    expect(player.attack(opponent,0)).toBe(true)
    expect(player.attack(opponent,9)).toBe(false)
  })
  it('cannot attack the same square twice', () => {
    const player = Player();
    const opponent = Gameboard();
    opponent.placeShip(Ship('sub', [0,1,2]))
    expect(player.attack(opponent,0)).toBe(true)
    // undefined means square was already attacked
    expect(player.attack(opponent,0)).toBeUndefined();
  })
  it('computer attackes open spot', () => {
    const player = Player();
    const opponent = Gameboard();
    for (let i = 0; i < opponent.board.length; i++) {
      opponent.recieveAttack(i);
    }
    opponent.board[80].shot = false;
    expect(opponent.board[80]).not.toEqual({shot:true, ship:false});
    expect(player.computerAttack(opponent)).toEqual([false, 80])
    expect(opponent.board[80]).toEqual({shot:true, ship:false});
  })
})