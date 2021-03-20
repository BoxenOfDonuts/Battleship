import Player from './Player';
import Gameboard from '../Gameboard/Gameboard';
import Ship from '../Ship/Ship';

describe('Player Test Suite', () => {
  const board = Array(100)
    .fill(null)
    .map((value, index) => ({ shot: false, ship: false }));

  beforeEach(() => {
    const board = Array(100)
      .fill(null)
      .map((value, index) => ({ shot: false, ship: false }));
  });
  it('computer attackes open spot', () => {
    const player = Player();
    for (let i = 0; i < board.length; i++) {
      board[i].shot = true;
    }
    board[80].shot = false;
    expect(board[80]).toEqual({ shot: false, ship: false });
    expect(player.randomOpenSpot(board)).toBe(80);
  });
});
