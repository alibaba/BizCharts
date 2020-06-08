import transBooleanCfg from '../../src/utils/transBooleanCfg';

describe('pickWithout', () => {
  it('should pickWithout a from array', () => {
    const res = transBooleanCfg({
      title: false,
      grid: true,
      line: null,
    }, ['title', 'grid', 'line']);
    expect(res.title).toEqual(null);
    expect(res.grid).toEqual({});
    expect(res.line).toEqual(null);
  });
})

