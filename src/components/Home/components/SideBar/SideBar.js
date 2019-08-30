import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import Journey from './Journey/Journey';
import Url from './../../../Api/Api';
import './SideBar.css';
import AddIcon from './../../../../icons/add-blue-icon.png'; 
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

const mapStateToProps = (state) => {
  return {
    user: state.requestLogIn.user,
    journeys: state.requestLogIn.journeys,
    initialJourney: state.requestLogIn.initialJourney,
    journeyList: state.requestLogIn.journeyList,
    route: state.requestLogIn.route
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onRouteChange: (route) => dispatch(routeChange(route))
  }
}

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			journeyValue: ''
		}
	};

	onValueChange = (value) => {
		this.setState({ journeyValue: value })
	};

	handleEnter = (event) => {
		if (event.key === 'Enter') {
			this.createNewJourney();
		}
	};

	createNewJourney = () => {
		fetch(`${Url}/journeys`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.journeyValue,
				budget: 0,
        expense: 0,
        traffic_budget: 0,
        food_budget: 0,
        living_budget: 0,
        ticket_budget: 0,
        shopping_budget: 0,
        user_id: this.props.user.id
			})
		})
		.then(response => response.json())
		.then(newJourney => {
			this.props.handleAddJourney(newJourney);
			this.props.onJourneyChange(newJourney[0].id);
			this.setState({ journeyValue: '' });
			this.props.toggleActive('');
		})
		.catch(err => alert('unable to create'));
	};

	editJourneyName = (journeyId) => {
    fetch(`${Url}/journeys/${journeyId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.journeyValue
      })
    })
    .then(response => response.json())
    .then(journey => {
      this.props.updateJourney(journey);
      this.props.onJourneyChange(journeyId);
      this.setState({ journeyValue: '' })
    })
    .catch(err => alert('unable to edit'));
  };

	deleteJourney = ( delJourneyId ) => {
		fetch(`${Url}/journeys/${delJourneyId}`, {
			method: 'DELETE',
		})
		.then(response => response.json())
		.then(updatedJourney=> {
			this.props.handleRemoveJourney(updatedJourney, delJourneyId);
		})
		.catch(err => alert('unable to delete'));
	};

	render( ) {
		return (
			<div className='journeys-list-wrapper'>
				<ul className='journeys-list'>
					{this.props.journeyList.map(journey => 
						<Journey
							key={journey.id}
							journey={journey}
							onValueChange={this.onValueChange}
							onJourneyChange={this.props.onJourneyChange}
							onEditing={this.props.onEditing}
							editJourneyName={this.editJourneyName}
							isEditing={this.props.isEditing}
							deleteJourney={this.deleteJourney}
						/>
					)}
				</ul>
				<div className='add-journey-wrapper'>
					{ this.props.isActived === 'showAddJourney'
						? <div className='add-journey'>
								<input 
									id='add-journey-input'
									className='add-journey-input' 
									type='text' 
									placeholder='新增行程表'
									value={this.state.journeyValue}
									onChange={(event) => this.onValueChange(event.target.value)}
									onKeyDown={this.handleEnter}
								/>
								<div className='add-journey-btn-group'>
									<input 
										id='add-journey-submit' 
										className='add-submit-input'
										type='submit' 
										value='新增旅程'
										onClick={() => this.createNewJourney()}
									/>
									<button
										className='cancel-btn'
										onClick={() => this.props.toggleActive('')}
									>
										<img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
									</button>
								</div>
							</div>	
						: <button
								className='show-add-btn'
								onClick={() => this.props.toggleActive('showAddJourney')}
							>
								<img className='add-icon-img' alt='add' src={AddIcon}/>
								新增旅程
							</button>
					}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
