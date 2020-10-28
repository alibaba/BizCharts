import percentage from '../../src/utils/data-transform/percentage';

// 求数据集百分比
describe('percentage', () => {
  it('simple', () => {
    const data = [
      { name: 'a', value: 2},
      { name: 'b', value: 5},
      { name: 'c', value: 3},
    ]
    const res = percentage(data, 'value', 'percentage');
    expect(res.length).toEqual(3);
    expect(res[0].percentage).toEqual(0.2);
    expect(res[1].percentage).toEqual(0.5);
  });
  it('percentage', () => {
    const data = [
      { name: 'a', year: '1991', value: 2},
      { name: 'a', year: '1992', value: 2},
      { name: 'b', year: '1991', value: 5},
      { name: 'b', year: '1992', value: 5},
      { name: 'c', year: '1991', value: 3},
      { name: 'c', year: '1992', value: 3},
    ]
    const res = percentage(data, 'value', 'percentage', 'year');
    expect(res.length).toEqual(6);
    expect(res[0].percentage).toEqual(0.2);
    expect(res[2].percentage).toEqual(0.3);
  });
  it('groupby multi', () => {
    const data = [
      { name: 'a', year: '1991', type: 'a', value: 2},
      { name: 'a', year: '1992', type: 'a', value: 2},
      { name: 'b', year: '1991', type: 'a', value: 5},
      { name: 'b', year: '1992', type: 'a', value: 5},
      { name: 'c', year: '1991', type: 'a', value: 3},
      { name: 'c', year: '1992', type: 'a', value: 3},
      { name: 'a', year: '1991', type: 'b', value: 2},
      { name: 'a', year: '1992', type: 'b', value: 2},
      { name: 'b', year: '1991', type: 'b', value: 5},
      { name: 'b', year: '1992', type: 'b', value: 5},
      { name: 'c', year: '1991', type: 'b', value: 3},
      { name: 'c', year: '1992', type: 'b', value: 3},
    ]
    const res = percentage(data, 'value', 'percentage', ['year', 'type']);
    // console.log(res)
    expect(res.length).toEqual(12);
    expect(res[0].percentage).toEqual(0.2);
    expect(res[2].percentage).toEqual(0.3);
  });
})

