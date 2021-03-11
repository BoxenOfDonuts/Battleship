import './App.css';
import Player from './factories/Player/Player';
import Gameboard from './factories/Gameboard/Gameboard';
import Ship from './factories/Ship/Ship';
import ShipTypes from './factories/Ship/ShipTypes';
import Board from './components/Board/Board';
import { useState, useEffect, useReducer} from 'react';

const App = () => {
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
  newBoard.placeShip(Ship('Sub', [45,46,47]))
  newBoard.placeShip(Ship('Cruiser', [22,23,24]))
  newBoard.placeShip(Ship('Destroyer', [65,66]))
  return newBoard;
}

const updatePlayerState = (state, action) => {

  switch(action.id) {
    case "attack": 
      const newState = {...state}
      const { coordinate, opponent } = action.params;
      let count = newState[opponent].sunkCount;
      const opponentsBoard ={...state[opponent].board};
      const newBoard = [...opponentsBoard.board];

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
        },
      };
    
    
    case "computerAttack": {
      console.log('hi')
      break;
    }
    case "updateShip": {
      const { opponent, shipType, coordinates } = action.params;
      const ship = Ship(shipType, [...coordinates])
      const opponentsBoard = {...state[opponent].board};
      const newBoard = [...opponentsBoard.board];
      opponentsBoard.placeShip(ship)
      
      return {
        ...state,
        [opponent]: {
          ...state[opponent],
          board: opponentsBoard,
          ships: {
            ...state[opponent].ships,
            shipType: ship,
          }
        }
      }
    }
    case "message": {
      const { message } = action;
      console.log({...state, message,})
      return {
        ...state,
        message,
      }
    }
    case "test": {
      const {coordinate } = action
      const newState = {...state};
      console.log('test card')
      newState.computer.ships[0].hit(coordinate)
      return {
        ...state,
        coomputer: {
          ...state.computer,
          ships: newState.computer.ships[0]
        }
      }
    }
    default:
      console.log('hi')
  }

}

const Game = () => {
  /// okay joel for-real we have to figure out the refactor... ships into its own list or SOMETHING
  // maybe a useEffect when gameboard changes that checks ship status?? or all in one HUGE STATE?? cry.. 
  // the logic needs to be outside the reducer, then can pass in params -.-

  const [ players, setPlayers ] = useReducer(
    updatePlayerState,
    {
      human:
        {
          player: Player("Joel"),
          board: Gameboard(),
          ships: [],
          sunkCount: 0,
          // shipPlacement
        },
      computer:
        {
          player: Player("Bob"),
          board: Gameboard(),
          ships: [],
          sunkCount: 0,
        },
      message: '',
      winner: '',
    }
  );

  const [ turn, setTurn ] = useState(0);

  useEffect(() => {
    // add ships on startup to get started
    // setPlayers({id: 'updateBoard', params: {opponent: 'human'}})
    // setPlayers({id: 'updateBoard', params: {opponent: 'computer'}})
    setPlayers({id: 'updateShip', params: { opponent: 'human', shipType: 'Cruiser', coordinates: [0,1,2,3,4]}})
    setPlayers({id: 'updateShip', params: { opponent: 'computer', shipType: 'Cruiser', coordinates: [0,1,2,3,4]}})
  },[])

  useEffect(() => {
    if (turn < 1) return;
    console.log('fired')
    // const coordinate = players.computer.player.randomOpenSpot(players.human.board);
    // setPlayers({id: 'attack', params: {coordinate, opponent: 'human'}})
    const [isHit, coordinate ] = players.human.player.computerAttack(players.human.board)
    if (isHit) {
      console.log(isHit)
      /// okay okay so the ATTACK doesn't do anything, its up to the HIT
      // god it needs to be a refactor then. I hate having to mange this weird internal state
      setPlayers({id: 'message', message: 'hit!'})
      const isSunk = players.human.board.board[coordinate].ship.hit(coordinate)
      if (isSunk) {
        setPlayers({id: 'message', message: 'Sunk!'})
      } else {
        setPlayers({id: 'message', message: 'Miss!!'})
      }
      
    }
    // is just updating the board at this point
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
      <p>{players.message}</p>
    </div>
)
}

export default App;