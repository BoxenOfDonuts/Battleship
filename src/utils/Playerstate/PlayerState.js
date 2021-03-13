import Gameboard from '../../factories/Gameboard/Gameboard';
import Ship from '../../factories/Ship/Ship'

const updatePlayerStates = (state, action) => {
  switch (action.id) {
    case "PLACE_SHIP": {
               
      const { name, coordinates } = action;
      const ship = Ship(name, coordinates)
      const shipPlacement = {
        ...state.players[action.player].ships,
        [ship.data.name]: {
          name: name,
          health: coordinates.length,
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

export default updatePlayerStates;