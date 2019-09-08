import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { addJourney, editJourneyName, deleteJourney } from './../../../../actions';
import Journey from './Journey/Journey';
import './SideBar.css';
import AddIcon from './../../../../icons/add-blue-icon.png'; 
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

const mapStateToProps = (state) => {
  return {
    user: state.requestData.user,
    journeys: state.requestData.journeys,
    initialJourney: state.requestData.initialJourney,
    journeyList: state.requestData.journeyList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddJourney: (value, user) => dispatch(addJourney(value, user)),
    onEditJourneyName: (id, value, index) => dispatch(editJourneyName(id, value, index)),
    onDeleteJourney: (id, index) => dispatch(deleteJourney(id, index))
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
    this.props.toggleActive('');
    this.setState({ journeyValue: '' });
	};

	handleEnter = (event, value, user) => {
		if (event.key === 'Enter') {
			this.createNewJourney(value, user);
		}
	};

	editJourneyName = (journeyId) => {
    const index = this.props.journeyList.findIndex((item)=> item.id === journeyId);
    if (index !== -1) {
      this.props.onEditJourneyName(journeyId, this.state.journeyValue, index);
      this.setState({ journeyValue: '' })
    }
  };

	deleteJourney = ( delJourneyId ) => {
    const index = this.props.journeyList.findIndex(item => item.id === delJourneyId);
    if(index !== -1) {
      this.props.onDeleteJourney(delJourneyId, index);
    }
	};

	render( ) {
    const { journeyValue } = this.state;
		return (
			<div className='journeys-list-wrapper'>
				<ul className='journeys-list'>
					{this.props.journeyList.map(journey => 
						<Journey
							key={journey.id}
							journey={journey}
							onValueChange={this.onValueChange}
							handleJourneyChange={this.props.handleJourneyChange}
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
									value={journeyValue}
									onChange={(event) => this.onValueChange(event.target.value)}
									onKeyDown={(event) => this.handleEnter(event, journeyValue, this.props.user)}
								/>
								<div className='add-journey-btn-group'>
									<input 
										id='add-journey-submit' 
										className='add-submit-input'
										type='submit' 
										value='新增旅程'
										onClick={() => this.createNewJourney(journeyValue, this.props.user)}
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
