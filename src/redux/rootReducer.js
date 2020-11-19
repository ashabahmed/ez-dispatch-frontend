import { combineReducers } from 'redux';

const defaultState = {
  bookings: [],
  currentDate: (new Date()).toDateString() 
}

function bookingsReducer(state = defaultState.bookings, action) {
  switch (action.type) {
    case "GET_BOOKINGS":
      return action.payload
    default:
      return state;
  }
};

// function dateReducer(state = defaultState.currentDate, action) {


// }

const rootReducer = combineReducers({
  bookings: bookingsReducer,
  // currentDate: dateReducer
});


export default rootReducer;