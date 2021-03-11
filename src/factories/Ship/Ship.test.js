import Ship from './Ship';

describe('Test Suite for Ship', () => {
  let carrier;
  let sub;

  beforeEach(() => {
    carrier = Ship('carrier', [0,1,2,3,4]);
    sub = Ship('sub', [22,23,24]);
  })
  it('creates both ships', () => {
    expect(carrier).toBeDefined()
    expect(sub).toBeDefined()
  })

  it('each ship takes a hit', () => {
    carrier.hit(0);
    sub.hit(24);
    expect(carrier.data.hits).toEqual([0]);
    expect(sub.data.hits).toEqual([24]);
  })
  it('takes multiple hits', () => {
    carrier.hit(0);
    carrier.hit(1);
    carrier.hit(4);
    expect(carrier.data.hits).toEqual([0,1,4])
    expect(carrier.isSunk()).not.toBe(true)
  })
  it('takes multiple hits and sinks', () => {
    carrier.hit(0);
    carrier.hit(1);
    carrier.hit(4);
    expect(carrier.data.hits).toEqual([0,1,4]);
    expect(carrier.isSunk()).not.toBe(true);
    carrier.hit(2);
    // expect(carrier.hit(3)).toBe(true);
    expect(carrier.hit(3)).toBe("carrier");
    expect(carrier.data.hits).toEqual([0,1,4,2,3]);
    expect(carrier.isSunk()).toBe(true);
  })
  it('correctly calculates length', () => {
    expect(carrier.getLength()).toBe(5);
    expect(sub.getLength()).toBe(3);
  })
})