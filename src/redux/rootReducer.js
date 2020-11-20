import { combineReducers } from 'redux';

const defaultState = {
  bookings: [],
  drivers: [],
  dispatchers: [],
  currentDate: (new Date()) 
}

function bookingsReducer(state = defaultState.bookings, action) {
  switch (action.type) {
    case "GET_BOOKINGS":
      return action.payload
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

// function dateReducer(state = defaultState.currentDate, action) {


// }

const rootReducer = combineReducers({
  bookings: bookingsReducer,
  drivers: driversReducer,
  dispatchers: dispatchersReducer
  // currentDate: dateReducer
});


export default rootReducer;