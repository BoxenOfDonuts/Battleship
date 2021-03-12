
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
        openSpots.push(Number(index))
      }
    }
    const randomIndex = Math.floor(Math.random() * openSpots.length);
    const randomAttack = openSpots[randomIndex]
    return [attackOpponent().attack(opponentsGameboard, randomAttack), randomAttack]
  },
  randomOpenSpot: (opponentsGameboard) => {
    let openSpots = [];
    for (let index in opponentsGameboard.board) {
      if(!opponentsGameboard.board[index].shot) {
        openSpots.push(Number(index))
      }
    }
    const randomIndex = Math.floor(Math.random() * openSpots.length);
    const randomAttack = openSpots[randomIndex];
    return randomAttack;
  }

})


const Player = (name) => {
  const data = {
    name,
  }
  return {
    data,
    ...attackOpponent(),
    ...computerAttackOpponent()
  }
}

export default Player;