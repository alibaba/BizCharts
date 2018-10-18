import React, { Component } from 'react'
import { DataSet } from '@antv/data-set'
import { Chart, Axis, Geom, Tooltip, Facet, View, Legend, Label, Coord } from "bizcharts";



export default class Sankey extends Component {
  constructor(props) {
    super(props)
    
    this.onChangeMargin = this.onChangeMargin.bind(this)
    this.onChangeRange = this.onChangeRange.bind(this)
  }
  
  state = {
    margin: 10
  }
  
  onChangeMargin(e) {
    this.setState({
      margin: e.target.value
    })
  }

  onChangeRange(v) {
    this.setState({
      margin: v
    })
  }
  render() {
    const data = {"nodes":[{"name":"Brazil"},{"name":"Portugal"},{"name":"France"},{"name":"Spain"},{"name":"England"},{"name":"Canada"},{"name":"Mexico"},{"name":"USA"},{"name":"Angola"},{"name":"Senegal"},{"name":"Morocco"},{"name":"South Africa"},{"name":"Mali"},{"name":"China"},{"name":"India"},{"name":"Japan"}],"links":[{"source":0,"target":1,"value":5},{"source":0,"target":2,"value":1},{"source":0,"target":3,"value":1},{"source":0,"target":4,"value":1},{"source":5,"target":1,"value":1},{"source":5,"target":2,"value":5},{"source":5,"target":4,"value":1},{"source":6,"target":1,"value":1},{"source":6,"target":2,"value":1},{"source":6,"target":3,"value":5},{"source":6,"target":4,"value":1},{"source":7,"target":1,"value":1},{"source":7,"target":2,"value":1},{"source":7,"target":3,"value":1},{"source":7,"target":4,"value":5},{"source":1,"target":8,"value":2},{"source":1,"target":9,"value":1},{"source":1,"target":10,"value":1},{"source":1,"target":11,"value":3},{"source":2,"target":8,"value":1},{"source":2,"target":9,"value":3},{"source":2,"target":12,"value":3},{"source":2,"target":10,"value":3},{"source":2,"target":11,"value":1},{"source":3,"target":9,"value":1},{"source":3,"target":10,"value":3},{"source":3,"target":11,"value":1},{"source":4,"target":8,"value":1},{"source":4,"target":9,"value":1},{"source":4,"target":10,"value":2},{"source":4,"target":11,"value":7},{"source":11,"target":13,"value":5},{"source":11,"target":14,"value":1},{"source":11,"target":15,"value":3},{"source":8,"target":13,"value":5},{"source":8,"target":14,"value":1},{"source":8,"target":15,"value":3},{"source":9,"target":13,"value":5},{"source":9,"target":14,"value":1},{"source":9,"target":15,"value":3},{"source":12,"target":13,"value":5},{"source":12,"target":14,"value":1},{"source":12,"target":15,"value":3},{"source":10,"target":13,"value":5},{"source":10,"target":14,"value":1},{"source":10,"target":15,"value":3}]}

    const { margin } = this.state
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
      edges: d => d.links
    });
    dv.transform({
      type: 'diagram.sankey'
    });

    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };
    return (
      <div>
        调成上边距： <input value={margin} onChange={this.onChangeMargin}/>
        <div>
        	<Chart forceFit={true} height={window.innerHeight} scale={scale} padding={[margin, 100, 80, 80]}>
            <Tooltip showTitle={false} />
            <View data={dv.edges}>
              <Geom
                type="edge"
                position="x*y"
                shape="arc"
                color="#bbb"
                opacity={0.6}
                tooltip={['target*source*value', (target, source, value) => {
                  const name = `<span>${source.name} to ${target.name}</span>`
                  return {
                    name,
                    value
                  }
                }]}
              />
            </View>
            <View data={dv.nodes}>
              <Geom
                type="polygon"
                position="x*y"
                color="name"
                style={{ stroke: '#ccc' }}
                tooltip={['x*y*name', (x, y, name) => {
                  const nameHtml = `<span>${name}</span>`
                  return {
                    name: '',
                    value: nameHtml
                  }
                }]}
              >
                <Label
                  content="name"
                  textStyle={{
                    fill: '#545454',
                    textAlign: 'start'
                  }}
                  offset={0}
                  formatter={val => `    ${val}`}
                />
              </Geom>  
            </View>
          </Chart>
        </div>
      </div>
    )
  }
}