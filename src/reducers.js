import {
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCESS,
  REQUEST_LOGIN_FAILED,
  ROUTE_CHANGE
} from './constants.js';

const initialStateLogIn = {
  isPending: false,
  user: {
    id: '',
    name: '',
    email: ''
  },
  journeys: [],
  initialJourney: {},
  journeyList: [],
  route: 'landing',
  isSignedIn: false,
  error: ''
}

export const requestLogIn = (state = initialStateLogIn, action = {}) => {
  switch(action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPending: true })
    case REQUEST_LOGIN_SUCESS:
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
          }),
          route: 'home',
          isSignedIn: true
        })
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })
    default:
      return state;
  }
}

export const routeChange = (state = initialStateLogIn, action = {}) => {
  switch(action.type) {
    case ROUTE_CHANGE:
      return Object.assign({}, state, { route: action.payload })
    default:
      return state;
  }
}
