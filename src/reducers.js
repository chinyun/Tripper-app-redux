import {
  ROUTE_CHANGE,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_DATA_PENDING,
  REQUEST_DATA_FAILED,
  REQUEST_ADD_JOURNEY_SUCCESS,
  REQUEST_UPDATE_JOURNEY_SUCCESS,
  REQUEST_DELETE_JOURNEY_SUCCESS,
  JOURNEY_CHANGE,
  REQUEST_ADD_DAY_SUCCESS,
  REQUEST_DELETE_DAY_SUCCESS,
  DAY_CHANGE,
  REQUEST_ADD_EXPENSE_SUCCESS,
  REQUEST_DELETE_EXPENSE_SUCCESS,
  REQUEST_UPDATE_EXPENSE_SUCCESS,
  REQUEST_UPDATE_BUDGETS_SUCCESS,
  REQUEST_UPDATE_TOTALBUDGET_SUCCESS
} from './constants.js';

import { getData } from './getdata.js';

const initialStateRoute = {
  route: 'landing'
}

export const routeChange = (state = initialStateRoute, action = {}) => {
  switch(action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { route: 'home' })
    case ROUTE_CHANGE:
      return Object.assign({}, state, { route: action.payload })
    default:
      return state;
  }
}

const initialStateLogin = {
  isPending: false,
  isSignedIn: false,
  error: ''
}

export const requestLogIn = (state = initialStateLogin, action = {}) => {
  switch(action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPending: true })
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { 
        isPending: false,
        isSignedIn: true
      })
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })
    case ROUTE_CHANGE:
      return Object.assign({}, state, { isSignedIn: false })
    default:
      return state;
  }
}

const initialStateData = {
  isPending: false,
  user: {
    id: '',
    name: '',
    email: ''
  },
  journeys: [],
  journeyList: [],
  error: '',
  journeyId: '',
  journeyName: '',
  displayedJourney: {},
  currentTotalBudget: 0,
  accounts: [],
  displayedDayId: '',
  displayedDay: '',
  countDays: 0,
  expenseList: [],
  data: []
}

export const requestData  = (state = initialStateData, action = {}) => {
  switch(action.type) {
    case ROUTE_CHANGE:
      return Object.assign({}, state, initialStateData)

    case REQUEST_DATA_PENDING:
      return Object.assign({}, state, { isPending: true })

    case REQUEST_DATA_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })

    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { 
        isPending: false,
        user: action.payload.user,
        journeys: action.payload.journeys,
        journeyList: action.payload.journeys.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        }),
        journeyId: action.payload.journey[0].id,
        journeyName: action.payload.journey[0].name,
        displayedJourney: action.payload.journey,
        currentTotalBudget: + action.payload.journey[0].traffic_budget + + action.payload.journey[0].food_budget
          + + action.payload.journey[0].living_budget + + action.payload.journey[0].ticket_budget
          + + action.payload.journey[0].shopping_budget,
        accounts: action.payload.journey[0].accountList,
        displayedDayId: action.payload.journey[0].accountList[action.payload.len].id,
        displayedDay: action.payload.journey[0].accountList[action.payload.len].name,
        countDays: action.payload.len + 1,
        expenseList: action.payload.journey[0].accountList[action.payload.len].expenseList,
        data: getData(action.payload.journey)        
      })

    case REQUEST_ADD_JOURNEY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [...state.journeys, action.payload[0]],
        journeyList: [...state.journeyList, {
          id: action.payload[0].id,
          name: action.payload[0].name
        }],
        journeyId: action.payload[0].id,
        journeyName: action.payload[0].name,
        displayedJourney: action.payload,
        currentTotalBudget: 0,
        accounts: action.payload[0].accountList,
        displayedDayId: action.payload[0].accountList[0].id,
        displayedDay: action.payload[0].accountList[0].name,
        countDays: action.payload[0].accountList.length,
        expenseList: action.payload[0].accountList[0].expenseList,
        data: getData(action.payload)
      })

    case REQUEST_UPDATE_JOURNEY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.journey),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        journeyList: [
          ...state.journeyList.slice(0, action.payload.index),
           Object.assign({}, state.journeyList[action.payload.index], action.payload.journeyList),
           ...state.journeyList.slice(action.payload.index + 1)
        ],
        journeyId: action.payload.journeyId,
        journeyName: action.payload.journeyName,
        displayedJourney: action.payload.displayedJourney,
        accounts: action.payload.accountList,
        displayedDayId: action.payload.accountList[action.payload.len].id,
        displayedDay: action.payload.accountList[action.payload.len].name,
        countDays: action.payload.len + 1,
        expenseList: action.payload.accountList[action.payload.len].expenseList,
        data: getData(action.payload.data)
      })

    case REQUEST_DELETE_JOURNEY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        journeyList: [
          ...state.journeyList.slice(0, action.payload.index),
          ...state.journeyList.slice(action.payload.index + 1)
        ],
        currentTotalBudget: + action.payload.data.traffic_budget
          + + action.payload.data.food_budget
          + + action.payload.data.living_budget
          + + action.payload.data.ticket_budget
          + + action.payload.data.shopping_budget,
        journeyId: action.payload.data.id,
        journeyName: action.payload.data.name,
        displayedJourney: [action.payload.data],
        accounts: action.payload.data.accountList,
        displayedDayId: action.payload.data.accountList[action.payload.len].id,
        displayedDay: action.payload.data.accountList[action.payload.len].name,
        countDays: action.payload.data.accountList.length,
        expenseList: action.payload.data.accountList[action.payload.len].expenseList,
        data: getData([action.payload.data])
      })

    case JOURNEY_CHANGE:
      return Object.assign({}, state, {
        journeyId: action.payload.data[0].id,
        journeyName: action.payload.data[0].name,
        displayedJourney: action.payload.data,
        currentTotalBudget: + action.payload.data[0].traffic_budget + + action.payload.data[0].food_budget
          + + action.payload.data[0].living_budget + + action.payload.data[0].ticket_budget
          + + action.payload.data[0].shopping_budget,
        accounts: action.payload.data[0].accountList,
        displayedDayId: action.payload.data[0].accountList[action.payload.len].id,
        displayedDay: action.payload.data[0].accountList[action.payload.len].name,
        countDays: action.payload.len + 1,
        expenseList: action.payload.data[0].accountList[action.payload.len].expenseList,
        data: getData(action.payload.data)
      })


    case REQUEST_ADD_DAY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        displayedJourney: action.payload.data,
        accounts: action.payload.data[0].accountList,
        displayedDayId: action.payload.newAccount[0].id,
        displayedDay: action.payload.newAccount[0].name,
        countDays: action.payload.data[0].accountList.length,
        expenseList: action.payload.newAccount[0].expenseList,
        data: getData(action.payload.data)
      })

    case REQUEST_DELETE_DAY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        accounts: action.payload.data[0].accountList,
        expenseList: action.payload.data[0].accountList[action.payload.len].expenseList,
        displayedDayId: action.payload.data[0].accountList[action.payload.len].id,
        displayedDay: action.payload.data[0].accountList[action.payload.len].name,
        countDays: action.payload.len + 1
      })

    case DAY_CHANGE:
      return Object.assign({}, state, {
        expenseList: action.payload[0].expenseList,
        displayedDayId: action.payload[0].id,
        displayedDay: action.payload[0].name,
      })

    case REQUEST_ADD_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        displayedJourney: action.payload.data,
        accounts: action.payload.data[0].accountList,
        expenseList: action.payload.targetAccount[0].expenseList,
        data: getData(action.payload.data)
      })

    case REQUEST_DELETE_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        displayedJourney: action.payload.data,
        accounts: action.payload.data[0].accountList,
        expenseList: action.payload.targetAccount[0].expenseList,
        data: getData(action.payload.data)
      })

    case REQUEST_UPDATE_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        displayedJourney: action.payload.data,
        accounts: action.payload.data[0].accountList,
        expenseList: action.payload.targetAccount[0].expenseList,
        data: getData(action.payload.data)
      })

    case REQUEST_UPDATE_BUDGETS_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        displayedJourney: action.payload.data,
        currentTotalBudget: + action.payload.data[0].traffic_budget + + action.payload.data[0].food_budget
          + + action.payload.data[0].living_budget + + action.payload.data[0].ticket_budget
          + + action.payload.data[0].shopping_budget
      })

    case REQUEST_UPDATE_TOTALBUDGET_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.data[0]),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        displayedJourney: action.payload.data
      })

    default:
      return state;
  }
}
