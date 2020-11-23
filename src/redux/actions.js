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

export function fetchAccountsAction() {
  return function (dispatch) {
    fetch('http://localhost:3000/accounts')
      .then(resp => resp.json())
      .then(accounts => dispatch({ type: "GET_ACCOUNTS", payload: accounts }))
      .catch(console.log)

  };
};

export function createNewBookingAction(newBookingObj) {
  return function (dispatch) {
    fetch('http://localhost:3000/bookings', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(newBookingObj)
    })
      .then(resp => resp.json())
      .then(payload => dispatch({ type: "ADD_BOOKING", payload }))
      .catch(console.log)

  };
};

export function editBookingAction(editedBookingObj) {
  return function (dispatch) {
    fetch(`http://localhost:3000/bookings/${editedBookingObj.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(editedBookingObj)
    })
      .then(resp => resp.json())
      .then(payload => dispatch({ type: "EDIT_BOOKING", payload }))
      .catch(console.log)

  };
};
