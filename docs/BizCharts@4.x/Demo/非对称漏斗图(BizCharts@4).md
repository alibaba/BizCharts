# 非对称漏斗图(BizCharts@4)

```js
import React from 'react';
import {
	Chart,
	Axis,
	Tooltip,
	Facet,
	Coordinate
} from 'bizcharts';

const data = [
  { action: '访问', visitor: 500, site: '站点1' },
  { action: '浏览', visitor: 400, site: '站点1' },
  { action: '交互', visitor: 300, site: '站点1' },
  { action: '下单', visitor: 200, site: '站点1' },
  { action: '完成', visitor: 100, site: '站点1' },
  { action: '访问', visitor: 550, site: '站点2' },
  { action: '浏览', visitor: 420, site: '站点2' },
  { action: '交互', visitor: 280, site: '站点2' },
  { action: '下单', visitor: 150, site: '站点2' },
  { action: '完成', visitor: 80, site: '站点2' },
];

data.sort(function (obj1, obj2) {
  // 从小到大
  return obj1.visitor - obj2.visitor;
});

function Demo() {

	return (
		<Chart
			height={600}
			data={data}
			pure
			padding={[30, 120, 95]}
			autoFit
		>
			<Tooltip
				showTitle={false}
				itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>浏览人数：{pv}</span><br/><span style=&quot;padding-left: 16px&quot;>占比：{percent}</span><br/></li>"
			/>
			<Coordinate  />
			<Axis name="visitor" visible={false} />
			<Axis name="action" visible={false} />
			<Facet
				transpose
				padding={0}
				fields={['site']}
				type="mirror"
				columnTitle={{
					style: {
						fontSize: 14,
						fontWeight: 300,
						fill: '#8d8d8d'
					},
				}}
				eachView={(view, facet) => {
					view
					.interval()
					.position('action*visitor')
					.color('action', ['#BAE7FF', '#69C0FF', '#40A9FF', '#1890FF', '#0050B3'])
					.shape('funnel')
					.tooltip('site*action*visitor', (site, action, visitor) => {
						return {
							name: site,
							value: action + ': ' + visitor,
						};
					})
					.style({
						lineWidth: 1,
						stroke: '#fff',
					})
					.animate({
						appear: {
							animation: 'fade-in'
						},
						update: {
							annotation: 'fade-in'
						}
					});

				data.map((obj) => {
					if (obj.site === facet.columnValue) {
						view.annotation().text({
							top: true,
							position: [obj.action, 'min'],
							content: obj.visitor,
							style: {
								fill: '#fff',
								stroke: null,
								fontSize: 12,
								textAlign: facet.columnIndex ? 'start' : 'end',
								shadowBlur: 2,
								shadowColor: 'rgba(0, 0, 0, .45)',
							},
							offsetX: facet.columnIndex ? 10 : -10,
						});
					}

					return null;
				});
      }}
    />
    
		</Chart>
	)
}

ReactDOM.render(<Demo />, mountNode);
```
