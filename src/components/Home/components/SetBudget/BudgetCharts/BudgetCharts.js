import React, { Component } from 'react';
import * as d3 from 'd3';
import './BudgetCharts.css';

const dims = { height: 80, width: 100, radius: 50 };
const cent = { x: (dims.width / 2 ), y: (dims.height / 2 + 10) };
const pie = d3.pie()
  .sort(null)
  .value(d => d.cost);

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2.25);

class BudgetCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: dims.width,
      height: dims.height + 20
    };
  };

  componentDidMount = () => {
    this.updateStyleAndAttrs();
  };

  componentDidUpdate = () => {
    this.updateStyleAndAttrs();
  };

  updateStyleAndAttrs = () => {
    const colour = d3.scaleOrdinal([this.props.color,'#F4F4F4']);
  
    function arcTweenUpdate(d) {
      const i = d3.interpolate(this._current, d);
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
  };

  render() {
    const paths = this.props.data.map(d => <path key={d.name}/>);
    return (
      <div id='budget-chart-area' className='budget-chart-area'>
        <svg
          width={this.state.width}
          height={this.state.height}
          ref={el => this.svgEl = el}
        >{ paths }</svg>
      </div>
    )
  }
}

export default BudgetCharts;
