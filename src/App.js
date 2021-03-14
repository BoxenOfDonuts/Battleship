import './App.css';
import ShipTypes from './factories/Ship/ShipTypes';
import updatePlayerStates from './utils/Playerstate/PlayerState'
import Board from './components/Board/Board';
import Player from './factories/Player/Player'
import { useState, useEffect, useReducer} from 'react';



const Game = () => {
  const [ turn, setTurn ] = useState(0);
  const [ canClick, setCanClick ] = useState(true);
  const [ game, setGame ] = useReducer(
    updatePlayerStates,
    {
      players: {
        computer: {
          name: "HAL900",
          board: Array(100).fill(null).map((value, index) =>({shot: false, ship: false})),
          ships: {},
          remainingShips: 0,
        },
        human: {
          name: "Joel",
          board: Array(100).fill(null).map((value, index) =>({shot: false, ship: false})),
          ships: {},
          remainingShips: 0,
        },
      },
      message: 'Click on your opponents board to begin!',
      winner: '',
    }
  )

  const shipSank = (player, ship) => {
    const message = player === 'computer'
      ? `Sank enemy ${ship}`
      : `They sank my ${ship}`;
    setGame({id: "UPDATE_REMAINING_SHIPS", player, value: -1})
    setGame({id: "SEND_MESSAGE", message})
    setGame({id: "SUNK_MESSAGE_SENT", player, shipKey: ship})
  }

  const attackCoordinate = (opponent, coordinate)=> {
    const message = opponent === 'computer'
      ? "Hit Enemy Ship!"
      : "Enemy hit my Ship!";

    setGame({id: "ATTACK_SQUARE", coordinate, opponent})
    if (game.players.computer.board[coordinate].ship) {
      setGame({id: "SEND_MESSAGE", message})
      setGame({id: "ATTACK_SHIP", coordinate, opponent})
    } else {
      setGame({id: "SEND_MESSAGE", message: "Miss!"})
    }
  }

  const handleBoardClick = (coordinate) => {
    if (game.winner) return;
    attackCoordinate('computer', coordinate);
    setCanClick(false);
    setTimeout(() => {
      setCanClick(true);
      setTurn((turn) =>turn+1);
    }, 1000)
  }
  
  useEffect(() => {
    // just so it doesn't replace them everytime it re-compiles
    if (game.players.computer.board[0].ship !== false) return;
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Carrier', coordinates: [0,1,2,3,4]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Battleship', coordinates: [42,43,44,45]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Destoyer', coordinates: [96,97,98]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Submarine', coordinates: [64,65,66]})
    setGame({id: "PLACE_SHIP", player: 'computer', name: 'Patrol Boat', coordinates: [22,23]})
    // should increment on each ship not sure if in own switch or together but hacked together for testing now
    setGame({id: 'UPDATE_REMAINING_SHIPS', player: 'computer', value: 5})


    setGame({id: "PLACE_SHIP", player: 'human', name: 'Carrier', coordinates: [0,1,2,3,4]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Battleship', coordinates: [42,43,44,45]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Destoyer', coordinates: [96,97,98]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Submarine', coordinates: [64,65,66]})
    setGame({id: "PLACE_SHIP", player: 'human', name: 'Patrol Boat', coordinates: [22,23]})
    setGame({id: 'UPDATE_REMAINING_SHIPS', player: 'human', value: 5})
  },[])
  
  useEffect(() => {
    console.log('fired twice')
    for (let shipKey in game.players.computer.ships) {
      const ship = game.players.computer.ships[shipKey]
      if (ship.isSunk && !ship.messageSent) {
        shipSank('computer', shipKey);
      }
    }
  },[game.players.computer.ships])
  
  useEffect(() => {
    for (let shipKey in game.players.human.ships) {
      const ship = game.players.human.ships[shipKey]
      if (ship.isSunk && !ship.messageSent) {
        shipSank('human', shipKey);
      }
    }
  },[game.players.human.ships])

  useEffect(() => {
    if (turn < 1 || game.winner) return;
    const p = Player()
    const coordinate = p.randomOpenSpot(game.players.human.board)
    attackCoordinate('human', coordinate)
  },[turn])

  useEffect(() => {
    if (turn < 1 || game.winner) return;
    const { remainingShips:remainingComputerShips } = game.players.computer;
    const { remainingShips:remainingHumanShips } = game.players.human;
    if (remainingComputerShips === 0 || remainingHumanShips === 0) {
      const winner = remainingComputerShips ? 'computer': 'human';
      setGame({id: 'UPDATE_WINNER', winner})
      setGame({id: 'SEND_MESSAGE', message: `${winner} wins!`})

    }
  },[game.players.computer.remainingShips, game.players.human.remainingShips])

  
  return (
    <div>
      <p>{game.message}</p>
      <Board
          gameboard={game.players.human.board}
          ships={game.players.human.ships}
          clickable={false}
      />
      <Board
          gameboard={game.players.computer.board}
          attack={handleBoardClick}
          ships={game.players.computer.ships}
          clickable={canClick}
          hideShips={true}
      />
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