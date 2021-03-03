import Ship from './Ship';

describe('Test Suite for Ship', () => {
  it('Creates a ship of length 4', () => {
    const boat = Ship(4);
    expect(boat.getLength()).toBe(4);
  })

  it('hit takes a number and marks position as hit', () =>{
    const boat = Ship(3);
    boat.hit();
    expect(boat.getHull()).toEqual(1)
  })
  it('hitting boat sinks it correctly', ()=> {
    const boat = Ship(3);
    boat.hit(1);
    boat.hit(0);
    expect(boat.isSunk()).toBe(false);
    boat.hit(2);
    expect(boat.isSunk()).toBe(true);
  })
  it('orientation handled correctly', () => {
    const boat = Ship(1);
    expect(boat.isVertical()).toBe(true);
    boat.flipOrientation();
    expect(boat.isVertical()).toBe(false);
  })
})