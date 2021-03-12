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
  it('correctly stores ship position', () => {
    expect(carrier.data.positions).toEqual([0,1,2,3,4])
    expect(sub.data.positions).toEqual([22,23,24])
  })
  it('correctly calculates length', () => {
    expect(carrier.getLength()).toBe(5);
    expect(sub.getLength()).toBe(3);
  })
})