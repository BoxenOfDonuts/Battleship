import './App.css';
import Player from './factories/Player/Player';
import Gameboard from './factories/Gameboard/Gameboard';
import Ship from './factories/Ship/Ship';
import ShipTypes from './factories/Ship/ShipTypes';
import { useState, useEffect, useRef} from 'react';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Square = ({coordinate, board, attack, clickable}) => {
  // console.log()
  const {shot, ship} = board.board[coordinate];
  let style = {}
  // if (board[coordinate] === false) {
  //   style['backgroundColor'] = 'white';
  // } else if (board[coordinate] !== null) {
  //   style['backgroundColor'] = 'blue';
  //   if (board[coordinate].isSunk()) {
  //     style['backgroundColor'] = 'grey';
  //   } else if (isHit) {
  //     style['backgroundColor'] = 'red';
  //   }
  // }

  if (!ship) {
    if(shot) {
      style['backgroundColor'] = 'gray';
    } else {
      style['backgroundColor'] = 'white';
    }
  } else if (ship) {
    style['backgroundColor'] = 'blue';
    if (shot) {
      style['backgroundColor'] = 'red';
    }
    if (ship.isSunk()) {
      style['backgroundColor'] = 'black';
    }
  }

  if (clickable ===false || shot) {
    style['pointerEvents'] = 'none';
  }
  
  return (
    <button
      className="square"
      style={style}
      onClick={() => attack(coordinate, board)}
    >
    </button>
  )
}

const Board = (props) => {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  const renderRow = (index) => {
    const start = index * 10;
    const rows = Array(10)
    .fill(null)
    .map((value, columnIndex) => {
      const boardIndex = start+columnIndex;
      return <Square 
        key={boardIndex}
        coordinate={boardIndex}
        board={props.gameboard}
        attack={props.attack}
        clickable={props.clickable}
      />
    })

    return (
      <div
        key={index}
        className="board-row"
      >
        {rows}
      </div>
    )
  }

  return (
    <div className="board">
      {/* {columns.map((value, index) => renderRow(value, index))} */}
      {Array(10).fill(null).map((value, index) => renderRow(index))}
    </div>
  );
}

const fakeSetup = (board) => {
  board.placeShip(Ship('Carrier', [0,1,2,3,4]))
  board.placeShip(Ship('Battleship', [95,96,97,98]))
  board.placeShip(Ship('Battleship', [45,46,47,48]))
  board.placeShip(Ship('Destroyer', [22,23,24]))
  board.placeShip(Ship('Destroyer', [26,27,28]))
  board.placeShip(Ship('Destroyer', [65,66,67]))
  return board
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
    setMyBoard({...newState});
  },[turn])

  const attackCoordinate = (coordinate, board) => {
    const newState = {...board};
    const newBoard = [...newState.board];
    if (players[1].attack(newState, coordinate)) {
      newBoard[coordinate].ship.hit(coordinate)
    }
    newState.board = newBoard;
    setOpponentsBoard({...newState});
    setTurn(turn+1)
  }

  return (
    <div>
      <Board gameboard={myBoard} attack={attackCoordinate} clickable={false}/>
      <Board gameboard={opponentsBoard} attack={attackCoordinate}/>
      {/* <Board /> */}
    </div>
  )

}

export default App;