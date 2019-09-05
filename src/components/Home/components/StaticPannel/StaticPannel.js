import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { editTotalBudget } from './../../../../actions';
import './StaticPannel.css';
import UpdateIcon from './../../../../icons/update-blue-icon.png';
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

const mapStateToProps = (state) => {
  return {
    journeyId: state.requestData.journeyId,
    journeyList: state.requestData.journeyList,
    displayedJourney: state.requestData.displayedJourney,
    journeyName: state.requestData.journeyName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditTotalBudget: (budget, id, index) => dispatch(editTotalBudget(budget, id, index))
  }
}

class StaticPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: this.props.displayedJourney[0].budget
    }
  }

  onBudgetChange = (event) => {
    this.setState({ budget: event.target.value })
  };

  handleEditTotalBudget = (event) => {
    if (event.key === 'Enter') {
      const index = this.props.journeyList.findIndex(item => item.id === this.props.journeyId);
      if (index !== -1) {
        this.props.onEditTotalBudget(this.state.budget, this.props.journeyId, index);
        this.setState({
          budget: this.props.displayedJourney[0].budget
        });
        this.props.onEditing('');
      }
    }
  }

  render() {
    const { journeyName, displayedJourney, isEditing, onEditing } = this.props;
    return (
      <div className='static-pannel-wrapper'>
        <p className='home-title'>
          Journey
          <span key={journeyName} className='home-subtitle'>{journeyName}</span>
        </p>
        <div className='static-pannel'>
          <div className='static-pannel-section-wrapper'>
            <div className='static-pannel-section'>
              <div className='static-pannel-topic'>
                <p className='static-pannel-title'>目標</p>
                <p className='static-pannel-subtitle'>總預算</p>
              </div>
              <div className='static-pannel-update'>
              { isEditing === 'budget' 
                ? <div className='total-budget-update'>
                    <input 
                      id='total-budget-input'
                      className='static-pannel-input' 
                      type='text' 
                      placeholder={displayedJourney[0].budget}
                      onChange={this.onBudgetChange}
                      onKeyDown={this.handleEditTotalBudget}
                    />
                    <button className='cancel-btn' onClick={() => onEditing('')}>
                      <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
                    </button>
                  </div>
                : <div key={displayedJourney[0].name} className='static-pannel-text'>
                    <span>{displayedJourney[0].budget}</span>
                    <button className='update-btn'onClick={() => onEditing('budget')}>
                      <img className='update-icon-img' alt='update' src={UpdateIcon}/>
                    </button>
                  </div>
              }
              </div>
            </div>
          </div>
          <div className='static-pannel-section-wrapper'>
            <div className='static-pannel-section'>
              <div className='static-pannel-topic'>
                <p className='static-pannel-title'>支出</p>
                <p className='static-pannel-subtitle'>總支出</p>
              </div>
              <span key={displayedJourney[0].expense} className='static-pannel-amount'>
                {displayedJourney[0].expense}
              </span>
            </div>
          </div>
          <div className='static-pannel-section-wrapper'>
            <div className='static-pannel-section'>
              <div className='static-pannel-topic'>
                <p className='static-pannel-title'>剩餘</p>
                <p className='static-pannel-subtitle'>可支配預算</p>
              </div>
              <span
                key={displayedJourney[0].budget - displayedJourney[0].expense}
                className='static-pannel-amount'
              >
                {displayedJourney[0].budget - displayedJourney[0].expense}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticPannel);
