import {
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  ROUTE_CHANGE,
  REQUEST_ADD_JOURNEY_PENDING,
  REQUEST_ADD_JOURNEY_SUCCESS,
  REQUEST_ADD_JOURNEY_FAILED
} from './constants.js';

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
  error: ''
}

export const requestData  = (state = initialStateData, action = {}) => {
  switch(action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { 
        isPending: false,
        user: action.payload.pop(1),
        journeys: action.payload,
        initialJourney: action.payload.filter(item => item.id === action.payload[action.payload.length-1].id),
        journeyList: action.payload.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
      })
    case REQUEST_ADD_JOURNEY_PENDING:
      return Object.assign({}, state, { isPending: true })
    case REQUEST_ADD_JOURNEY_SUCCESS:
      return Object.assign({}, state, {
        isPending: false, 
        journeys: [...state.journeys, action.payload[0]],
        journeyList: [...state.journeyList, {
          id: action.payload[0].id,
          name: action.payload[0].name
        }]
      })
    case REQUEST_ADD_JOURNEY_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })
    default:
      return state;
  }
}

