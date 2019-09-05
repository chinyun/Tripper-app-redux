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

const initialStateLogin = {
  isPending: false,
  isSignedIn: false,
  error: ''
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
  initialJourney: {},
  journeyList: [],
  error: '',
  journeyId: '',
  displayedJourney: {},
  accounts: [],
  expenseList: [],
  journeyName: '',
  displayedDayId: '',
  displayedDay: '',
  countDays: 0,
  data: [],
  currentTotalBudget: 0
}

export const requestData  = (state = initialStateData, action = {}) => {
  switch(action.type) {
    case REQUEST_DATA_PENDING:
      return Object.assign({}, state, { isPending: true })

    case REQUEST_DATA_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })

    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { 
        isPending: false,
        journeyId: action.payload.initialJourney[0].id,
        accounts: action.payload.initialJourney[0].accountList,
        expenseList: action.payload.initialJourney[0].accountList[action.payload.len].expenseList,
        journeyName: action.payload.initialJourney[0].name,
        displayedDayId: action.payload.initialJourney[0].accountList[action.payload.len].id,
        displayedDay: action.payload.initialJourney[0].accountList[action.payload.len].name,
        countDays: action.payload.len + 1,
        data: getData(action.payload.initialJourney),
        currentTotalBudget: 0,
        displayedJourney: action.payload.initialJourney,
        initialJourney: action.payload.initialJourney,
        user: action.payload.user,
        journeys: action.payload.data,
        journeyList: action.payload.data.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
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
        displayedJourney: action.payload,
        accounts: action.payload[0].accountList,
        expenseList: action.payload[0].accountList[0].expenseList,
        journeyName: action.payload[0].name,
        displayedDayId: action.payload[0].accountList[0].id,
        displayedDay: action.payload[0].accountList[0].name,
        countDays: action.payload[0].accountList.length,
        data: getData(action.payload)
      })

    case REQUEST_UPDATE_JOURNEY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false,
        journeys: [
          ...state.journeys.slice(0, action.payload.index),
          Object.assign({}, state.journeys[action.payload.index], action.payload.journeys),
          ...state.journeys.slice(action.payload.index + 1)
        ],
        journeyList: [
          ...state.journeyList.slice(0, action.payload.index),
           Object.assign({}, state.journeyList[action.payload.index], action.payload.journeyList),
           ...state.journeyList.slice(action.payload.index + 1)
        ]
      })

    case JOURNEY_CHANGE:
      return Object.assign({}, state, {
        journeyId: action.payload.data[0].id,
        displayedJourney: action.payload.data,
        accounts: action.payload.data[0].accountList,
        expenseList: action.payload.data[0].accountList[action.payload.len].expenseList,
        journeyName: action.payload.data[0].name,
        displayedDayId: action.payload.data[0].accountList[action.payload.len].id,
        displayedDay: action.payload.data[0].accountList[action.payload.len].name,
        countDays: action.payload.len + 1,
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
        journeyId: action.payload.data[action.payload.len].id,
        displayedJourney: action.payload.data[action.payload.len],
        accounts: action.payload.data[action.payload.len].accountList,
        expenseList: action.payload.data[action.payload.len].accountList[action.payload.accountLen].expenseList,
        journeyName: action.payload.data[action.payload.len].name,
        displayedDayId: action.payload.data[action.payload.len].accountList[action.payload.accountLen].id,
        displayedDay: action.payload.data[action.payload.len].accountList[action.payload.accountLen].name,
        countDays: action.payload.data[action.payload.len].accountList.length,
        data: getData(action.payload.data[action.payload.len])
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
        expenseList: action.payload.newAccount[0].expenseList,
        displayedDayId: action.payload.newAccount[0].id,
        displayedDay: action.payload.newAccount[0].name,
        countDays: action.payload.data[0].accountList.length,
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
