import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeChange } from '../actions';
import Landing from '../components/Landing/Landing';
import Navigation from '../components/Navigation/Navigation';
import Home from '../components/Home/Home';
import './App.css';
// import logo from './logo.svg';

const mapStateToProps = (state) => {
  return {
    user: state.requestData.user,
    journeys: state.requestData.journeys,
    initialJourney: state.requestData.initialJourney,
    journeyList: state.requestData.journeyList,
    route: state.routeChange.route,
    isSignedIn: state.requestLogIn.isSignedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRouteChange: (route) => dispatch(routeChange(route))
  }
}

const initialState = {
  isShowedSideBar: true,
  isActived: '',
  isEditing: '',
  isSelecting: ''
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };

  componentWillUnmount = () => {
    this.props.onRouteChange('signout');
  };

  onShowSideBar = () => {
    if (this.state.isShowedSideBar === false) {
      this.setState({ isShowedSideBar: true })
    } else {
      this.setState({ isShowedSideBar: false })
    }
    this.setState({
      isEditing: '',
      isActived: ''
    })
  };

  onEditing = (target) => {
    return this.setState({ 
      isEditing: target,
      isActived: ''
    })
  };

  toggleActive = (target) => {
    return this.setState({ 
      isActived: target,
      isEditing: ''
    })
  };

  render() {
    return (
      <div className='app'> 
        { this.props.isSignedIn === true
          ? <div className='dashboard'>
              <header>
                <Navigation
                  isShowed={this.state.isShowedSideBar}
                  onShowSideBar={this.onShowSideBar}
                  userName={this.props.user.name}
                  onRouteChange={this.props.onRouteChange}
                />
              </header>
              <Home
                isShowed={this.state.isShowedSideBar}
                isActived={this.state.isActived}
                toggleActive={this.toggleActive}
                isEditing={this.state.isEditing}
                onEditing={this.onEditing}
              />
            </div>
          : <Landing
              onRouteChange={this.props.onRouteChange}
            />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
