import Gameboard from '../../factories/Gameboard/Gameboard';
import Ship from '../../factories/Ship/Ship';

const updatePlayerStates = (state, action) => {
  switch (action.id) {
    case 'PLACE_SHIP': {
      const { name, coordinates, isVertical } = action;
      const ship = Ship(name, coordinates);
      let leftEdge = '';
      let rightEdge = '';
      if (isVertical) {
        leftEdge = coordinates;
        rightEdge = coordinates;
      } else {
        leftEdge = [coordinates[0]];
        rightEdge = [coordinates[coordinates.length - 1]];
      }
      const shipPlacement = {
        ...state.players[action.player].ships,
        [ship.data.name]: {
          name: name,
          health: coordinates.length,
          leftEdge,
          rightEdge,
        },
      };
      const newBoard = Gameboard.placeShip(
        ship,
        state.players[action.player].board
      );
      return {
        ...state,
        players: {
          ...state.players,
          [action.player]: {
            ...state.players[action.player],
            board: newBoard,
            ships: shipPlacement,
          },
        },
      };
    }
    case 'ATTACK_SQUARE': {
      const { opponent, coordinate } = action;
      const newBoard = [...state.players[opponent].board];
      newBoard[coordinate].shot = true;
      return {
        ...state,
        players: {
          ...state.players,
          [opponent]: {
            ...state.players[opponent],
            board: newBoard,
          },
        },
      };
    }
    case 'ATTACK_SHIP': {
      const { opponent, coordinate } = action;
      const shipKey = state.players[opponent].board[coordinate].ship;
      const ship = state.players[opponent].ships[shipKey];
      const newShips = {
        ...state.players[opponent].ships,
        [shipKey]: {
          ...ship,
          health: ship.health - 1,
        },
      };
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
          },
        },
      };
    }
    case 'SEND_MESSAGE': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'SUNK_MESSAGE_SENT': {
      const { player: opponent, shipKey } = action;
      const ship = state.players[opponent].ships[shipKey];
      const newShips = {
        ...state.players[opponent].ships,
        [shipKey]: {
          ...ship,
          messageSent: true,
        },
      };
      return {
        ...state,
        players: {
          ...state.players,
          [opponent]: {
            ...state.players[opponent],
            ships: newShips,
          },
        },
      };
    }
    case 'UPDATE_REMAINING_SHIPS': {
      const { player: opponent, value } = action;
      return {
        ...state,
        players: {
          ...state.players,
          [opponent]: {
            ...state.players[opponent],
            remainingShips: state.players[opponent].remainingShips + value,
          },
        },
      };
    }
    case 'UPDATE_WINNER': {
      return {
        ...state,
        winner: action.winner,
      };
    }
    case 'GAME_START': {
      return {
        ...state,
        started: action.started,
      };
    }
    case 'RESET': {
      return init();
    }
    default:
      console.log('BAD ACTION ID');
      console.error('BAD ACTION ID');
  }
};

const init = () => {
  const initialState = {
    players: {
      computer: {
        name: 'HAL900',
        board: Array(100)
          .fill(null)
          .map((value, index) => ({ shot: false, ship: false })),
        ships: {},
        remainingShips: 0,
      },
      human: {
        name: 'Player',
        board: Array(100)
          .fill(null)
          .map((value, index) => ({ shot: false, ship: false })),
        ships: {},
        remainingShips: 0,
      },
    },
    message: 'Click on the board to place your ships',
    winner: '',
    started: false,
  };
  return initialState;
};

export { updatePlayerStates, init };
