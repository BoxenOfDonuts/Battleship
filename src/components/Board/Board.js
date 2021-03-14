import { memo } from 'react';
import Square from '../Square/Square';

const Board = (props) => {
  const renderRow = (index) => {
    const start = index * 10;
    const rows = Array(10)
    .fill(null)
    .map((value, columnIndex) => {
      const boardIndex = start+columnIndex;
      return <Square 
        key={boardIndex}
        coordinate={boardIndex}
        attack={props.attack}
        clickable={props.clickable}
        ships={props.ships}
        position={props.gameboard[boardIndex]}
        hideShips={props.hideShips}
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

export default memo(Board);