import pickWithout from '../src/utils/pickWithout';

describe('todos reducer', () => {
  it('should pickWithout a from array', () => {
    const res = pickWithout({ a: 1, b: 2 }, ['a']);
    expect(res.a).toEqual(undefined);
    expect(res.b).toEqual(2);
  });
})

