import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import { journeyChange, addDay, deleteDay, dayChange } from './../../actions';
import SideBar from './components/SideBar/SideBar';
import StaticPannel from './components/StaticPannel/StaticPannel';
import SetBudget from './components/SetBudget/SetBudget';
import Accounts from './components/Accounts/Accounts';
import Charts from './components/Charts/Charts';
import Days from './components/Days/Days';
import './Home.css';
import SelectIcon from '../../icons/select-black-icon.png';

const mapStateToProps = (state) => {
  return {
    journeys: state.requestData.journeys,
    initialJourney: state.requestData.initialJourney,
    journeyList: state.requestData.journeyList,
    journeyId: state.requestData.journeyId,
    displayedJourney: state.requestData.displayedJourney,
    accounts: state.requestData.accounts,
    expenseList: state.requestData.expenseList,
    journeyName: state.requestData.journeyName,
    displayedDayId: state.requestData.displayedAccountId,
    displayedDay: state.requestData.displayedDay,
    countDays: state.requestData.countDays,
    data: state.requestData.data,
    currentTotalBudget: state.requestData.currentTotalBudget
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onJourneyChange: (target) => dispatch(journeyChange(target)),
    onCreateNewDay: (newDay, id, index) => dispatch(addDay(newDay, id, index)),
    onDeleteDay: (id, index) => dispatch(deleteDay(id, index)),
    onDayChange: (day) => dispatch(dayChange(day))
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelecting: false,
      sidebarHeight: null
    }
    this.homeRef = React.createRef();
  };

  onJourneyChange = (id) => {
    const target = this.props.journeys.filter(item => item.id === id);
    this.props.onJourneyChange(target);
  };

  onDayChange = (id) => {
    const day = this.props.accounts.filter(item => item.id === id);
    this.props.onDayChange(day);
    this.setState({
      isSelecting: false
    });
  };

  createNewDay = (id) => {
    const index = this.props.journeyList.findIndex(item => item.id === id);
    if (index !== -1) {
      const newDay = `Day${this.props.accounts.length + 1}`;
      this.props.onCreateNewDay(newDay, id, index)
    }
  };

  removeDay = (id) => {
    const index = this.props.journeyList.findIndex(item => item.id === this.props.journeyId);
    if (index !== -1) {
      this.props.onDeleteDay(id, index);
    }
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
              isActived={this.props.isActived}
              toggleActive={this.props.toggleActive}
              isEditing={this.props.isEditing}
              onEditing={this.props.onEditing}
            />
          </div>
        </div>
        <div className='main-section'>
          <StaticPannel
            isEditing={this.props.isEditing}
            onEditing={this.props.onEditing}
          />
          <div className='sub-section'>
            <SetBudget
              isEditing={this.props.isEditing}
              onEditing={this.props.onEditing}
            />
            <div className='minor-section'>
              <Charts
                displayedJourney={this.props.displayedJourney}
                data={this.props.data}
              />
              <div className='accounts-wrapper'>
                <div className='accounts-nav'>
                  <div className='accounts-right-column'>
                    <p className='home-title'>Travel Days</p>
                    <div className='show-days'>
                      <span key={this.props.countDays}>{this.props.countDays}</span>
                      <span>Days</span>
                    </div>
                    <div className='contorl-day'>
                      <button 
                        className='add-btn'
                        onClick={() => this.createNewDay(this.props.journeyId)}
                      >
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
                        {this.props.displayedDay}
                        <img className='days-selector-btn-icon-img' alt='select' src={SelectIcon}/>
                      </button>
                      <div className={this.state.isSelecting === true ? 'days-selector-wrapper' : 'hidden'}>
                        <div className='days-selector'>
                          { this.props.accounts.map(day => 
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
                        if(window.confirm(`Are you sure you wish to delete ${this.props.displayedDay} ?`))
                        this.removeDay(this.props.displayedAccountId)
                      }}><span>刪除</span>
                      </button>
                    </div>
                  </div>
                </div>
                <Accounts
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
