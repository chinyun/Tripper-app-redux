import React, {Component} from 'react';
import { connect } from 'react-redux';
import { submitSignIn } from './../../../../actions';
import 'whatwg-fetch';
import Logo from './../../../../icons/tripper-white-logo.png'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitSignIn: (email, password) => dispatch(submitSignIn(email, password))
  }
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  };

  onEmailChange =(event) => {
    this.setState({ email: event.target.value })
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className='signin'>
        <div className='landing-welcome-words-wrapper'>
          <div className='landing-welcome-words'>
            <p>Welcome back!</p>
            <div className='words-inline'>
              <p>Let</p>
              <img className='tripper-white-logo' alt='tripper-white-logo' src={Logo}/>  
            </div>
            <p>helps balance your Trip budget!</p>
          </div>
        </div>
        <div className='landing-form-wrapper'>
          <div className='landing-form'>
            <div className='landing-form-row'>
              <label className='landing-form-row-title' htmlFor='email-address'>Email</label>
              <input
                className='landing-form-row-input'
                type='email'
                id='email'
                onChange={this.onEmailChange}
              />
            </div>
            <div className='landing-form-row'>
              <label className='landing-form-row-title' htmlFor='password'>Password</label>
              <input
                className='landing-form-row-input'
                type='password'
                id='password'
                onChange={this.onPasswordChange}
              />
            </div>
            <div className='landing-form-submit'>
              <input 
                id='signin-input-submit'
                className='landing-input-submit'
                type='submit'
                value='signin'
                onClick={() => this.props.onSubmitSignIn(email, password)}
              />
            </div>
            <div className='landing-form-alarm'>
              <p className='landing-form-alarm-words'>Don't have an account? Try</p>
              <button 
                className='landing-form-alarm-btn'
                onClick={() => this.props.switchLandingRoute('register')}
              > Register
              </button>
            </div>
          </div>
          <div className='web-info-wrapper'>
            <p className='web-info'>2019 Tripper. Created by Chin Yun Chen. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
