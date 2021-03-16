import './App.css';
import ShipTypes from './factories/Ship/ShipTypes';
import updatePlayerStates from './utils/Playerstate/PlayerState'
import Board from './components/Board/Board';
import Player from './factories/Player/Player'
import Gameboard from './factories/Gameboard/Gameboard';
import { useState, useEffect, useReducer} from 'react';



const Game = () => {
  const [ turn, setTurn ] = useState(0);
  const [ canClick, setCanClick ] = useState(true);
  const [ inventory, setInventory ] = useState(ShipTypes);
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
      started: false,
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
    if (game.players[opponent].board[coordinate].ship) {
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
    }, 1)
  }

  const placeShips = (coordinate) => {
    if (game.started) return;
    const newInventory = inventory.slice(1, inventory.length);
    const ship = inventory[0];
    const coordinates = [coordinate];
    for (let i = 1; i < ship.length; i++) {
      coordinates.push(coordinate + i)
    }
    if (!Gameboard.validPlacement(coordinates, game.players.human.board)) return;
    setInventory(newInventory)
    setGame({id: "PLACE_SHIP", player: 'human', name: ship.name, coordinates})
    setGame({id: 'UPDATE_REMAINING_SHIPS', player: 'human', value: 1})
    if (newInventory.length === 0) {
      setGame({id: 'GAME_START', started: true})
      setGame({id: "SEND_MESSAGE", message: 'Game Start!'})
    }
  }
  
  useEffect(() => {
    if (inventory.length === 0) return;
    const ship = inventory[0];
    const coordinates = Gameboard.randomCoordinates(ship, game.players.computer.board);
    setGame({id: "PLACE_SHIP", player: 'computer', name: ship.name, coordinates})
    setGame({id: 'UPDATE_REMAINING_SHIPS', player: 'computer', value: 1})
  },[inventory])
  
  useEffect(() => {
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
    // set turn to 1 to start? or have stages idk
    if (!game.started|| game.winner) return;
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
          clickable={!game.started}
          onClick={placeShips}
      />
      <Board
          gameboard={game.players.computer.board}
          onClick={handleBoardClick}
          ships={game.players.computer.ships}
          clickable={game.started && canClick}
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