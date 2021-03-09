import './App.css';
import Player from './factories/Player/Player';
import Gameboard from './factories/Gameboard/Gameboard';
import Ship from './factories/Ship/Ship';
import ShipTypes from './factories/Ship/ShipTypes';
import Board from './components/Board/Board';
import { useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const fakeSetup = (board) => {
  const newBoard = {...board}
  newBoard.placeShip(Ship('Carrier', [0,1,2,3,4]))
  newBoard.placeShip(Ship('Battleship', [95,96,97,98]))
  newBoard.placeShip(Ship('Battleship', [45,46,47,48]))
  newBoard.placeShip(Ship('Destroyer', [22,23,24]))
  newBoard.placeShip(Ship('Destroyer', [26,27,28]))
  newBoard.placeShip(Ship('Destroyer', [65,66,67]))
  return newBoard
}

const Game = () => {
  const [ players, setPlayers ] = useState([Player("Joel"), Player("Bob")]);
  const [ myBoard, setMyBoard ] = useState(Gameboard());
  const [ opponentsBoard, setOpponentsBoard ] = useState(Gameboard());
  const [ turn, setTurn ] = useState(0);

  useEffect(() => {
    // add ships on startup to get started
    setMyBoard({...fakeSetup(myBoard)})
    setOpponentsBoard({...fakeSetup(opponentsBoard)})
  },[])

  useEffect(() => {
    if (turn < 1) return;
    console.log('this fired')
    const newState = {...myBoard};
    const newBoard = [...newState.board];
    const [didHit, coordinate] = players[0].computerAttack(newState);
    if (didHit) {
      newBoard[coordinate].ship.hit(coordinate)
    }
    newState.board = newBoard;
    setMyBoard(newState);
  },[turn])

  const attackCoordinate = (coordinate, board) => {
    const newState = {...board};
    const newBoard = [...newState.board];
    if (players[1].attack(newState, coordinate)) {
      const isSunk = newBoard[coordinate].ship.hit(coordinate);
      // honk hon ship sank
    }
    newState.board = newBoard;
    setOpponentsBoard({...newState});
    setTurn(turn+1)
  }

  return (
    <div>
      <Board gameboard={myBoard} attack={attackCoordinate} clickable={false}/>
      <Board gameboard={opponentsBoard} attack={attackCoordinate}/>
    </div>
  )

}

export default App;