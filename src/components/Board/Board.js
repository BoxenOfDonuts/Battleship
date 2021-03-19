import { memo } from 'react';
import Square from '../Square/Square';

const Board = (props) => {
  let classname = 'board';

  classname += props.clickable
    ? ''
    : ' no-click';

  const renderRow = (index) => {
    const start = index * 10;
    const rows = Array(10)
    .fill(null)
    .map((value, columnIndex) => {
      const boardIndex = start+columnIndex;
      return <Square
        key={boardIndex}
        coordinate={boardIndex}
        handleClick={props.onClick}
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
    <div className={classname}>
      {Array(10).fill(null).map((value, index) => renderRow(index))}
    </div>
  );
}

export default memo(Board);