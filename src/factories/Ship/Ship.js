const shipHelpers = (data) => ({
  // hit isn't validating, expecting gameboard to manage that
  hit: (position) => data.hits.push(position),
  isSunk: () => data.positions.every(position => data.hits.includes(position)),
  getLength: () => data.positions.length,
  isVertical: () => data.isVertical,
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
    ...shipHelpers(data),
  }

}

export default Ship;