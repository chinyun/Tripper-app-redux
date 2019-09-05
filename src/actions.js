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
  .then(journeys => {
    if (journeys[journeys.length - 1].id) {
      const initialJourney = journeys.filter(item => item.id === journeys[journeys.length - 2].id);
      dispatch({
        type: REQUEST_LOGIN_SUCCESS,
        payload: {
          user: journeys.pop(1),
          data: journeys,
          initialJourney: initialJourney,
          len: initialJourney[0].accountList.length - 1
        }
      });
    } else {
      alert('unable to signin');
    }
  })
  .catch(err => dispatch({ type: REQUEST_LOGIN_FAILED, payload: err }))
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
  .then(journeys => {
    if (journeys[journeys.length - 1].id) {
      const initialJourney = journeys.filter(item => item.id === journeys[journeys.length - 2].id);
      dispatch({
        type: REQUEST_LOGIN_SUCCESS,
        payload: {
          user: journeys.pop(1),
          data: journeys,
          initialJourney: initialJourney,
          len: initialJourney[0].accountList.length - 1
        }
      });
    } else {
      alert('unable to register');
    }
  })
  .catch(err => dispatch({ type: REQUEST_LOGIN_FAILED, payload: err }))
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
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }))
}

export const editJourneyName = (id, value, index) => (dispatch) => {
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
    if (journey) {
      dispatch({
        type: REQUEST_UPDATE_JOURNEY_SUCCESS,
        payload: {
          journeys: journey[0],
          journeyList: journey[1],
          index: index
        }
      })
    } else {
      alert('unable to edit')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }))
}

export const deleteJourney = (id, index) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/journeys/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(journeys => {
      if (journeys) {
        dispatch({
          type: REQUEST_DELETE_JOURNEY_SUCCESS,
          payload: {
            data: journeys,
            len: journeys.length - 1,
            index: index,
            accountLen: journeys[journeys.length - 1].accountList.length - 1
          }
        })
      } else {
        alert('unable to delete')
      }
    })
    .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const journeyChange = (target) => ({
  type: JOURNEY_CHANGE,
  payload: {
    data: target,
    len: target[0].accountList.length - 1
  }
})

export const addDay = (newDay, id, index) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/accounts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: newDay,
      journey_id: id
    })
  })
  .then(response => response.json())
  .then(updatedJourney => {
    if (updatedJourney) {
      const newAccount = updatedJourney[0].accountList.filter(item =>
        item.name === newDay);
      dispatch({ 
        type: REQUEST_ADD_DAY_SUCCESS,
        payload: {
          data: updatedJourney,
          newAccount: newAccount,
          index: index
        }  
      });
    } else {
      alert('unable to add day')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const deleteDay = (id, index) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/accounts/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(updatedJourney=> {
    if (updatedJourney) {
      dispatch({
        type: REQUEST_DELETE_DAY_SUCCESS,
        payload: {
          data: updatedJourney,
          index: index,
          len: updatedJourney[0].accountList.length - 1
        }
      })
    } else {
      alert('unable to delete')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const dayChange = (day) => ({
  type: DAY_CHANGE,
  payload: day
})

export const addExpense = (value, index) => (dispatch) => {
  console.log(value);
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/expenses`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      category: value.category,
      detail: value.detail,
      amount: value.amount,
      account_id: value.id
    })
  })
  .then(response => response.json())
  .then(updatedJourney => {
    if (updatedJourney) {
      const targetAccount = updatedJourney[0].accountList.filter(item =>
      item.id === value.id);
      dispatch({
        type: REQUEST_ADD_EXPENSE_SUCCESS,
        payload: {
          data: updatedJourney,
          targetAccount: targetAccount,
          index: index
        }
      })
    } else {
      alert('unable to add expense')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const deleteExpense = (list, id, index) => (dispatch) =>{
  dispatch({ type: REQUEST_DATA_PENDING });
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
    if (updatedJourney) {
      const targetAccount = updatedJourney[0].accountList.filter(item =>
      item.id === id);
      dispatch({ 
        type: REQUEST_DELETE_EXPENSE_SUCCESS,
        payload: {
          data: updatedJourney,
          targetAccount: targetAccount,
          index: index
        }
      })
    } else {
      alert('unable to delete')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const editExpense = (value, index) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/expenses/${value.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      category: value.category,
      detail: value.detail,
      amount: value.amount,
      account_id: value.account_id
    })
  })
  .then(response => response.json())
  .then(updatedJourney => {
    if (updatedJourney) {
      const targetAccount = updatedJourney[0].accountList.filter(item =>
      item.id === value.account_id);
      dispatch({
        type: REQUEST_UPDATE_EXPENSE_SUCCESS,
        payload: {
          data: updatedJourney,
          targetAccount: targetAccount,
          index: index
        }
      })
    } else {
      alert('unable to update expense')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const editBudgets = (data, id, index) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_FAILED });
  fetch(`${Url}/journeys_budgets/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(journey => {
    if (journey) {
      dispatch({
        type: REQUEST_UPDATE_BUDGETS_SUCCESS,
        payload: {
          data: journey,
          index: index
        }
      })
    } else {
      alert('unable to edit budget')
    }    
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}

export const editTotalBudget =  (budget, id, index) => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  fetch(`${Url}/journeys_budgets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      budget: budget
    })
  })
  .then(response => response.json())
  .then(journey=> {
    if (journey) {
      dispatch({
        type: REQUEST_UPDATE_TOTALBUDGET_SUCCESS,
        payload: {
          data: journey,
          index: index
        }
      })
    } else {
      alert('unable to edit budget')
    }
  })
  .catch(err => dispatch({ type: REQUEST_DATA_FAILED, payload: err }));
}
