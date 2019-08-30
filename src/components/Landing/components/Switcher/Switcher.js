import React from 'react';
import './Switcher.css';
import SeperateLine from '../../../../icons/seperate-line-white.png';

const Switcher = ({switchLandingRoute, isRegistered}) => {
    return (
      <div>
        <nav className='switcher-nav'>
          <p 
            onClick = {() => switchLandingRoute('signin')} 
            className={ isRegistered === true ? 'switch-on' : 'switch-down'}
          >Sign in</p>
          <img 
            src={SeperateLine}
            alt='seperate-line'
            className='seperate-line'
          />
          <p 
            onClick = {() => switchLandingRoute('register')}
            className={ isRegistered === true ? 'switch-down' : 'switch-on'}
          >Register</p>
        </nav>
      </div>
    );
}

export default Switcher;
