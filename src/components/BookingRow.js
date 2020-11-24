import React, { Fragment } from 'react'
// import BookingDetailPage from './BookingDetailPage'


class BookingRow extends React.Component {

  state = {
    driverName: "",
    driver_id: 0,
    trip_status: "Booked",
    vehicle_id: 0,
    vehicle_type: "-- --",
    vehicleTypeBgColor: "white"
  }
  
  componentDidMount(){
    
    this.setState({ vehicleTypeBgColor: this.vehicleTypeBgColor() })
    this.setState({ trip_status: this.props.booking.trip_status })
    this.setState({ vehicle_type: this.props.booking.vehicle_type })
    if (this.props.booking.driver){
      this.setState({ driver_id: this.props.booking.driver.id })
    }
    if (this.props.booking.vehicle){
      this.setState({ vehicle_id: this.props.booking.vehicle.id })
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


  bookingVehicleNumberChangeHandler = (e) => {
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
    .then(data => this.setState({ vehicle_id: data.vehicle.id }))
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

  vehicleTypeChangeHandler = (e) => {
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
    .then(data => this.setState({ vehicle_type: data.vehicle_type }))
  }


  driverNameOptions = () => {
    let fakeObj = {name: " "}
    let newArray = [fakeObj, ...this.props.drivers]
    return newArray.map((driver) => (<option key={driver.id} value={driver.id}>{driver.name}</option>))
  }

  vehicleNumberOptions = () => {
    let fakeObj = {id: " "}
    let newArray = [fakeObj, ...this.props.vehicles]
    return newArray.map((vehicle) => (<option key={vehicle.id} value={vehicle.id}>{vehicle.id}</option>))
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
    switch (this.props.booking.vehicle_type) {
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

  bookingStatusBgColor = () => {
    switch (this.props.booking.trip_status) {
      case "No Show":
        return "red"
      case "Cancelled":
        return "gray"
      case "Dropped":
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
    
    return (
      <Fragment>
        <tr >
          <td>
            <span onClick={this.clickHandler}>{ this.props.booking.id }</span>
          </td>
          <td style={ {backgroundColor: this.vehicleTypeBgColor()} }>
          <select value={this.state.vehicle_type} onChange={this.vehicleTypeChangeHandler} name="vehicle_type">
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Stretch Limo">Stretch Limo</option>
              <option value="Luxury Van">Luxury Van</option>
              <option value="Cargo Van">Cargo Van</option>
              <option value="Extended SUV">Extended SUV</option>
            </select>
          </td>
          <td>
            <select value={this.state.vehicle_id} onChange={this.bookingVehicleNumberChangeHandler} name="vehicle_id">
              {this.vehicleNumberOptions()}
            </select>
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
            <span>{ this.props.booking.passenger_name !== "" ?  this.props.booking.passenger_name : this.props.booking.account.name }</span>
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


