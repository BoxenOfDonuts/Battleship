import React from 'react';
import './Square.css';

const Square = ({
  handleClick,
  handleHover,
  isHovering = [],
  coordinate,
  position,
  ships,
  hideShips,
}) => {
  const { shot, ship } = position;
  let classname = 'square';
  let marker = '';

  const hitShot = (
    <svg height="40" width="40">
      <circle
        cx="20"
        cy="20"
        r="12"
        stroke="black"
        strokeWidth="1"
        fill="red"
      />
    </svg>
  );

  const missedShot = (
    <svg height="40" width="40">
      <circle
        cx="20"
        cy="20"
        r="12"
        stroke="black"
        strokeWidth="1"
        fill="white"
      />
    </svg>
  );

  if (isHovering) {
    classname += isHovering.includes(coordinate) ? ' hover-ship' : '';
  }

  classname += shot ? ' no-click' : '';

  if (ship) {
    classname += hideShips && !ships[ship].isSunk ? ' hidden' : ' ship';

    classname += ships[ship].isSunk ? ' sunk' : '';

    marker = shot ? hitShot : '';

    // check if ship is vertical or not and style that way I guess
    if (ships[ship].isVertical) {
      classname += ' vertical';
      if(coordinate === ships[ship].coordinates[0]) {
        classname += ' top';
      }
      if (coordinate === ships[ship].coordinates[ships[ship].coordinates.length -1]) {
        classname += ' bottom';
      }
    } else {
      classname += ' bottom top';
      if(coordinate === ships[ship].coordinates[0]) {
        classname += ' left-edge';
      }
      if (coordinate === ships[ship].coordinates[ships[ship].coordinates.length -1]) {
        classname += ' right-edge';
      }
    }

  } else {
    marker = shot ? missedShot : '';
  }

  const hoverPositions = () => {
    if (!handleHover) return;

    handleHover(coordinate);
  };

  return (
    <div
      className={classname}
      onMouseEnter={hoverPositions}
      onClick={() => handleClick(coordinate)}
    >
      {marker}
    </div>
  );
};

export default Square;
