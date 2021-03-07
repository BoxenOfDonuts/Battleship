
import Gameboard from '../Gameboard/Gameboard'

const attackOpponent = () => ({
  attack: (opponentsGameboard, coordinate) => {
    if (opponentsGameboard.board[coordinate].shot === true) return;
    return opponentsGameboard.recieveAttack(coordinate);
  }
})

const computerAttackOpponent = () => ({
  computerAttack: (opponentsGameboard) => {
    // let openSpots = opponentsGameboard.board.map((value, index) => {
    //   if (value.shot || value.ship) {
    //     return value;
    //   }
    //   return index;
    // })
    let openSpots = [];
    for (let index in opponentsGameboard.board) {
      if(!opponentsGameboard.board[index].shot) {
        openSpots.push(index)
      }
    }
    const randomAttack = Math.floor(Math.random() * openSpots.length);
    return [attackOpponent().attack(opponentsGameboard, randomAttack), randomAttack]
  }
})

const Player = (name) => {
  const data = {
    name,
    ships: [],
    gameboard: () => Gameboard(),

  }
  return {
    data,
    ...attackOpponent(),
    ...computerAttackOpponent()
  }
}

export default Player;