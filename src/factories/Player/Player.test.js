import Player from './Player';
import Gameboard from '../Gameboard/Gameboard';
import Ship from '../Ship/Ship'

describe('Player Test Suite', () => {
  const board = Array(100).fill(null).map((value, index) =>({shot: false, ship: false}));
  
  beforeEach(() => {
    const board = Array(100).fill(null).map((value, index) =>({shot: false, ship: false}));
  })

  // it('Player Creates with a name', () => {
  //   const player = Player('Joel')
  //   expect(player.data.name).toBe('Joel')
  // })
  // it('attacks another player', () => {
  //   const player = Player();
  //   const opponent = Gameboard();
  //   opponent.placeShip(Ship('sub', [0,1,2]))
  //   expect(player.attack(opponent,0)).toBe(true)
  //   expect(player.attack(opponent,9)).toBe(false)
  // })
  // it('cannot attack the same square twice', () => {
  //   const player = Player();
  //   const opponent = Gameboard();
  //   opponent.placeShip(Ship('sub', [0,1,2]))
  //   expect(player.attack(opponent,0)).toBe(true)
  //   // undefined means square was already attacked
  //   expect(player.attack(opponent,0)).toBeUndefined();
  // })
  it('computer attackes open spot', () => {
    const player = Player();
    for (let i = 0; i < board.length; i++) {
      board[i].shot = true;
    }
    board[80].shot = false;
    expect(board[80]).toEqual({shot:false, ship:false});
    expect(player.randomOpenSpot(board)).toBe(80);
  })
})