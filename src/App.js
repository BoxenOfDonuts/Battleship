import './App.css';
import Player from './factories/Player/Player';
import Gameboard from './factories/Gameboard/Gameboard';
import Ship from './factories/Ship/Ship';

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

const Board = () => {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  //testing to make sure basic logic is working
  const gameboard = Gameboard()
  gameboard.placeShip(Ship(3), 0, false)
  const player1 = Player(gameboard)

  const test = (index) => {
    console.log(index)
    console.log(gameboard.theBoard())
    player1.attack(gameboard, index)
  }
  // end testing
  
  const renderRow = (row, index) => {
    const rows = Array(10)
    .fill(null)
    .map((value, columnIndex) => {
      return <Square 
        key={`${columns[columnIndex]}${index+1}`}
        coordinate={`${columns[columnIndex]}${index+1}`}
        // see below, its possible to map back to the 0 - 99 if I want both, but seems messy
        // clicky={() => console.log(Number(`${index}${columns.indexOf(columns[columnIndex])}`))}
        clicky={() => test(Number(`${index}${columns.indexOf(columns[columnIndex])}`))}
      />
    })

    return (
      <div
        key={row}
        className="board-row"
      >
        {rows}
      </div>
    )
  }

  return (
    <div className="board">
      {/* maybe just map 0 - 100? then that would correlate to the array. 51 +/-10 would be tile above / below, +/- 1 left / right */}
      {columns.map((value, index) => renderRow(value, index))}
    </div>
  );
}

const Square = (props) => {
  return (
    <button
      className="square"
      // onClick={() => console.log(props.coordinate)}
      onClick={props.clicky}
    >
      {props.value}
    </button>
  )
}

export default App;
