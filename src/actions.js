import {
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCESS,
  REQUEST_LOGIN_FAILED,
  ROUTE_CHANGE
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
      dispatch({ type: REQUEST_LOGIN_SUCESS, payload: data });
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
      dispatch({ type: REQUEST_LOGIN_SUCESS, payload: data });
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
