const shipInfo = (data) => ({
  isSunk: () => data.positions.every(position => data.hits.includes(position)),
  getLength: () => data.positions.length,
  isVertical: () => data.isVertical,
})

const shipAttacks = (data) => ({
  // hit isn't validating, expecting gameboard to manage that
  hit: (position) => {
    data.hits.push(position);
    return shipInfo(data).isSunk();
  },
})


const Ship = (name, positions) => {
  const data = {
    name,
    positions,
    hits: [],
    isVertical: true,
  }

  return {
    data,
    ...shipAttacks(data),
    ...shipInfo(data),
  }

}

export default Ship;