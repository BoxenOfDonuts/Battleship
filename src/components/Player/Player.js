import Gameboard from '../Gameboard/Gameboard';


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
    console.log(`open spots ${openSpots}`)
    const randomAttack = Math.floor(Math.random() * openSpots.length);
    attackOpponent().attack(opponentsGameboard, randomAttack)
  }
})

const Player = () => {
  const data = {
    gameboard: () => Gameboard(),

  }
  return {
    data,
    ...attackOpponent(),
    ...computerAttackOpponent()
  }
}

export default Player;