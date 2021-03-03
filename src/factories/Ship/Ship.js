const shipHelpers = (data) => ({
  hit: () => ++data.hull,
  getHull: () => data.hull,
  getLength: () => data.length,
  flipOrientation: () => data.isVertical = !data.isVertical,
  isVertical: () => data.isVertical,
  isSunk: () => data.hull === data.length
  // {
  //   const hitCount = data.hull.reduce((accum, value) => {
  //     if (value) {
  //       return ++accum
  //     }
  //     return accum;
  //   }, 0)
  //   return hitCount === data.length;
  // }
})


const Ship = (length) => {
  const data = {
    length,
    // hull: Array(length).fill(false),
    hull: 0,
    isSunk: false,
    isVertical: true,
  }

  return {
    ...shipHelpers(data),
  }

}

export default Ship;