import { combineReducers } from 'redux';

const defaultState = {
  bookings: [],
  drivers: [],
  dispatchers: [],
  accounts: [],
  editableBooking: null
}

function bookingsReducer(state = defaultState.bookings, action) {
  switch (action.type) {
    case "GET_BOOKINGS":
      return action.payload
    case "ADD_BOOKING":
      return [...state, action.payload];
    case "EDIT_BOOKING":
      let newArray = [...state]
      let foundObj = newArray.find(booking => booking.id === action.payload.id)
      newArray[newArray.indexOf(foundObj)] = action.payload
      return { state: newArray }
    default:
      return state;
  }
};

function driversReducer(state = defaultState.drivers, action) {
  switch (action.type) {
    case "GET_DRIVERS":
      return action.payload
    default:
      return state;
  }
};

function dispatchersReducer(state = defaultState.dispatchers, action) {
  switch (action.type) {
    case "GET_DISPATCHERS":
      return action.payload
    default:
      return state;
  }
};

function accountsReducer(state = defaultState.accounts, action) {
  switch (action.type) {
    case "GET_ACCOUNTS":
      return action.payload
    default:
      return state;
  }
};



const rootReducer = combineReducers({
  bookings: bookingsReducer,
  drivers: driversReducer,
  dispatchers: dispatchersReducer,
  accounts: accountsReducer
});


export default rootReducer;