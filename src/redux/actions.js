export function fetchAction() {
  
  return function (dispatch) {

    fetch('http://localhost:3000/bookings')
      .then(resp => resp.json())
      .then(bookings => dispatch({ type: "GET_BOOKINGS", payload: bookings }))
      .catch(console.log)

    // fetch('http://localhost:3000/drivers')
    //   .then(resp => resp.json())
    //   .then(drivers => dispatch({ type: "GET_DRIVERS", payload: drivers }))
    //   .catch(console.log)
};
};


export function dateAction() {
  return function (dispatch) {
    console.log("Inside dateAction")
  }
}