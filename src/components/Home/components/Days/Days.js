import React from 'react';
import './Days.css';

const Days = ({ day, handleDayChange }) => {
  return (
    <button 
      className='days-option-btn' 
      onClick={() => handleDayChange(day.id)}
    >
      {day.name}
    </button>
  )
}

export default Days;

