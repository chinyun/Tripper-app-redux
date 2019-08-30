import React from 'react';
import './Legend.css';

const Legend  = ({ data, color }) => {
  return (
    <li className='legend-list'>
    <div className='legend-list-column-left'>
      <div className={`legend-circle ${color}`}></div>
      <span className='legend-category'>{data.name}</span>
    </div>
    <div className='legend-list-column-middle'>
      <span className='legend-cost'>{data.cost}</span>
    </div>
    <div className='legend-list-column-right'>
      <span className='legend-percentage'>{data.percentage}</span>
      <span className='legend-percentage'>%</span>
    </div>
    </li>
  )
}

export default Legend;
