import React, { useEffect, useState } from 'react';
import {
	Chart,
	Tooltip,
	Interval,
	Axis,
	Legend
} from "../../src";
import '../../src/core';
import { render, act } from '@testing-library/react';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 数据源
const data1 = [
	{
			"type": "核心Topic",
			"dept": "dept1",
			"count": 10
	},
	{
			"type": "跨团队Topic",
			"dept": "dept1",
			"count": 0
	},
	{
			"type": "内部Topic",
			"dept": "dept1",
			"count": 0
	},
	{
			"type": "核心Topic",
			"dept": "dept2",
			"count": 3
	},
	{
			"type": "跨团队Topic",
			"dept": "dept2",
			"count": 2
	},
	{
			"type": "内部Topic",
			"dept": "dept2",
			"count": 5
	}
];

const data2=[
	{
			"type": "核心Topic",
			"dept": "dept3",
			"count": 3
	},
	{
			"type": "跨团队Topic",
			"dept": "dept3",
			"count": 2
	},
	{
			"type": "内部Topic",
			"dept": "dept3",
			"count": 4
	},
	{
			"type": "核心Topic",
			"dept": "dept4",
			"isLeader": true,
			"workNo": "165666",
			"count": 3
	},
	{
			"type": "跨团队Topic",
			"dept": "dept4",
			"count": 0
	},
	{
			"type": "内部Topic",
			"dept": "dept4",
			"count": 5
	}]


class Demo extends React.Component<any, any> {
constructor(props) {
	super(props)
	this.state = { data: data1 }
}
render() {
	const { data } = this.state;
	const summary = data.reduce((pre , cur) => {
		const { dept, count, type } = cur;
		let item = pre.find((p) => p.key === dept);
		if (!item) {
		item = { key: dept, value: count };
		pre.push(item);
		} else item.value += count;
		item[type] = count
		return pre;
	}, []);
	// 排序
	summary.sort((s1, s2) => {
			let v=s2.value - s1.value
			if(v===0) {
			v=s2["核心Topic"] - s1["核心Topic"]
			}
			if(v===0) {
			v=s2["跨团队Topic"] - s1["跨团队Topic"]
			}
			if(v===0) {
			v=s2["内部Topic"] - s1["内部Topic"]
			}
			return v
	});
	
	// 设置X轴刻度值
	const scale = {
			dept: {
			values: summary.map((s) => s.key),
			},
	};
	return (
			<div>
				<a onClick={()=>{this.setState({data:data2})}}>加载data2</a>
				<Chart onGetG2Instance={this.props.onGetG2Instance} height={400} padding="auto" data={data} scale={scale} autoFit 
						>
						<Interval
						adjust={[
						{
								type: 'stack',
								marginRatio: 0,
								},
						]}
						color={['type', (type) => {
								if (type === "核心Topic") {
								return '#ff9328';
								}
								if (type === "跨团队Topic") {
								return '#0384fd';
								}
								if (type === "内部Topic") {
								return '#05bfa5';
								}
								return 'blue';
						}]}
						position="dept*count"
						/>
						<Axis name="dept" label={{ autoHide: false, autoRotate: true}} />
						<Tooltip shared >
								{(title,items) => {
										console.log(title)
										let content=[]
										let sum = 0
										items?.map((v, i) => {
												
												content.push(<li className="g2-tooltip-list-item" data-index style={{listStyleType: 'none', padding: '0px', margin: '12px 0px'}}>
														<span className="g2-tooltip-marker" style={{backgroundColor:v.color, width:'8px', height:'8px', borderRadius:'50%', display:'inline-block', marginRight:'8px'}}></span>
														<span className="g2-tooltip-name">{v.name}</span>: 
														<span className="g2-tooltip-value" style={{display: 'inline-block', float: 'right', marginLeft: '30px'}}>{v.value}</span>
														</li>)
												sum+=parseInt(v.value)
										})
										content.unshift(<li className="g2-tooltip-list-item" data-index style={{listStyleType: 'none', padding: '0px', margin: '12px 0px'}}>
														<span className="g2-tooltip-marker" style={{width:'8px', height:'8px', borderRadius:'50%', display:'inline-block', marginRight:'8px'}}></span>
														<span className="g2-tooltip-name">总计</span>: 
														<span className="g2-tooltip-value" style={{display: 'inline-block', float: 'right', marginLeft: '30px'}}>{sum}</span>
														</li>)
										
										// items 是个数组，即被触发tooltip的数据。
										// 获取items的颜色
										console.log(content)
										return (<div>
												<div className="g2-tooltip-title" style={{marginBottom: "4px"}}>{title}</div>
												<ul className="g2-tooltip-list">{content}</ul>
										</div>)
								}}
						</Tooltip>
				</Chart>
			</div>)
}

}

describe('components-Chart', () => {

  test('数据不变则不更新图表', async () => {
    let chart = null;
    render(<Demo onGetG2Instance={c => chart = c} />);
    
  })
})
