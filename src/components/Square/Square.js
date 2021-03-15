import React from 'react';

const Square = ({ clickable, handleClick, coordinate, position, ships, hideShips }) => {
  // console.log()
  const {shot, ship} = position;
  let style = {}

  if (!ship) {
    if(shot) {
      style['backgroundColor'] = 'gray';
    } else {
      style['backgroundColor'] = 'white';
    }
  } else if (ship) {
    hideShips
    ? style['backgroundColor'] = 'white'
    : style['backgroundColor'] = 'blue';
    if (shot) {
      style['backgroundColor'] = 'red';
      if (ships[ship].isSunk) {
        style['backgroundColor'] = 'black';
      }
    }
  }

  if (clickable ===false || shot) {
    style['pointerEvents'] = 'none';
  }
  
  return (
    <button
      className="square"
      style={style}
      onClick={() => handleClick(coordinate)}
    >
    </button>
  )
}

export default Square;