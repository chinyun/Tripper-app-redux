import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { editExpense } from './../../../../../actions';
import Category from '../Category/Category.js';
import './List.css';
import UpdateIcon from './../../../../../icons/update-blue-icon.png';
import CancelIcon from './../../../../../icons/cancel-dark-icon.png';
import ConfirmIcon from './../../../../../icons/confirm-green-icon.png';

const mapStateToProps = (state) => {
  return {
    journeyId: state.requestData.journeyId,
    journeyList: state.requestData.journeyList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditExpense: (expense) => dispatch(editExpense(expense))
  }
}

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: this.props.list.category,
      detail: this.props.list.detail,
      amount: this.props.list.amount,
      isSelecting: false
		};
	}

  handleEnter = (event, expense) => {
    if (event.key === 'Enter') {
      this.editExpense(expense);
    }
  };

	editExpense = (list) => {
    const value = {
      category: this.state.category,
      detail: this.state.detail,
      amount: this.state.amount,
      account_id: list.account_id,
      id: list.id
    }
    const index = this.props.journeyList.findIndex(item => item.id === this.props.journeyId);
    if (index !== -1) {
      this.props.onEditExpense(value, index);
      this.props.onEditing('');
    }  
	};
  
  handleClickHidden = (event) => {
    if (event.target.id !== 'item-category-btn') {
      this.setState({ isSelecting: false })
    }
  };

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickHidden);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickHidden);
  };

  onEditingChange = (list) => {
    this.props.onEditing(`list ${list.id}`);
    this.setState({ category: list.category })
  };

  onCategoryChange = (category) => { 
    this.setState({
      category: category,
      isSelecting: false
    })
  };

  onSelecting = () => {
    if (this.state.isSelecting === false) {
      return this.setState({ isSelecting: true })
    } 
    this.setState({ isSelecting: false })
  };

  onDetailValueChange = (event) => {
    this.setState({ detail: event.target.value })
  };

  onAmountValueChange = (event) => {
    this.setState({ amount: event.target.value })
  };

	render() {
		const { list } = this.props;
		return (
			<li id={list.id} className='accounts-list-item-wrapper'>
				{ this.props.isEditing === `list ${list.id}`
					? <div className='accounts-list-item-update'>
							<div className='accounts-list-item'> 
								<div className='list-item-update'>
									<Category
										category={this.state.category}
										onCategoryChange={this.onCategoryChange}
										isSelecting={this.state.isSelecting}
										onSelecting={this.onSelecting}
									/>
					        <input 
					          id='item-detail-update-input'
					          className='item-detail-update-input' 
					          type='text' 
					          placeholder={list.detail}
					          value={this.state.detail}
					          onChange={this.onDetailValueChange}
                    onKeyDown={(event) => this.handleEnter(event, list)}
					        />
					        <input 
					          id='item-amount-update-input' 
					          className='item-amount-update-input'
					          type='text' 
					          placeholder={list.amount}
					          value={this.state.amount}
					          onChange={this.onAmountValueChange}
                    onKeyDown={(event) => this.handleEnter(event, list)}
					        />
					        <div className='delete-item'>
					        	<button
						        	className='delete-btn'
						        	onClick={() => this.props.deleteExpense(list)}
						        >
						        	<span>刪除</span>
						        </button>
					        </div>
					      </div>
							</div>
							<div className='item-control-btn-group'>
								<div className='item-control-btn-wrapper'>
									<button
										className='list-item-control-btn'
										onClick={() => this.onEditingChange('')} 
									>
										<img className='cancel-btn-img' alt='cancel-icon'src={CancelIcon}/>	
									</button>
								</div>
								<div className='item-control-btn-wrapper'>
									<button
										className='list-item-control-btn'
										onClick={() => this.editExpense(list)}
									>
										<img className='confirm-btn-img' alt='confirm-icon' src={ConfirmIcon}/>
									</button>
								</div>
							</div>
						</div>
					: <div className='accounts-list-item'>
							<div className='list-item-group'>
								<span className='list-item-category'>
									{list.category}
								</span>
								<span className='list-item-detail'>
									{list.detail}
								</span>
								<span className='list-item-amount'>
									{list.amount}
								</span>
							</div>
							<button
								className='update-btn' 
								onClick={() => this.onEditingChange(list)}
							>
                <img className='update-icon-img' alt='update' src={UpdateIcon}/>
              </button>
						</div>
					}
			</li>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
