import React from 'react'; 

const Square = ({coordinate, board, attack, clickable}) => {
  // console.log()
  const {shot, ship} = board.board[coordinate];
  let style = {}

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

export default React.memo(Square);