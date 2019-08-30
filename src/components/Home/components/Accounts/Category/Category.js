import React from 'react';
import './Category.css';
import SelectIcon from './../../../../../icons/select-black-icon.png';

const Category = ({ onSelecting, category, isSelecting, onCategoryChange }) => {
  return (
    <div className='item-category'>
      <button
        id='item-category-btn'
        className='item-category-btn'
        onClick={() => onSelecting()}
      >
        {category}
        <span className='item-category-btn-icon'>
          <img 
            className='category-selector-icon-img' 
            alt='select-icon' 
            src={SelectIcon}
          />
        </span>
      </button>
      <div className={ isSelecting === true
        ? 'category-selector-wrapper'
        : 'hidden'
      }>
        <div className='category-selector'>
          <button onClick={() => onCategoryChange('交通')}> 交通 </button>
          <button onClick={() => onCategoryChange('飲食')}> 飲食 </button>
          <button onClick={() => onCategoryChange('住宿')}> 住宿 </button>
          <button onClick={() => onCategoryChange('票券')}> 票券 </button>
          <button onClick={() => onCategoryChange('購物')}> 購物 </button>
        </div>
      </div>
    </div>
  )
}

export default Category;
