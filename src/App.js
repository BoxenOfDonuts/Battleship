import './App.css';
import Player from './factories/Player/Player';
import Gameboard from './factories/Gameboard/Gameboard';
import Ship from './factories/Ship/Ship';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Square = ({coordinate, board, attack, isHit}) => {
  // console.log()
  let style = {}
  if (board[coordinate] === false) {
    style['backgroundColor'] = 'white';
  } else if (board[coordinate] !== null) {
    style['backgroundColor'] = 'blue';
    if (board[coordinate].isSunk()) {
      style['backgroundColor'] = 'grey';
    } else if (isHit) {
      style['backgroundColor'] = 'red';
    }
  }
  
  return (
    <button
      className="square"
      style={style}
      onClick={() => attack(coordinate)}
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

const Game = () => {
  const [board, setBoard] = useState(Gameboard())
  const [player, setPlayer] =useState(null)
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    board.placeShip(Ship(3), 0, false)
    board.placeShip(Ship(5), 55, false)
    board.placeShip(Ship(4), 72, false)
    board.placeShip(Ship(2), 88, false)
    board.placeShip(Ship(1), 26, false)
    console.log(board.theBoard())
    setPlayer(Player(board));
  },[])


  const attackCoordinate = (coordinate) => {
    console.log(board.theBoard()[coordinate])
    player.attack(board, coordinate)
    setUpdate(value => value+1)
  }

  return (
    <div>
      <Board gameboard={board.theBoard()} attack={attackCoordinate}/>
      {/* <Board /> */}
    </div>
  )

}


export default App;
