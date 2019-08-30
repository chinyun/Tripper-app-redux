import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitRegister } from './../../../../actions';
import 'whatwg-fetch';
import Logo from './../../../../icons/tripper-white-logo.png';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitRegister: (name, email, password) => dispatch(submitRegister(name, email, password))
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  };

  onEmailChange =(event) => {
    this.setState({ email: event.target.value })
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className='register'>
        <div className='landing-welcome-words-wrapper'>
          <div className='landing-welcome-words'>
            <p>Sign up now,</p>
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
              <label className='landing-form-row-title' htmlFor='name'>Username</label>
              <input
                className='landing-form-row-input'
                type='name'
                id='name'
                onChange={this.onNameChange}
              />
            </div>
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
                id='register-input-submit'
                className='landing-input-submit'
                type='submit'
                value='Register'
                onClick={() => this.props.onSubmitRegister(name, email, password)}
              />
            </div>
            <p className='web-vital-info'>NOTES: Tripper is under optimizing. It is recommended&nbsp;
              <span>not to use vital personal information</span> to register or comunicate with the database.</p>
            <div className='landing-form-alarm'>
              <p className='landing-form-alarm-words'>Already has an account? Try</p>
              <button
                className='landing-form-alarm-btn'
                onClick={() => this.props.switchLandingRoute('signin')}
              >Sign in
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
