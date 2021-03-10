import './App.css';
import Player from './factories/Player/Player';
import Gameboard from './factories/Gameboard/Gameboard';
import Ship from './factories/Ship/Ship';
import ShipTypes from './factories/Ship/ShipTypes';
import Board from './components/Board/Board';
import { useState, useEffect, useReducer} from 'react';

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

const updatePlayerState = (state, action) => {
  switch(action.id) {
    case "attack": {
      const newState = {...state}
      const { coordinate, opponent } = action.params;
      let count = newState[opponent].sunkCount;
      const opponentsBoard = {...state[opponent].board};
      const newBoard = {...opponentsBoard.board};

      if (newState[opponent].player.attack(opponentsBoard, coordinate)) {
        const isSunk = newBoard[coordinate].ship.hit(coordinate)
        if (isSunk) {
          count++;
        }
      }
      opponentsBoard.board = newBoard;
      return {
        ...state,
        [opponent]: {
          ...state[opponent],
          board: opponentsBoard,
          sunkCount: count,
        }
      };
    }
    
    case "computerAttack": {
      console.log('hi')
      break;
    }
    case "updateBoard": {
      const { opponent } = action.params;
      const newBoard = fakeSetup(state[opponent].board);
      return {
        ...state,
        [opponent]: {
          ...state[opponent],
          board: newBoard
        }
      }

    }
    default:
      console.log('hi')
  }

}

const Game = () => {
  const [ players, setPlayers ] = useReducer(
    updatePlayerState,
    { human:
      {
        player: Player("Joel"),
        board: Gameboard(),
        ships: [],
        sunkCount: 0,
      },
    computer:
      {
        player: Player("Bob"),
        board: Gameboard(),
        ships: [],
        sunkCount: 0,
      },
    }
  );

  const [ turn, setTurn ] = useState(0);

  useEffect(() => {
    // add ships on startup to get started
    setPlayers({id: 'updateBoard', params: {opponent: 'human'}})
    setPlayers({id: 'updateBoard', params: {opponent: 'computer'}})
  },[])

  useEffect(() => {
    if (turn < 1) return;
    console.log('fired')
    const coordinate = players.computer.player.randomOpenSpot(players.human.board);
    setPlayers({id: 'attack', params: {coordinate, opponent: 'human'}})
  },[turn])

  const attackCoordinate = (coordinate, board) => {
    setPlayers({id: 'attack', params: {coordinate, opponent: 'computer'}})
    setTurn(turn+1)
  }

  return (
    <div>
      <Board gameboard={players.human.board} clickable={false}/>
      <Board gameboard={players.computer.board} attack={attackCoordinate}/>
      <p>{r}</p>
    </div>
  )

}

export default App;