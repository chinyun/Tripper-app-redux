import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { addExpense, deleteExpense } from './../../../../actions';
import Scroll from './Scroll/Scroll';
import List from './List/List';
import Category from './Category/Category.js';
import './Accounts.css';
import AddIcon from './../../../../icons/add-blue-icon.png'; 
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

const mapStateToProps = (state) => {
	return {
		journeyId: state.requestData.journeyId,
		journeyList: state.requestData.journeyList,
		displayedDayId: state.requestData.displayedDayId,
		expenseList: state.requestData.expenseList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCreateNewExpense: (value, index) => dispatch(addExpense(value, index)),
		onDeleteExpense: (list, id, index) => dispatch(deleteExpense(list, id, index))
	}
}

class Accounts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '交通',
			detail: '',
			amount: '',
			isSelecting: false
		};
	};

	createNewExpense = () => {
		const value = {
			category: this.state.category,
			detail: this.state.detail,
			amount: this.state.amount,
			id: this.props.displayedDayId
		}
		const index = this.props.journeyList.findIndex(item => item.id === this.props.journeyId);
    if (index !== -1) {
     this.props.onCreateNewExpense(value, index);
     this.setState({
				category: '交通',
				detail: '',
				amount: ''
			});
			this.props.toggleActive('');
    }
	};

	handleEnter = (event) => {
		if (event.keyCode === 13) {
			this.createNewExpense();
		}
	};

	deleteExpense = (list) => {
		const index = this.props.journeyList.findIndex(item => item.id === this.props.journeyId);
    if (index !== -1) {
    	this.props.onDeleteExpense(list, this.props.displayedDayId, index)
    }
	};

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickHidden);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickHidden);
  };

  handleClickHidden = (event) => {
    if (event.target.id !== 'item-category-btn') {
      this.setState({ isSelecting: false })
    };
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

	handleAdding = (target) => {
		this.props.toggleActive(target);
		this.setState({
			category: '交通',
			detail: '',
			amount: ''
		})
	};

	render() {
		return (
			<div className='accounts'>
				<div className='scroll-wrapper'>
					<Scroll>
		        <ul className='accounts-list'>
		          {this.props.expenseList.map(list => 
		            <List 
		              key={list.id} 
		              list={list}
		              isEditing={this.props.isEditing}
		              onEditing={this.props.onEditing}
		             	// handleUpdateExpense={this.props.handleUpdateExpense}
		             	deleteExpense={this.deleteExpense}
		            /> 
		          )}
		        </ul>
		      </Scroll>
					<div className={this.props.isActived === 'showAddItem' 
						? 'add-item-wrapper add-item-wrapper-bg'
						: 'add-item-wrapper'}
					>
						{ this.props.isActived === 'showAddItem'
							? <div className='add-item'>
									<div className='add-item-content'>
										<Category
											category={this.state.category}
											onCategoryChange={this.onCategoryChange}
											isSelecting={this.state.isSelecting}
											onSelecting={this.onSelecting}
										/>
										<input 
											id='item-detail-input'
											className='item-detail-input' 
											type='text' 
											placeholder='內容'
											value={this.state.detail}
											onChange={this.onDetailValueChange}
										/>
										<input 
											id='item-amount-input' 
											className='item-amount-input'
											type='text' 
											placeholder='金額'
											value={this.state.amount}
											onChange={this.onAmountValueChange}
											onKeyDown={this.handleEnter}
										/>
									</div>
									<div className='item-btn-group'>
										<input 
											id='add-item-submit-input' 
											className='add-submit-input'
											type='submit' 
											value='新增支出'
											onClick={() => this.createNewExpense()}
										/>
										<button
											className='cancel-btn'
											onClick={() => this.handleAdding('')}
										>
											<img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
										</button>
									</div>
								</div>
							: <div className='add-item-btn-wrapper'>
									<button
										className='show-add-btn'
										onClick={() => this.handleAdding('showAddItem')}
									>
										<img className='add-icon-img' alt='add' src={AddIcon}/>
										新增支出項目
									</button>
								</div>
						}
					</div>
				</div>	
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
