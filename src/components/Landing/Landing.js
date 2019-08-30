import React, { Component } from 'react';
import Switcher from './components/Switcher/Switcher';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './Landing.css';

const landingState = {
  isRegistered: false,
  landingRoute: 'register',
  isScrolled: false
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = landingState;
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleSroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleSroll);
  };

  handleSroll = (event) => {
    const navbar = document.getElementById('landing-nav');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 30) {
      navbar.style.boxShadow = '0 8px 8px rgba(0,0,0, 0.2)';
    } else if (scrollTop === 0 ) {
      navbar.style.boxShadow = '0 8px 8px rgba(0,0,0, 0)';
    }
  };

  switchLandingRoute = (landingRoute) => {
    this.setState({ landingRoute: landingRoute });
    if (landingRoute === 'signin') {
      return this.setState({ isRegistered: true });
    }
    this.setState({ isRegistered: false });
  };

  render() {
    const { isRegistered, landingRoute } = this.state;
    return (
      <div className='landing'>
        <nav id='landing-nav' className='landing-nav'>
          <Switcher
            isRegistered={isRegistered}
            switchLandingRoute={this.switchLandingRoute}
          />
        </nav>
        { landingRoute === 'signin'
          ? <SignIn
              switchLandingRoute={this.switchLandingRoute}
            />
          : <Register
              switchLandingRoute={this.switchLandingRoute}
            /> 
        }
      </div>
    );
  }
}

export default Landing;
