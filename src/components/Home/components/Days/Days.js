import React from 'react';
import './Days.css';

const Days = ({ day, onDayChange }) => {
  return (
    <button 
      className='days-option-btn' 
      onClick={() => onDayChange(day.id)}
    >
      {day.name}
    </button>
  )
}

export default Days;

