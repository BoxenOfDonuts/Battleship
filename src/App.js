import './App.css';
import ShipTypes from './factories/Ship/ShipTypes';
import Ship from './factories/Ship/Ship'
import Gameboard from './factories/Gameboard/Gameboard';
import Board from './components/Board/Board';
import Player from './factories/Player/Player'
import { useState, useEffect, useReducer} from 'react';
import { act } from 'react-dom/test-utils';

const updatePlayerStates = (state, action) => {
  switch (action.id) {
    case "PLACE_SHIP": {
               
      const { name, coordinates } = action;
      const ship = Ship(name, coordinates)
      const shipPlacement = {
        ...state.players[action.player].ships,
        [ship.data.name]: {
          name: ship.data.name,
          health: ship.getLength(),
        }
      }
      console.log('ran again')
      const newBoard = Gameboard.placeShip(ship, state.players[action.player].board)
      return {
        ...state,
        players: {
          ...state.players,
          [action.player]: {
            ...state.players[action.player],
            board: newBoard,
            ships: shipPlacement
          }
        },
      };
    }
    case "ATTACK_SQUARE": {
      const {opponent, coordinate} = action;
      const newBoard = [...state.players[opponent].board]
      newBoard[coordinate].shot = true;
      return {
        ...state,
        players: {
          ...state.players,
          [opponent]: {
            ...state.players[opponent],
            board: newBoard
          }
        }
      }
    }
    case "ATTACK_SHIP": {
      const {opponent, coordinate} = action;
      const shipKey = state.players[opponent].board[coordinate].ship;
      const ship = state.players[opponent].ships[shipKey];
      const newShips = {
        ...state.players[opponent].ships,
        [shipKey]: {
          ...ship,
          health: ship.health -1
        }
      }
      if (newShips[shipKey].health === 0) {
        newShips[shipKey].isSunk = true;
      }
      return {
        ...state,
        players: {
          ...state.players,
          [opponent]: {
            ...state.players[opponent],
            ships: newShips,
          }
        }
      }
    }
    case "SEND_MESSAGE": {
      return {
        ...state,
        message: action.message
      }
    }
    case "SUNK_MESSAGE_SENT": {
      const { player: opponent, shipKey } = action;
      const ship = state.players[opponent].ships[shipKey];
      console.log(ship)
      const newShips = {
        ...state.players[opponent].ships,
        [shipKey]: {
          ...ship,
          messageSent: true
        }
      }
      return {
        ...state,
        players: {
          ...state.players,
          [opponent]: {
            ...state.players[opponent],
            ships: newShips,
          }
        }
      }
    }

    default:
      console.log("BAD ACTION ID")
      console.error("BAD ACTION ID")
  }

}

const Game = () => {
  const [ game, setGame ] = useReducer(
    updatePlayerStates,
    {
      players: {
        computer: {
          name: "HAL900",
          board: [...Array(100).fill(null).map((value, index) =>({shot: false, ship: false}))],
          ships: {
          },
        },
        human: {
          name: "Joel",
          board: [...Array(100).fill(null).map((value, index) =>({shot: false, ship: false}))],
          ships: {
          },
        },
      },
      message: 'a',
      winner: '',
    }
  )
  const [ turn, setTurn ] = useState(0);
  const [ canClick, setCanClick ] = useState(true);

  const attackCoordinate = async (coordinate) => {
    setGame({id: "ATTACK_SQUARE", coordinate, opponent: 'computer'})
    if (game.players.computer.board[coordinate].ship) {
      setGame({id: "SEND_MESSAGE", message: "Hit Enemy Ship!"})
      setGame({id: "ATTACK_SHIP", coordinate, opponent: 'computer'})
    } else {
      setGame({id: "SEND_MESSAGE", message: "Miss!"})
    }
    setCanClick(false);
  }
  
  useEffect(() => {
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Carrier', coordinates: [0,1,2,3,4]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Battleship', coordinates: [42,43,44,45]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Destoyer', coordinates: [96,97,98]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Submarine', coordinates: [64,65,66]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Patrol Boat', coordinates: [22,23]})
    
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Carrier', coordinates: [0,1,2,3,4]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Battleship', coordinates: [42,43,44,45]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Destoyer', coordinates: [96,97,98]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Submarine', coordinates: [64,65,66]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Patrol Boat', coordinates: [22,23]})
  },[])
  
  useEffect(() => {
    for (let shipKey in game.players.computer.ships) {
      const ship = game.players.computer.ships[shipKey]
      if (ship.isSunk && !ship.messageSent) {
        setGame({id: "SEND_MESSAGE", message: `Sunk enemy ${shipKey}`})
        setGame({id: "SUNK_MESSAGE_SENT", player: 'computer', shipKey})
      }
    }
  },[game.players.computer.ships])

  useEffect(() => {
    for (let shipKey in game.players.human.ships) {
      const ship = game.players.human.ships[shipKey]
      if (ship.isSunk && !ship.messageSent) {
        setGame({id: "SEND_MESSAGE", message: `They Sunk my ${shipKey}`})
        setGame({id: "SUNK_MESSAGE_SENT", player: 'human', shipKey})
      }
    }
  },[game.players.human.ships])
  
  useEffect(() => {
    if (canClick) return;
    setTimeout(() => {
      setCanClick(true);
      setTurn((turn) =>turn+1);
    }, 1000)

  },[canClick])

  useEffect(() => {
    if (turn < 1) return;
    const p = Player()
    const coordinate = p.randomOpenSpot(game.players.human.board)
    setGame({id: "ATTACK_SQUARE", coordinate, opponent: 'human'})
    if (game.players.human.board[coordinate].ship) {
      setGame({id: "SEND_MESSAGE", message: "Hit Enemy Ship!"})
      setGame({id: "ATTACK_SHIP", coordinate, opponent: 'human'})
    } else {
      setGame({id: "SEND_MESSAGE", message: "Miss!"})
    }
  },[turn])

  
  return (
    <div>
      <Board
          gameboard={game.players.human.board}
          ships={game.players.human.ships}
          clickable={false}
      />
      <Board
          gameboard={game.players.computer.board}
          attack={attackCoordinate}
          ships={game.players.computer.ships}
          clickable={canClick}
      />
      <p>{game.message}</p>
    </div>
    );
}

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;