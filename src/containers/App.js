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
    isPending: state.requestLogIn.isPending,
    user: state.requestLogIn.user,
    journeys: state.requestLogIn.journeys,
    initialJourney: state.requestLogIn.initialJourney,
    journeyList: state.requestLogIn.journeyList,
    route: state.requestLogIn.route,
    isSignedIn: state.requestLogIn.isSignedIn,
    error: state.requestLogIn.error
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

  // onRouteChange = (route) => {
  //   this.setState(initialState);
  // };

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

  addJourney = (newJourney) => {
    this.setState({
      journeys: [...this.state.journeys, newJourney[0]],
      journeyList: [...this.state.journeyList, {
        id: newJourney[0].id,
        name: newJourney[0].name
      }]
    })
  };

  updateJourney = (journey) => {
    const index = this.state.journeyList.findIndex((item)=> item.id === journey[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], journey[0]),
          ...this.state.journeys.slice(index + 1)
        ],
        journeyList: [
          ...this.state.journeyList.slice(0, index),
           Object.assign({}, this.state.journeyList[index], journey[1]),
           ...this.state.journeyList.slice(index + 1)
        ]
      });
    }
  };

  updateBudgets = (journey, journeyId) => {
    const index = this.state.journeyList.findIndex(item => item.id === journeyId);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], journey[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  removeJourney = (updatedJourney, delJourneyId) => {
    const index = this.state.journeyList.findIndex(item => item.id === delJourneyId);
    if(index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          ...this.state.journeys.slice(index + 1)
        ],
        journeyList: [
          ...this.state.journeyList.slice(0, index),
          ...this.state.journeyList.slice(index + 1)
        ]
      })
    }
  };

  addAccount = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  removeAccount = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  addExpense = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  updateExpense = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  removeExpense = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  render() {
    const { user, onRouteChange } = this.props;
    return (
      <div className='app'> 
        { this.props.isSignedIn === true
          ? <div className='dashboard'>
              <header>
                <Navigation
                  isShowed={this.state.isShowedSideBar}
                  onShowSideBar={this.onShowSideBar}
                  userName={user.name}
                  onRouteChange={onRouteChange}
                />
              </header>
              <Home
                // initialJourney={journeys.filter(item => item.id === journeys[journeys.length-1].id)}
                addJourney={this.addJourney}
                updateJourney={this.updateJourney}
                updateBudgets={this.updateBudgets}
                removeJourney={this.removeJourney}
                addAccount={this.addAccount}
                removeAccount={this.removeAccount}
                addExpense={this.addExpense}
                updateExpense={this.updateExpense}
                removeExpense={this.removeExpense}
                isShowed={this.state.isShowedSideBar}
                isActived={this.state.isActived}
                toggleActive={this.toggleActive}
                isEditing={this.state.isEditing}
                onEditing={this.onEditing}
              />
            </div>
          : <Landing
              onRouteChange={onRouteChange}
            />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
