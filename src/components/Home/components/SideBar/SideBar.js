import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { addJourney, editJourneyName } from './../../../../actions';
import Journey from './Journey/Journey';
import Url from './../../../Api/Api';
import './SideBar.css';
import AddIcon from './../../../../icons/add-blue-icon.png'; 
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

const mapStateToProps = (state) => {
  return {
    journeys: state.requestData.journeys,
    initialJourney: state.requestData.initialJourney,
    journeyList: state.requestData.journeyList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddJourney: (value, user) => dispatch(addJourney(value, user)),
    onEditJourneyName: (id, value, index) => dispatch(editJourneyName(id, value, index))
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

	createNewJourney = (value, user) => {
    this.props.onAddJourney(value, user);
    this.props.handleAddJourney();
    this.props.toggleActive('');
    this.setState({ journeyValue: '' });
	};

	handleEnter = (event) => {
		if (event.key === 'Enter') {
			this.createNewJourney();
		}
	};

	editJourneyName = (journeyId) => {
    const index = this.props.journeyList.findIndex((item)=> item.id === journeyId);
    if (index !== -1) {
      this.props.onEditJourneyName(journeyId, this.state.journeyValue, index);
      this.props.onJourneyChange(journeyId);
      this.setState({ journeyValue: '' })
    }
    // this.props.updateJourney(journey);
    
    // fetch(`${Url}/journeys/${journeyId}`, {
    //   method: 'PATCH',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     name: this.state.journeyValue
    //   })
    // })
    // .then(response => response.json())
    // .then(journey => {
    //   this.props.updateJourney(journey);
    //   this.props.onJourneyChange(journeyId);
    //   this.setState({ journeyValue: '' })
    // })
    // .catch(err => alert('unable to edit'));
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
										onClick={() => this.createNewJourney(this.state.journeyValue, this.props.user)}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
