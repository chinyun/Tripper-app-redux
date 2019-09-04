import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import SideBar from './components/SideBar/SideBar';
import StaticPannel from './components/StaticPannel/StaticPannel';
import SetBudget from './components/SetBudget/SetBudget';
import Accounts from './components/Accounts/Accounts';
import Charts from './components/Charts/Charts';
import Days from './components/Days/Days';
import Url from './../Api/Api';
import './Home.css';
import SelectIcon from '../../icons/select-black-icon.png';

const getData = (datas) => {
  const total = datas[0].expense,
    traffic = datas[0].traffic_expense,
    food = datas[0].food_expense,
    living = datas[0].living_expense,
    ticket = datas[0].ticket_expense,
    shopping = datas[0].shopping_expense;

  const getPercentage = (target) => {
    if (total === '0') {
      return 0;
    }
    const num = target / total;
    num.toFixed(3);
    let result = (num * 100).toString();
    return result.slice(0, 4);
  };

  const trafficPercentage = getPercentage(traffic),
    foodPercentage = getPercentage(food),
    livingPercentage = getPercentage(living),
    ticketPercentage = getPercentage(ticket),
    shoppingPercentage = getPercentage(shopping);

  const data = [{ 
    name: '交通',
    cost: traffic,
    percentage: `${trafficPercentage}`,
    color: 'traffic-color'
  }, { 
    name: '飲食',
    cost: food,
    percentage: `${foodPercentage}`,
    color: 'food-color'
  }, { 
    name: '住宿',
    cost: living,
    percentage: `${livingPercentage}`,
    color: 'living-color'
  }, {
    name: '票券',
    cost: ticket,
    percentage: `${ticketPercentage}`,
    color: 'ticket-color'
  }, {
    name: '購物',
    cost: shopping,
    percentage: `${shoppingPercentage}`,
    color: 'shopping-color'
  }];

  return data;
};

const mapStateToProps = (state) => {
  return {
    journeys: state.requestData.journeys,
    initialJourney: state.requestData.initialJourney,
    journeyList: state.requestData.journeyList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    const {journeys, initialJourney} = this.props;
    this.state = {
      journeyId: journeys[journeys.length-1].id,
      displayedJourney: initialJourney,
      accounts: initialJourney[0].accountList,
      expenseList: initialJourney[0].accountList[0].expenseList,
      journeyName: journeys[journeys.length-1].name,
      displayedAccountId: initialJourney[0].accountList[0].id,
      displayedDay: initialJourney[0].accountList[0].name,
      countDays: initialJourney[0].accountList.length,
      data: getData(initialJourney),
      currentTotalBudget: + initialJourney[0].traffic_budget + + initialJourney[0].food_budget
        + + initialJourney[0].living_budget + + initialJourney[0].ticket_budget
        + + initialJourney[0].shopping_budget,
      isSelecting: false,
      sidebarHeight: null
    }
    this.homeRef = React.createRef();
  };

  onJourneyChange = (id) => {
    const target = this.props.journeys.filter(item => item.id === id);
    this.setState({
      journeyId: id,
      displayedJourney: target,
      accounts: target[0].accountList,
      expenseList: target[0].accountList[0].expenseList,
      journeyName: target[0].name,
      displayedAccountId: target[0].accountList[0].id,
      displayedDay: target[0].accountList[0].name,
      countDays: target[0].accountList.length,
      data: getData(target)
    });
  };

  onDayChange = (id) => {
    const day = this.state.accounts.filter(item => item.id === id);
    this.setState({
      expenseList: day[0].expenseList,
      displayedAccountId: day[0].id,
      displayedDay: day[0].name,
      isSelecting: false
    });
  };

  handleAddJourney = () => {
    const { journeys } = this.props;
    this.setState({
      journeyId: journeys[journeys.length-1].id,
      displayedJourney: [journeys[journeys.length-1]],
      accounts: journeys[journeys.length-1].accountList,
      expenseList: journeys[journeys.length-1].accountList[0].expenseList,
      journeyName: journeys[journeys.length-1].name,
      displayedAccountId: journeys[journeys.length-1].accountList[0].id,
      displayedDay: journeys[journeys.length-1].accountList[0].name,
      countDays: journeys[journeys.length-1].accountList.length,
      data: getData([journeys[journeys.length-1]])
    })
  };

  handleBudgetsChange = (journey, journeyId) => {
    this.props.updateBudgets(journey, journeyId);
    this.setState({
      displayedJourney: journey,
      currentTotalBudget: + journey[0].traffic_budget + + journey[0].food_budget
        + + journey[0].living_budget + + journey[0].ticket_budget
        + + journey[0].shopping_budget
    })
  };

  handleRemoveJourney = (updatedJourney, delJourneyId) => {
    this.props.removeJourney(updatedJourney, delJourneyId);
    const {journeys, initialJourney} = this.props;
    this.setState({
      journeyId: journeys[journeys.length-1].id,
      displayedJourney: initialJourney,
      accounts: initialJourney[0].accountList,
      expenseList: initialJourney[0].accountList[0].expenseList,
      journeyName: journeys[journeys.length-1].name,
      displayedAccountId: initialJourney[0].accountList[0].id,
      displayedDay: initialJourney[0].accountList[0].name,
      countDays: initialJourney[0].accountList.length,
      data: getData(initialJourney)
    })
  };

  createNewDay = () => {
    const newDay = `Day${this.state.accounts.length + 1}`;
    fetch(`${Url}/accounts`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newDay,
        journey_id: this.state.journeyId
      })
    })
    .then(response => response.json())
    .then(updatedJourney => {
      this.props.addAccount(updatedJourney);
      const newAccount = updatedJourney[0].accountList.filter(item =>
        item.name === newDay);
      this.setState({
        displayedJourney: updatedJourney,
        accounts: updatedJourney[0].accountList,
        expenseList: newAccount[0].expenseList,
        displayedAccountId: newAccount[0].id,
        displayedDay: newAccount[0].name,
        countDays: updatedJourney[0].accountList.length,
        data: getData(updatedJourney)
      });
    })
    .catch(err => alert('unable to add day'));
  };

  handleRemoveAccount = (delAccountId) => {
    fetch(`${Url}/accounts/${delAccountId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(updatedJourney=> {
      this.props.removeAccount(updatedJourney);
      this.setState({
        accounts: updatedJourney[0].accountList,
        expenseList: updatedJourney[0].accountList[0].expenseList,
        displayedAccountId: updatedJourney[0].accountList[0].id,
        displayedDay: updatedJourney[0].accountList[0].name,
        countDays: updatedJourney[0].accountList.length
      })
    })
    .catch(err => alert('unable to delete'));
  };

  handleAddExpense = (updatedJourney, displayedAccountId) => {
    this.props.addExpense(updatedJourney);
    const targetAccount = updatedJourney[0].accountList.filter(item =>
      item.id === displayedAccountId);
    this.setState({
      displayedJourney: updatedJourney,
      accounts: updatedJourney[0].accountList,
      expenseList: targetAccount[0].expenseList,
      data: getData(updatedJourney)
    });
  };

  handleUpdateExpense = (updatedJourney) => {
    this.props.updateExpense(updatedJourney);
    const targetAccount = updatedJourney[0].accountList.filter(item =>
      item.id === this.state.displayedAccountId);
    this.setState({
      displayedJourney: updatedJourney,
      accounts: updatedJourney[0].accountList,
      expenseList: targetAccount[0].expenseList,
      data: getData(updatedJourney)
    })
  };

  handleRemoveExpense = (updatedJourney) => {
    this.props.removeExpense(updatedJourney);
    const targetAccount = updatedJourney[0].accountList.filter(item =>
      item.id === this.state.displayedAccountId);
    this.setState({
      displayedJourney: updatedJourney,
      accounts: updatedJourney[0].accountList,
      expenseList: targetAccount[0].expenseList,
      data: getData(updatedJourney)
    })
  };

  onSelecting = () => {
    if (this.state.isSelecting === false) {
      this.setState({ isSelecting: true })
      this.props.toggleActive('');
    } else {
      this.setState({ isSelecting: false })
    }
  };

  componentDidMount = () => {
    console.log(this.props.journeys);
    console.log(this.props.journeyList);
    console.log(this.props.initialJourney);
    this.calcSideBarHeight();
    window.addEventListener('resize', this.calcSideBarHeight);
    document.addEventListener('click', this.handleClickHidden);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.calcSideBarHeight);
    document.removeEventListener('click', this.handleClickHidden);
  };

  handleClickHidden = (event) => {
    if (event.target.id !== 'days-selector-btn') {
      this.setState({ isSelecting: false })
    }
  };

  calcSideBarHeight = () => {
    const homeNode = this.homeRef.current;
    this.setState({
      sidebarHeight: homeNode.offsetHeight - 40
    })
  };

  render() {
    return (
      <div className='home-container' ref={this.homeRef}>
        <div
          className={this.props.isShowed === true ? 'side-bar-wrapper' : 'hidden'}
          style={{ height: this.state.sidebarHeight }}
        >
          <div className='side-bar'>
            <SideBar
              onJourneyChange={this.onJourneyChange}
              handleAddJourney={this.handleAddJourney}
              handleRemoveJourney={this.handleRemoveJourney}
              isActived={this.props.isActived}
              toggleActive={this.props.toggleActive}
              isEditing={this.props.isEditing}
              onEditing={this.props.onEditing}
            />
          </div>
        </div>
        <div className='main-section'>
          <StaticPannel
            journeyName={this.state.journeyName}
            displayedJourney={this.state.displayedJourney}
            journeyId={this.state.journeyId}
            handleBudgetsChange={this.handleBudgetsChange}
            isEditing={this.props.isEditing}
            onEditing={this.props.onEditing}
          />
          <div className='sub-section'>
            <SetBudget
              journeyId={this.state.journeyId}
              displayedJourney={this.state.displayedJourney}
              handleBudgetsChange={this.handleBudgetsChange}
              isEditing={this.props.isEditing}
              onEditing={this.props.onEditing}
              currentTotalBudget={this.state.currentTotalBudget}
            />
            <div className='minor-section'>
              <Charts
                displayedJourney={this.state.displayedJourney}
                data={this.state.data}
              />
              <div className='accounts-wrapper'>
                <div className='accounts-nav'>
                  <div className='accounts-right-column'>
                    <p className='home-title'>Travel Days</p>
                    <div className='show-days'>
                      <span key={this.state.countDays}>{this.state.countDays}</span>
                      <span>Days</span>
                    </div>
                    <div className='contorl-day'>
                      <button className='add-btn' onClick={() => this.createNewDay()}>
                        <span>新增</span>
                      </button>
                    </div>   
                  </div>
                  <div className='accounts-left-column'>
                    <div className='accounts-days'>
                      <button
                        id='days-selector-btn'
                        className='days-selector-btn'
                        onClick={() => this.onSelecting()}
                      >
                        {this.state.displayedDay}
                        <img className='days-selector-btn-icon-img' alt='select' src={SelectIcon}/>
                      </button>
                      <div className={this.state.isSelecting === true ? 'days-selector-wrapper' : 'hidden'}>
                        <div className='days-selector'>
                          { this.state.accounts.map(day => 
                            <Days 
                              key={day.id} 
                              day={day} 
                              onDayChange={this.onDayChange}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='contorl-day'>
                      <button className='delete-btn' onClick={() => {
                        if(window.confirm(`Are you sure you wish to delete ${this.state.displayedDay} ?`))
                        this.handleRemoveAccount(this.state.displayedAccountId)
                      }}><span>刪除</span>
                      </button>
                    </div>
                  </div>
                </div>
                <Accounts
                  accounts={this.state.accounts}
                  expenseList={this.state.expenseList}
                  displayedAccountId={this.state.displayedAccountId}
                  handleAddExpense={this.handleAddExpense}
                  handleUpdateExpense={this.handleUpdateExpense}
                  handleRemoveExpense={this.handleRemoveExpense}
                  isActived={this.props.isActived}
                  toggleActive={this.props.toggleActive}
                  isEditing={this.props.isEditing}
                  onEditing={this.props.onEditing}
                />
              </div>
              <div className='web-info-wrapper'>
                <p className='web-info'>2019 Tripper. Created by Chin Yun Chen. All Rights Reserved.</p>
              </div>
            </div>
          </div> 
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
