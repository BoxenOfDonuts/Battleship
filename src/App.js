import './App.css';
import ShipTypes from './factories/Ship/ShipTypes';
import Board from './components/Board/Board';
import Gameboard from './factories/Gameboard/Gameboard';
import Header from './components/Header/Header';
import MessageBoard from './components/Messageboard/MessageBoard';
import { updatePlayerStates, init } from './utils/Playerstate/PlayerState';
import { useState, useEffect, useReducer } from 'react';

const Game = () => {
  const [turn, setTurn] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const [inventory, setInventory] = useState(ShipTypes);
  const [isHovering, setIsHovering] = useState([]);
  const [ isVertical, setIsVertical ] = useState(false);
  const [lastAttempt, setLastAttempt] = useState({
    hit: false,
    positions: [],
    direction: -1,
  });
  const [game, setGame] = useReducer(updatePlayerStates, init(), init);

  const shipSank = (player, ship) => {
    const message =
      player === 'computer' ? `Sank enemy ${ship}` : `They sank my ${ship}`;
    setGame({ id: 'UPDATE_REMAINING_SHIPS', player, value: -1 });
    setGame({ id: 'SEND_MESSAGE', message });
    setGame({ id: 'SUNK_MESSAGE_SENT', player, shipKey: ship });
  };

  const attackCoordinate = (opponent, coordinate) => {
    const message =
      opponent === 'computer' ? 'Hit Enemy Ship!' : 'Enemy hit my Ship!';

    setGame({ id: 'ATTACK_SQUARE', coordinate, opponent });
    if (game.players[opponent].board[coordinate].ship) {
      if (opponent === 'human') {
        const positions = lastAttempt.positions;
        if (lastAttempt.direction === -1) {
          positions.unshift(coordinate);
        } else {
          positions.unshift(coordinate);
        }
        setLastAttempt({ ...lastAttempt, hit: true, positions });
      }
      setGame({ id: 'SEND_MESSAGE', message });
      setGame({ id: 'ATTACK_SHIP', coordinate, opponent });
    } else {
      setGame({ id: 'SEND_MESSAGE', message: 'Miss!' });
      if (opponent === 'human') {
        setLastAttempt({ ...lastAttempt, hit: false });
      }
    }
  };

  const resetGame = () => {
    setTurn(0);
    setCanClick(true);
    setInventory(ShipTypes);
    setLastAttempt({
      hit: false,
      positions: [],
      direction: -1,
    });
    setGame({ id: 'RESET' });
  };

  const handleBoardClick = (coordinate) => {
    if (game.winner || game.players.computer.board[coordinate].shot) return;
    attackCoordinate('computer', coordinate);
    setCanClick(false);
    setTimeout(() => {
      setCanClick(true);
      setTurn((turn) => turn + 1);
    }, 1);
  };

  const placeShips = (coordinate) => {
    if (game.started) return;
    const newInventory = inventory.slice(1, inventory.length);
    const ship = inventory[0];
    const coordinates = [coordinate];
    const movement = isVertical ? 10 : 1;
    for (let i = 1; i < ship.length; i++) {
      coordinates.push(coordinate + (i * movement));
    }
    if (!Gameboard.validPlacement(coordinates, game.players.human.board))
      return;
    setInventory(newInventory);
    setGame({
      id: 'PLACE_SHIP',
      player: 'human',
      name: ship.name,
      coordinates,
    });
    setGame({ id: 'UPDATE_REMAINING_SHIPS', player: 'human', value: 1 });
    if (newInventory.length === 0) {
      setGame({ id: 'GAME_START', started: true });
      setGame({ id: 'SEND_MESSAGE', message: 'Game Start!' });
      setIsHovering([]);
    }
  };

  const handleHoverEffects = (coordinate) => {
    if (game.started) return;
    const ship = inventory[0];
    const coordinates = [coordinate];
    const movement = isVertical ? 10 : 1;
    if (isVertical) {
      for (let i = 1; i < ship.length; i++) {
        coordinates.push(coordinate + (i * movement));
      }
    } else {
      for (let i = 1; i < ship.length && (coordinate + i) % 10 !== 0; i++) {
        coordinates.push(coordinate + (i * movement));
      }
    }
    setIsHovering(coordinates);
  };

  useEffect(() => {
    if (game.started || inventory.length === 0) return;
    const ship = inventory[0];
    const coordinates = Gameboard.randomCoordinates(
      ship,
      game.players.computer.board
    );
    setGame({
      id: 'PLACE_SHIP',
      player: 'computer',
      name: ship.name,
      coordinates,
    });
    setGame({ id: 'UPDATE_REMAINING_SHIPS', player: 'computer', value: 1 });
  }, [inventory]);

  useEffect(() => {
    for (let shipKey in game.players.computer.ships) {
      const ship = game.players.computer.ships[shipKey];
      if (ship.isSunk && !ship.messageSent) {
        shipSank('computer', shipKey);
      }
    }
  }, [game.players.computer.ships]);

  useEffect(() => {
    for (let shipKey in game.players.human.ships) {
      const ship = game.players.human.ships[shipKey];
      if (ship.isSunk && !ship.messageSent) {
        shipSank('human', shipKey);
        setLastAttempt({
          hit: false,
          positions: [],
          direction: -1,
        });
      }
    }
  }, [game.players.human.ships]);

  useEffect(() => {
    if (!game.started || game.winner) return;
    const [direction, coordinate] = Gameboard.determineGuessDirection(game.players.human.board, lastAttempt.hit, lastAttempt.positions, lastAttempt.direction);
    attackCoordinate('human', coordinate);
    setLastAttempt((prevState) => ({ ...prevState, direction}));
  }, [turn]);

  useEffect(() => {
    if (turn < 1 || game.winner) return;
    const { remainingShips: remainingComputerShips } = game.players.computer;
    const { remainingShips: remainingHumanShips } = game.players.human;
    if (remainingComputerShips === 0 || remainingHumanShips === 0) {
      const winner = remainingComputerShips ? 'computer' : 'human';
      setGame({ id: 'UPDATE_WINNER', winner });
      setGame({ id: 'SEND_MESSAGE', message: `${winner} wins!` });
    }
  }, [game.players.computer.remainingShips, game.players.human.remainingShips]);

  let button = '';
  if (game.winner) {
    button = <button onClick={resetGame}>Replay?</button>;
  } else if (!game.started) {
    const message = isVertical ? 'Horizontal': 'Vertical';
    button = <button onClick={() => setIsVertical(!isVertical)}>
      {message}
    </button>;
  }

  return (
    <div className="game">
      <MessageBoard message={game.message} />
      <div className="gameboard">
        <Board
          gameboard={game.players.human.board}
          ships={game.players.human.ships}
          clickable={!game.started}
          onClick={placeShips}
          onHover={handleHoverEffects}
          isHovering={isHovering}
        />
        {game.started && (
          <Board
            gameboard={game.players.computer.board}
            ships={game.players.computer.ships}
            clickable={game.started && canClick}
            onClick={handleBoardClick}
            hideShips={false}
          />
        )}
      </div>
      {button}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Header header={'Battleship!'} />
      <Game />
    </div>
  );
};

export default App;
