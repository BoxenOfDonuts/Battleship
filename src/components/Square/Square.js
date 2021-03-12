import React from 'react'; 

const Square = ({ clickable, attack, coordinate, position, ships }) => {
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
    style['backgroundColor'] = 'blue';
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
      // onClick={() => console.log(position)}
      onClick={() => attack(coordinate)}
    >
    </button>
  )
}

export default React.memo(Square);