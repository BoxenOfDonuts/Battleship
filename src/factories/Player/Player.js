
const attackOpponent = () => ({
  attack: (opponentsGameboard, coordinate) => {
    opponentsGameboard.recieveAttack(coordinate);
  }
})

const computerAttackOpponent = () => ({
  computerAttack: (opponentsGameboard) => {
    let openSpots = opponentsGameboard.theBoard().filter(value => {
      if (value === null) {
        return true
      }
      return false;
    })
    const randomAttack = Math.floor(Math.random() * openSpots.length);
    attackOpponent().attack(opponentsGameboard, randomAttack)
  }
})

const Player = (gameboard) => {
  const data = {
    gameboard: () => gameboard,

  }
  return {
    data,
    ...attackOpponent(),
    ...computerAttackOpponent()
  }
}

export default Player;