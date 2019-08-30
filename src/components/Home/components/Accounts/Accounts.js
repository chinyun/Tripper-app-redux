import React, { Component } from 'react';
import 'whatwg-fetch';
import Scroll from './Scroll/Scroll';
import List from './List/List';
import Category from './Category/Category.js';
import Url from './../../../Api/Api';
import './Accounts.css';
import AddIcon from './../../../../icons/add-blue-icon.png'; 
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

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

  handleEnter = (event) => {
		if (event.keyCode === 13) {
			this.createNewExpense();
		}
	};

	createNewExpense = () => {
		fetch(`${Url}/expenses`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				category: this.state.category,
				detail: this.state.detail,
				amount: this.state.amount,
				account_id: this.props.displayedAccountId
			})
		})
		.then(response => response.json())
		.then(updatedJourney => {
			this.props.handleAddExpense(updatedJourney, this.props.displayedAccountId);
		})
		.catch(err => alert('unable to add expense'));

		this.setState({
			category: '交通',
			detail: '',
			amount: ''
		});

		this.props.toggleActive('');
	};

	deleteExpense = (list) => {
		fetch(`${Url}/expenses/${list.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				category: list.category,
				detail: list.detail,
				amount: list.amount,
				account_id: list.account_id
			})
    })
    .then(response => response.json())
    .then(updatedJourney => {
    	this.props.handleRemoveExpense(updatedJourney);
    })
    .catch(err => alert('unable to delete'));
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
		             	handleUpdateExpense={this.props.handleUpdateExpense}
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

export default Accounts;
