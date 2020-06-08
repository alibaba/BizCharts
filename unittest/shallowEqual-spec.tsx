import shallowEqual from '../src/utils/shallowEqual';

describe('shallowEqual', () => {
  it('should ref data shallowEqual true', () => {
    const data = [{x:1,y:1}];
    expect(
      shallowEqual({ data: data }, { data: data })
    ).toEqual(true)
  });
  it('should defined data shallowEqual false', () => {
    expect(
      shallowEqual({ data: [{x:1,y:1}] }, { data:[{x:1,y:1}] })
    ).toEqual(false)
  });
  it('should some obj shallowEqual false', () => {
    const obj = { data: [{x:1,y:1}] };
    expect(
      shallowEqual(obj, obj)
    ).toEqual(true)
  });
  it('should data shallowEqual', () => {
    expect(
      shallowEqual({ title: 'title' }, {  title: 'title' })
    ).toEqual(true)
  });
  it('should data shallowEqual', () => {
    expect(
      shallowEqual({ title: undefined }, {  title: undefined })
    ).toEqual(true)
  })
})
