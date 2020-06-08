import { pickEventName } from '../src/components/Chart/events';

describe('todos reducer', () => {
  const noop = () => {};
  it('should pickout g2 event name', () => {
    const res: any[] = pickEventName({
      onClick: noop,
      onLineClick: noop,
      onAxisMouseleave: noop,
      onLegendTitleMouseleave: noop,
      onTooltipShow: noop,
      onAfterrender: noop,
    }).map(d => d[1]);
    expect(res.includes('click')).toEqual(true);
    expect(res.includes('line:click')).toEqual(true);
    expect(res.includes('axis:mouseleave')).toEqual(true);
    expect(res.includes('legend-title:mouseleave')).toEqual(true);
    expect(res.includes('tooltip:show')).toEqual(true);
    expect(res.includes('afterrender')).toEqual(true);
  });
})

