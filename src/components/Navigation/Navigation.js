import React from 'react';
import './Navigation.css';
import SeperateLine from './../../icons/seperate-line-dark.png';

const Navigation = ({ onShowSideBar, isShowed, onRouteChange, userName }) => {
	return (
		<nav className='navigation'>
			<button onClick={() => onShowSideBar()}>
				{isShowed === false ? 'Journey' : 'Close'}
			</button>
			<div className='nav-text-wrapper'>
				<span className='nav-text-logo'>Tripper</span>
				<span className='nav-text-slogan'>
					Help balance your trip budget!
				</span>
			</div>
			<div className='nav-user'>
				<span className='nav-user-name'>
					{`Hi, ${userName}`}
				</span>
				<img 
          className='seperate-line-img'
          alt='seperate-line'
          src={SeperateLine}
        />
				<button onClick={() => onRouteChange('signout')}>
					Logout
				</button>
			</div>
		</nav>
	)
};

export default Navigation;
