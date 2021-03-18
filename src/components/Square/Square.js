import React from 'react';
import './Square.css'

const Square = ({ handleClick, coordinate, position, ships, hideShips }) => {
  const {shot, ship} = position;
  let classname = 'square';
  let marker = '';

  const hitShot = <svg height="40" width="40">
    <circle cx="20" cy="20" r="12" stroke="black" stroke-width="1" fill="red" />
    </svg>
  
  const missedShot = <svg height="40" width="40">
    <circle cx="20" cy="20" r="12" stroke="black" stroke-width="1" fill="white" />
    </svg>

  if (!ship && shot) {
    // classname += ' miss';
    marker = missedShot;
  } else if (ship) {
    hideShips && !shot
    ? classname += ' hidden'
    : classname += ' ship';
    if (shot) {
      // classname += ' hit';
      marker = hitShot;
      if (ships[ship].isSunk) {
        classname += ' sunk';
      }
    }
    if (coordinate === ships[ship].leftEdge) {
      classname += ' left-edge'
    } else if (coordinate === ships[ship].rightEdge) {
      classname += ' right-edge';
    }
  }

  return (
    <div
      className={classname}
      onClick={() => handleClick(coordinate)}
    >{marker}
    </div>
  )
}

export default Square;