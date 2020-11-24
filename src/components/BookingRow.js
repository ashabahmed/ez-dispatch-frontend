import React, { Fragment } from 'react'
// import BookingDetailPage from './BookingDetailPage'


class BookingRow extends React.Component {

  state = {
    driverName: "",
    driver_id: 0,
    trip_status: "Booked"
  }
  
  componentDidMount(){
    
    this.setState({ trip_status: this.props.booking.trip_status})

    if (this.props.booking.driver){
      this.setState({ driver_id: this.props.booking.driver.id })
    }
    
  }

  bookingDriverChangeHandler = (e) => {

    let obj = {}
    obj[`${e.target.name }`] = e.target.value

    fetch(`http://localhost:3000/bookings/${this.props.booking.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => this.setState({ driver_id: data.driver.id }))
  }

  bookingTripStatusChangeHandler = (e) => {
    let obj = {}
    obj[`${e.target.name }`] = e.target.value

    fetch(`http://localhost:3000/bookings/${this.props.booking.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => this.setState({ trip_status: data.trip_status }))
  }


  driverNameOptions = () => {
    let fakeObj = {name: " "}
    let newArray = [fakeObj, ...this.props.drivers]
    return newArray.map((driver) => (<option key={driver.id} value={driver.id}>{driver.name}</option>))
  }

  clickHandler = () => {
    this.props.routerProps.history.push(`/bookings/${this.props.booking.id}`)
  }

  editBookingClick = () => {
    this.props.routerProps.history.push(`/edit-booking/${this.props.booking.id}`)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  vehicleTypeBgColor = () => {
    switch (this.props.booking.vehicle && this.props.booking.vehicle.vehicle_type) {
      case "Sedan":
        return "blue"
      case "SUV":
        return "purple"
      case "Stretch Limo":
        return "pink"
      case "Luxury Van":
        return "orange"
      case "Cargo Van":
        return "yellow"
      case "Extended SUV":
        return "green" 
      default:
        return "white";
    }
  }

  render(){
    // console.log(this.props.vehicle_type)
    return (
      <Fragment>
        <tr >
          <td>
            <span onClick={this.clickHandler}>{ this.props.booking.id }</span>
          </td>
          <td style={ {backgroundColor: this.vehicleTypeBgColor()} }>
            <span>{ this.props.booking.vehicle ? this.props.booking.vehicle.vehicle_type : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.vehicle ? this.props.booking.vehicle.id : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.account ? this.props.booking.account.name : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.date ? new Date(Date.parse(this.props.booking.date)).toLocaleString() : "-- --" }</span>
          </td>
          <td>
            <select value={this.state.trip_status} onChange={this.bookingTripStatusChangeHandler} name="trip_status">
              <option value="Booked">Booked</option>
              <option value="No Show">No Show</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Dropped">Dropped</option>
            </select>
          </td>
          <td>
            <span>{ this.props.booking.account.passengers === "" ? this.props.booking.account.name : this.props.booking.passenger_name }</span>
          </td>
          <td>
            <select value={this.state.driver_id} onChange={this.bookingDriverChangeHandler} name="driver_id">
              {this.driverNameOptions()}
            </select>
          </td>
          <td>
            <span>{ this.props.booking.pick_up_address === "" ? "-- --"  : this.props.booking.pick_up_address }</span>
          </td>
          <td>
          <span>{ this.props.booking.drop_off_address === "" ? "-- --"  : this.props.booking.drop_off_address }</span>
          </td>
          <td>
            <span>{ this.props.booking.pick_up_time ? new Date(Date.parse(this.props.booking.pick_up_time)).toLocaleTimeString() : "-- --" }</span>
          </td>
          <td>
            <span>{ this.props.booking.drop_off_time ? new Date(Date.parse(this.props.booking.drop_off_time)).toLocaleTimeString() : "-- --" }</span>
          </td>
          <td>
            <button onClick={this.editBookingClick} className="editBooking">Edit Booking</button>
          </td>
  
        </tr>
        
      </Fragment>
    )
  }

}

export default BookingRow
