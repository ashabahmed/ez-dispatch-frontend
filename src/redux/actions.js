export function fetchBookingsAction() {
  return function (dispatch) {
    fetch('http://localhost:3000/bookings')
      .then(resp => resp.json())
      .then(bookings => dispatch({ type: "GET_BOOKINGS", payload: bookings }))
      .catch(console.log)

  };
};

export function fetchDriversAction() {
  return function (dispatch) {
    fetch('http://localhost:3000/drivers')
      .then(resp => resp.json())
      .then(drivers => dispatch({ type: "GET_DRIVERS", payload: drivers }))
      .catch(console.log)

  };
};

export function fetchDispatchersAction() {
  return function (dispatch) {
    fetch('http://localhost:3000/dispatchers')
      .then(resp => resp.json())
      .then(dispatchers => dispatch({ type: "GET_DISPATCHERS", payload: dispatchers }))
      .catch(console.log)

  };
};


export function dateAction() {
  return function (dispatch) {
    console.log("Inside dateAction")
  }
}