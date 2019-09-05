import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { editBudgets } from './../../../../actions'
import BudgetCharts from './BudgetCharts/BudgetCharts';
import './SetBudget.css';
import CancelIcon from './../../../../icons/cancel-dark-icon.png';
import UpdateIcon from './../../../../icons/update-blue-icon.png';

const mapStateToProps = (state) => {
  return {
    displayedJourney: state.requestData.displayedJourney,
    journeyId: state.requestData.journeyId,
    journeyList: state.requestData.journeyList,
    currentTotalBudget: state.requestData.currentTotalBudget
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditBudgets: (data, id, index) => dispatch(editBudgets(data, id, index))
  }
}

class SetBudget extends Component {
	constructor(props) {
		super(props);
		this.state = {
      updateValue: 0
		}
	};

  handleDataType = (type) => {
    const { displayedJourney } = this.props;
    switch(type) {
      case 'traffic':
        return [{ 
          name: '支出',
          cost: displayedJourney[0].traffic_expense
        },{
          name: '剩餘可支配預算',
          cost: displayedJourney[0].traffic_budget - displayedJourney[0].traffic_expense
        }]
      case 'food':
        return [{ 
          name: '支出',
          cost: displayedJourney[0].food_expense
        },{
          name: '剩餘可支配預算',
          cost: displayedJourney[0].food_budget - displayedJourney[0].food_expense
        }]
      case 'living':
        return [{ 
          name: '支出',
          cost: displayedJourney[0].living_expense
        },{
          name: '剩餘可支配預算',
          cost: displayedJourney[0].living_budget - displayedJourney[0].living_expense
        }]
      case 'ticket':
        return [{ 
          name: '支出',
          cost: displayedJourney[0].ticket_expense
        },{
          name: '剩餘可支配預算',
          cost: displayedJourney[0].ticket_budget - displayedJourney[0].ticket_expense
        }]
      case 'shopping':
        return [{ 
          name: '支出',
          cost: displayedJourney[0].shopping_expense
        },{
          name: '剩餘可支配預算',
          cost: displayedJourney[0].shopping_budget -displayedJourney[0].shopping_expense
        }]
      default:
        return []
    }
  };

  handleColour = (type) => {
    switch(type) {
      case 'traffic':
        return '#FBC2A2'
      case 'food':
        return '#7BF7C9'
      case 'living':
        return '#F9FCBC'
      case 'ticket':
        return '#ECA9FF'
      case 'shopping':
        return '#E488FC'
      default:
        return '#F4F4F4'
    }
  };

  onBudgetChange = (event) => {
    this.setState({ updateValue: event.target.value })
  };

	handleEditBudgets = (event, type) => {
    const data ={[`${type}_budget`]: this.state.updateValue};
		if (event.keyCode === 13) {
      const index = this.props.journeyList.findIndex(item => item.id === this.props.journeyId);
      if (index !== -1) {
        this.props.onEditBudgets(data, this.props.journeyId, index);
  	    this.props.onEditing('');
        this.setState({ updateValue: 0 })
  		}
  	}
  }

	render() {
		const { isEditing, displayedJourney, onEditing } = this.props;
		return (
			<div className='budget-wrapper'>
        <div className='budget-info'>
          <p className='home-title'>Budgets</p>
          <p className='budget-summary'>
            <span>Total</span>
            <span>{this.props.currentTotalBudget}</span>
            <span>(100%)</span>
          </p>
        </div>
				<div className='budget'>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>交通預算</p>
                <div className='budget-update-wrapper'>
								{ isEditing === 'traffic' 
                  ? <div className='budget-update'>
                      <input 
                        id='traffic-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={displayedJourney[0].traffic_budget}
                        onChange={this.onBudgetChange}
                        onKeyDown={(event) => this.handleEditBudgets(event, 'traffic')}
                      />
                      <button 
                        className='cancel-btn'
                        onClick={() => onEditing('')}
                      >
                        <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{displayedJourney[0].traffic_budget}</p>
											<button
                        className='update-btn'
                        onClick={() => onEditing('traffic')}
                      >
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
                </div>
							</div>
							<div className={ displayedJourney[0].traffic_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>支出</p>
								<p>{displayedJourney[0].traffic_expense}</p>
							</div>
							<div className={ displayedJourney[0].traffic_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>剩餘</p>
								<p>{displayedJourney[0].traffic_budget - displayedJourney[0].traffic_expense}</p>
							</div>
						</div>
            { displayedJourney[0].traffic_budget === '0'
              ? <div className='initial-budgetchart'><p>No Budget yet.</p></div>
              : <BudgetCharts
                  data={this.handleDataType('traffic')}
                  color={this.handleColour('traffic')}
                />
              }
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>飲食預算</p>
                <div className='budget-update-wrapper'>
								{ isEditing === 'food' 
                  ? <div className='budget-update'>
                      <input
                        id='food-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={displayedJourney[0].food_budget}
                        onChange={this.onBudgetChange}
                        onKeyDown={(event) => this.handleEditBudgets(event, 'food')}
                      />
                      <button
                        className='cancel-btn'
                        onClick={() => onEditing('')}
                      >
                        <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{displayedJourney[0].food_budget}</p>
											<button
                        className='update-btn'
                        onClick={() => onEditing('food')}
                      >
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
                </div>
							</div>
							<div className={ displayedJourney[0].food_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>支出</p>
								<p>{displayedJourney[0].food_expense}</p>
							</div>
							<div className={ displayedJourney[0].food_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>剩餘</p>
								<p>{displayedJourney[0].food_budget - displayedJourney[0].food_expense}</p>
							</div>
						</div>
            { displayedJourney[0].food_budget === '0'
              ? <div className='initial-budgetchart'><p>No Budget yet.</p></div>
              : <BudgetCharts
                  data={this.handleDataType('food')}
                  color={this.handleColour('food')}
                />
            }
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>住宿預算</p>
                <div className='budget-update-wrapper'>
								{ isEditing === 'living' 
                  ? <div className='budget-update'>
                      <input 
                        id='living-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={displayedJourney[0].living_budget}
                        onChange={this.onBudgetChange}
                        onKeyDown={(event) => this.handleEditBudgets(event, 'living')}
                      />
                      <button
                        className='cancel-btn'
                        onClick={() => onEditing('')}
                      >
                        <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{displayedJourney[0].living_budget}</p>
											<button
                        className='update-btn'
                        onClick={() => onEditing('living')}
                      >
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
                </div>
							</div>
							<div className={ displayedJourney[0].living_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>支出</p>
								<p>{displayedJourney[0].living_expense}</p>
							</div>
							<div className={ displayedJourney[0].living_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>剩餘</p>
								<p>{displayedJourney[0].living_budget - displayedJourney[0].living_expense}</p>
							</div>
						</div>
            { displayedJourney[0].living_budget === '0'
              ? <div className='initial-budgetchart'><p>No Budget yet.</p></div>
              : <BudgetCharts
                  data={this.handleDataType('living')}
                  color={this.handleColour('living')}
                />
            }
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>票券預算</p>
                <div className='budget-update-wrapper'>
								{ isEditing === 'ticket' 
                  ? <div className='budget-update'>
                      <input 
                        id='ticket-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={displayedJourney[0].ticket_budget}
                        onChange={this.onBudgetChange}
                        onKeyDown={(event) => this.handleEditBudgets(event, 'ticket')}
                      />
                      <button 
                        className='cancel-btn'
                        onClick={() => onEditing('')}
                      >
                        <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{displayedJourney[0].ticket_budget}</p>
											<button
                        className='update-btn'
                        onClick={() => onEditing('ticket')}
                      >
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
                </div>
							</div>
							<div className={ displayedJourney[0].ticket_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>支出</p>
								<p>{displayedJourney[0].ticket_expense}</p>
							</div>
							<div className={ displayedJourney[0].ticket_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>剩餘</p>
								<p>{displayedJourney[0].ticket_budget - displayedJourney[0].ticket_expense}</p>
							</div>
						</div>
            { displayedJourney[0].ticket_budget === '0'
              ? <div className='initial-budgetchart'><p>No Budget yet.</p></div>
              : <BudgetCharts
                  data={this.handleDataType('ticket')}
                  color={this.handleColour('ticket')}
                />
            }
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>購物預算</p>
                <div className='budget-update-wrapper'>
								{ isEditing === 'shopping' 
                  ? <div className='budget-update'>
                      <input 
                        id='shopping-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={displayedJourney[0].shopping_budget}
                        onChange={this.onBudgetChange}
                        onKeyDown={(event) => this.handleEditBudgets(event, 'shopping')}
                      />
                      <button
                        className='cancel-btn'
                        onClick={() => onEditing('')}
                      >
                        <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{displayedJourney[0].shopping_budget}</p>
											<button
                        className='update-btn'
                        onClick={() => onEditing('shopping')}
                      >
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
                </div>
							</div>
							<div className={ displayedJourney[0].shopping_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>支出</p>
								<p>{displayedJourney[0].shopping_expense}</p>
							</div>
							<div className={ displayedJourney[0].shopping_expense === '0' 
                ? 'budget-detail hidden' 
                : 'budget-detail'
              }>
								<p>剩餘</p>
								<p>{displayedJourney[0].shopping_budget - displayedJourney[0].shopping_expense}</p>
							</div>
						</div>
            { displayedJourney[0].shopping_budget === '0'
              ? <div className='initial-budgetchart'><p>No Budget yet.</p></div>
              : <BudgetCharts
                  data={this.handleDataType('shopping')}
                  color={this.handleColour('shopping')}
                />
            }   
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SetBudget);
