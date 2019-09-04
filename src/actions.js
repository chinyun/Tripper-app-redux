import {
  ROUTE_CHANGE,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_DATA_PENDING,
  REQUEST_DATA_FAILED,
  REQUEST_ADD_JOURNEY_SUCCESS,
  REQUEST_UPDATE_JOURNEY_SUCCESS
} from './constants.js';

const Url = 'http://localhost:3000';

export const submitSignIn = (email, password) => (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_PENDING });
  fetch(`${Url}/signin`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: email,
      password: password 
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data[data.length - 1].id) {
      dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data });
    } else {
      alert('unable to signin');
    }
  })
  .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error }))
}

export const submitRegister = (name, email, password) => (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_PENDING });
  fetch(`${Url}/register`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data[data.length - 1].id) {
      dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data });
    } else {
      alert('unable to register');
    }
  })
  .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error }))
}

export const routeChange = (route) => ({
  type: ROUTE_CHANGE,
  payload: route
})

export const addJourney = (value, user) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/journeys`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: value,
      budget: 0,
      expense: 0,
      traffic_budget: 0,
      food_budget: 0,
      living_budget: 0,
      ticket_budget: 0,
      shopping_budget: 0,
      user_id: user.id
    })
  })
  .then(response => response.json())
  .then(newJourney => {
    if (newJourney) {
      dispatch({ type: REQUEST_ADD_JOURNEY_SUCCESS, payload: newJourney })
    } else {
      alert('unable to create');
    }
  })
  .catch(error => dispatch({ type: REQUEST_DATA_FAILED, payload: error }))
}

export const editJourneyName = (id, value, index) => (dispatch) => {
  console.log(index);
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/journeys/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: value
    })
  })
  .then(response => response.json())
  .then(journey => {
    const data = [...journey, { index: index }];
    console.log(data);
    if (journey) {
      dispatch({ type: REQUEST_UPDATE_JOURNEY_SUCCESS, payload: data })
    } else {
      alert('unable to edit')
    }
  })
  .catch(error => dispatch({ type: REQUEST_DATA_FAILED, payload: error }))
}
