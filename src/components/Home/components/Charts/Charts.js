import React, { Component } from 'react';
import * as d3 from 'd3';
import Legend from './Legend/Legend';
import './Charts.css';

const dims = { height: 100, width: 200, radius: 80 };
const cent = { x: (dims.width / 2), y: (dims.height / 2 + 50) };
const pie = d3.pie()
    .sort(null)
    .value(d => d.cost);

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2.25);

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: dims.width,
      height: dims.height + 100,
      isShowed: false    
    };
  };

  componentDidMount = () => {
    this.updateStyleAndAttrs();
  };

  componentDidUpdate = () => {
    this.updateStyleAndAttrs();   
  };

  updateStyleAndAttrs = () => {
    const colour = d3.scaleOrdinal(['#FBC2A2','#7BF7C9','#F9FCBC','#ECA9FF','#E488FC']);

    function arcTweenUpdate(d) {
      var i = d3.interpolate(this._current, d);
      this._current = i(1);
      return function(t) {
        return arcPath(i(t));
      }
    };

    d3.select(this.svgEl)
      .selectAll('path')
      .data(pie(this.props.data))
      .attr('transform', `translate(${cent.x}, ${cent.y})`)
      .attr('class', 'arc')
      .attr('fill', d => colour(d.data.name));

    d3.select(this.svgEl)
      .selectAll('path')
      .attr('d', arcPath)
      .transition().duration(750)
      .attrTween('d', arcTweenUpdate);
  }

  render() {
    const paths = this.props.data.map(d => <path key={d.name}/>)
    return (
      <div className='charts-wrapper'>
        <div className='charts-info'>
          <p className='home-title'>
            Data
            <span className='home-subtitle'>Expense</span>
          </p>
          <p className='charts-summary'>
            <span>Total</span>
            <span>{this.props.displayedJourney[0].expense}</span>
            <span>(100%)</span>
          </p>
        </div>
       { this.props.displayedJourney[0].expense === '0'
          ? <div className='initial-chart'>
              <p>There is no Expense yet.</p>
            </div>
          : <div className='charts'>
              <div id='chart-area' className='chart-area'>
                <svg
                  width={this.state.width}
                  height={this.state.height}
                  ref={el => this.svgEl = el}
                >{ paths }</svg>
              </div>
              <ul className='chart-legend'>
              { this.props.data.map(d => 
                <Legend
                  key={d.name}
                  data={d}
                  color={d.color}
                /> 
              )}
              </ul> 
            </div>
        }
      </div>
    );
  }
}

export default Charts;
