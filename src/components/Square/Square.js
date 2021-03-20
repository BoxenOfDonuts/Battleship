import React from 'react';
import './Square.css';

const Square = ({ handleClick, handleHover, isHovering=[], coordinate, position, ships, hideShips }) => {
  const {shot, ship} = position;
  let classname = 'square';
  let marker = '';

  const hitShot = <svg height="40" width="40">
    <circle cx="20" cy="20" r="12" stroke="black" strokeWidth="1" fill="red" />
    </svg>
  
  const missedShot = <svg height="40" width="40">
    <circle cx="20" cy="20" r="12" stroke="black" strokeWidth="1" fill="white" />
    </svg>

  if (isHovering) {
    classname += isHovering.includes(coordinate)
    ? ' hover-ship'
    : '';
  }

  classname += shot
  ? ' no-click'
  : '';

  if (ship) {
    classname += hideShips && !ships[ship].isSunk
      ? ' hidden'
      : ' ship';
    
    classname += ships[ship].isSunk
      ? ' sunk'
      : '';
    
      marker = shot
     ? hitShot
     : '';
    
     if (coordinate === ships[ship].leftEdge) {
       classname += ' left-edge'
     } else if (coordinate === ships[ship].rightEdge) {
       classname += ' right-edge';
     }
  } else {
    marker = shot
    ? missedShot
    : '';
  }

  const hoverPositions = () => {
    if (!handleHover) return;

    handleHover(coordinate);
  }

  return (
    <div
      className={classname}
      onMouseEnter={hoverPositions}
      onClick={() => handleClick(coordinate)}
    >{marker}
    </div>
  )
}

export default Square;